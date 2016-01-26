//===========================================================================
// socket.io methods for multiplayer
//===========================================================================
var nameSet = false; //for checking if our names been set already
var inLobby = false;
var form = document.getElementById("nickname"); //get form html content
var loggedin = document.getElementById("loggedin");
var innerform = document.getElementById("dif");
var readyStatus  = false;
var myColor;
var enemyColor;

//===========================================================================
// Front End buttons we add in and remove based on io status
//===========================================================================
var btn = document.createElement("BUTTON"); //button for joining room
var t = document.createTextNode("Join Lobby");
var lobbyRoom = document.getElementById("lobbyRoom"); //lobby room div
btn.appendChild(t);
btn.id = "joinLobby";
btn.onclick = function() { 
        join(clientNickName);
};

	var leavebtn = document.createElement("BUTTON");
    var t2 = document.createTextNode("Leave Lobby");
    var readybtn = document.createElement("BUTTON");
    var t3 = document.createTextNode("Ready!");
    var unreadybtn = document.createElement("BUTTON");
    var t4 = document.createTextNode("Unready!");
    var startgamebtn = document.createElement("BUTTON");
    var t5 = document.createTextNode("Start Game!");
    var initbtn = document.createElement("BUTTON");
    var t6 = document.createTextNode("Done Setting Pieces");
    var forfeitbtn = document.createElement("BUTTON");
    var t7 = document.createTextNode("Forfeit");
    var endturnbtn = document.createElement("BUTTON");
    var t8 = document.createTextNode("End Turn");
    var finishgamebtn = document.createElement("BUTTON");
    var t9 = document.createTextNode("Finish Game and Quit");

    leavebtn.appendChild(t2);
    leavebtn.id ="leaveLobby";
    leavebtn.onclick = function() {
    	leave(clientNickName);
    };
    
    readybtn.appendChild(t3);
    readybtn.id ="readyButton";
    readybtn.onclick = function() {
    	ready(clientNickName);
    };

    unreadybtn.appendChild(t4);
    unreadybtn.id ="unreadyButton";
    unreadybtn.onclick = function() {
    	unready(clientNickName);
    }

    startgamebtn.appendChild(t5);
    startgamebtn.id = "startGame";
    startgamebtn.onclick = function() {
    	startgame();
    }

    initbtn.appendChild(t6);
    initbtn.id ="initButton";
    initbtn.onclick = function() {
    	endInit();
    }

    forfeitbtn.appendChild(t7);
    forfeitbtn.id = "forfeitButton";
    forfeitbtn.onclick = function() {
    	giveup(clientNickName);
    }

    endturnbtn.appendChild(t8);
    endturnbtn.id = "endTurnButton";
    endturnbtn.onclick = function() {
    	endTurn(clientNickName);
    }

    finishgamebtn.appendChild(t9);
    finishgamebtn.id ="finishGameButton";
    finishgamebtn.onclick = function() {
    	finishGame();
    }
//==========================================================================
//When we receive and send....
//==========================================================================
/***Sending a Chat Message in chat box **/

var inputMessage = function() {
    var chatInput = document.getElementById("chatinput").value;
    event.preventDefault();
    //console.log(chatInput);
    socket.emit('chat message', chatInput); //sends message to server
    document.getElementById("chatinput").value = "";
    return false;
}

/**What does the dom do when we receive a chat message**/
socket.on('chat message', function(msg) {
    var chatList = document.getElementById("listmessages");
    var $li = document.createElement("li");
    $li.appendChild(document.createTextNode(msg));
    $li.setAttribute("id", "user"); // added line
    chatList.appendChild($li);
	//$('#listmessages').animate({
    //    scrollTop: $('#listmessages')[0].scrollHeight});
    });

/** Socket updating whos online box at the bottom **/
socket.on('updateusers', function(usernames) {
    var online = document.getElementById("currentlyonline");
    online.innerHTML = "";
	
	$.each(usernames, function(key, value) {
	   $('#currentlyonline').append('<li>' + value + '<li>');
	});
});

/** How client handles what is currently happening in the online game **/

socket.on('console message', function(msg) {
	var chatList = document.getElementById("listmessages");
	var $li = document.createElement('li');
	$li.appendChild(document.createTextNode(msg));
	$li.setAttribute("id", "consoleMessage");
	chatList.appendChild($li);

});

/** How client handles setting nickname, and then sends your nickName to the server to save **/
var setNickname = function() {
	clientNickName = document.getElementById("nickNames").value;
   	event.preventDefault();    
    if(nameSet == true) { //if our name is set already
        socket.emit('changenickname', clientNickName); //change our nickname rather then adding a new one
    } else {
      socket.emit('adduser', clientNickName); //else add a new one
      nameSet = true;
    }
    document.getElementById("nickNames").innerHTML = "";
    loggedin.innerHTML = "Currently logged in as: " + clientNickName;
    socket.emit('check lobby'); //check if lobby is full or not...
}

//how to handle retrieving the lobby status. add join lobby button if its fine, else remove it
socket.on('lobby status', function(hasSpace) { //isFUll is a boolean for if there is space or not..
	if(hasSpace == true && inLobby == false) {
		form.appendChild(btn);
	} else {
		if(form.contains(btn)) {
			form.removeChild(btn);
			}
		}
});

//method for on join lobby click to attempt to join
var join = function(clientNickName) {

	socket.emit('attempting lobbyjoin', clientNickName);//try to enter room
}

var leave = function(clientNickName) {

	socket.emit('leaving lobby', clientNickName);
}

//getting ready in lobby
var ready = function(clientNickName) {
	readyStatus = true;
	socket.emit('ready lobby', clientNickName, readyStatus);
}

//geting unready in lobby
var unready = function(clientNickName) {
	readyStatus = false;
	socket.emit('unready lobby', clientNickName, readyStatus);
	if(form.contains(startgamebtn)) {
		form.removeChild(startgamebtn);
	}
}

var startgame = function() {

	socket.emit('startInitializePhase', clientNickName);
}

var endInit = function() {
	//console.log("Ending initphase for myself " + myPlayer);
	if(myPlayer == "Red") {
		if(goldPlaced){
		console.log(redGold);
		var dataToSend = [redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold];
		socket.emit('initPhaseData', dataToSend, "Red");
	} else {
		alert("Place gold");
	}
	}
	if(myPlayer == "Blue") {
		if(goldPlaced == true){
		console.log(blueGold);
		var dataToSend = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold];
		socket.emit('initPhaseData', dataToSend, "Blue");
		} else {
			alert("Place gold");
		}
	}
}

var giveup = function(name) {
	socket.emit('giveup', name, myPlayer);

	if(form.contains(endturnbtn)) {
		form.removeChild(endturnbtn);
	}

	if(form.contains(forfeitbtn)) {
		form.removeChild(forfeitbtn);
	}
	if(form.contains(btn)) {
		form.removeChild(btn);
	}
toolboxWipe();
toolboxHunterFive();
enableHunterToolbox();

	form.appendChild(innerform);
	form.appendChild(btn);
}

socket.on('reset ui', function(){
	if(form.contains(endturnbtn)) {
		form.removeChild(endturnbtn);
	}

	if(form.contains(forfeitbtn)) {
		form.removeChild(forfeitbtn);
	}

	if(form.contains(btn)) {
		form.removeChild(btn);
	}

	inLobby = false;
	toolboxWipe();
toolboxHunterFive();
enableHunterToolbox();
	form.appendChild(innerform);
	form.appendChild(btn);
});

var endTurn = function(name) {
	if(myPlayer == "Red") {
		var dataToSend = [redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold, redMine1, redMine2, redMine3, redMine4, redMine5, blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueMine1, blueMine2, blueMine3, blueMine4, blueMine5];
		socket.emit('endTurnData', dataToSend, "Red");
	}
	if(myPlayer == "Blue") {
		var dataToSend = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold, blueMine1, blueMine2, blueMine3, blueMine4, blueMine5, redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redMine1, redMine2, redMine3, redMine4, redMine5];
		socket.emit('endTurnData', dataToSend, "Blue");
	}
	if(form.contains(endturnbtn)) {
		form.removeChild(endturnbtn);
	}
}
//on attempt to join success
socket.on('success lobbyjoin', function() {
	if(innerform !=null){
		form.removeChild(innerform);
	}
	if(leavebtn != null){
		form.appendChild(leavebtn);
	}
	if(readybtn !=null){
		form.appendChild(readybtn);
	}

	if(btn!=null){
		form.removeChild(btn); //remove join lobby button on click of join lobby button
	}
	inLobby = true;
});

//on failure to join lobby
socket.on('fail lobbyjoin', function() {
	if(btn==null){
		form.appendChild(btn); //remove join lobby button on click of join lobby button
	}
});

//on leaving lobby
socket.on('lobby left', function() {
	if(form.contains(readybtn)) {
		form.removeChild(readybtn);
	}
	if(form.contains(leavebtn)) {
		form.removeChild(leavebtn);
	}

	if(form.contains(unreadybtn)) {
		form.removeChild(unreadybtn);
	}

	if(form.contains(startgamebtn)) {
		form.removeChild(startgamebtn);
	}

	form.appendChild(innerform);
	inLobby = false;
});

socket.on('turn off startgame', function() {
	if(form.contains(startgamebtn)) {
		form.removeChild(startgamebtn);
	}
});

//on show lobby members/update lobby members
socket.on('show lobbymembers', function(lobby) {
lobbyRoom.innerHTML = "";
var size = lobby.length;
for(var i = 0; i<size; i++) {
	var $li = document.createElement('li');
	$li.appendChild(document.createTextNode(lobby[i]));
	$li.setAttribute("id", "player"); 
	lobbyRoom.appendChild($li);
}
});

//when we are readyed up
socket.on('ready success', function() {
	if(form.contains(readybtn)) {
		form.removeChild(readybtn);
	}


	if(form.contains(unreadybtn)){
		form.removeChild(unreadybtn);
	}

	form.appendChild(unreadybtn);
	console.log("In ready success");
});

//when we hit unready because for some reason we're not ready anymore
socket.on('unready success', function() {
	if(form.contains(unreadybtn)) {
		form.removeChild(unreadybtn);
	}

		form.appendChild(readybtn);
	

	if(form.contains(startgamebtn)) {
		form.removeChild(startgamebtn);
	}
	
});

//Add the game start button if there is a potential to start
socket.on('game can start', function() {
	console.log("trying to start game");

	if(form.contains(startgamebtn)) {
		//form.removeChild(startgamebtn);
	} else {
		form.appendChild(startgamebtn);
	}
	
});

//what color do i end upbeing. what about my enemy?
socket.on('colorplayerami', function(color, enemycolor, init){
	myPlayer = color; //set my color for the pawns i can control
	enemyPlayer = enemycolor; //set enemycolor
	isInit = init; //is it init phase, yea

	if(form.contains(startgamebtn)) {
		form.removeChild(startgamebtn);
	}

	if(form.contains(initbtn)) {
		form.removeChild(initbtn);
	}

	if(form.contains(leavebtn)) {
		form.removeChild(leavebtn);
	}

	if(form.contains(unreadybtn)) {
		form.removeChild(unreadybtn);
	}

	form.appendChild(initbtn);
});

socket.on('init complete', function(data, color) {
	console.log("In initphase complete");
	if(color == "Blue" && myPlayer == "Blue") {
		console.log("Got red data");
		console.log(data);
		for(var i = 0; i < data.length; i++) {
            if(data[i].nickname == "RedThief"){
                redThief.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedHunter"){
                redHunter.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "RedPawn1"){
                redPawn1.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "RedPawn2"){
                redPawn2.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "RedPawn3"){
                redPawn3.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "RedPawn4"){
                redPawn4.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "RedPawn5"){
                redPawn5.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "RedThiefDecoy"){
                redThiefDecoy.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "RedHunterDecoy"){
                redHunterDecoy.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].gold ==   "RedGold"){
                redGold.updateLocation(data[i].location, gameGrid.grid);
                console.log("this is hit")
            }
        }
        document.getElementById("gold").setAttribute("draggable", "false");
    }

    if(color == "Red" && myPlayer == "Red") {
    	console.log("Got blue data");
    	console.log(data);
    	for(var i = 0; i < data.length; i++) {
            if(data[i].nickname == "BlueThief"){
                blueThief.updateLocation(data[i].location, gameGrid.grid)
            }

            if(data[i].nickname == "BlueHunter"){
                blueHunter.updateLocation(data[i].location, gameGrid.grid)
            }
            if(data[i].nickname == "BluePawn1"){
                bluePawn1.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "BluePawn2"){
                bluePawn2.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "BluePawn3"){
                bluePawn3.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "BluePawn4"){
                bluePawn4.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "BluePawn5"){
                bluePawn5.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].gold == "BlueGold"){
                blueGold.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueThiefDecoy"){
                blueThiefDecoy.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].nickname == "BlueHunterDecoy"){
                blueHunterDecoy.updateLocation(data[i].location, gameGrid.grid1);
            }
        }
        document.getElementById("gold").setAttribute("draggable", "false");
    }

    if(form.contains(initbtn)) {
    	form.removeChild(initbtn);
    }
    if(form.contains(forfeitbtn)) {
    	form.removeChild(forfeitbtn);
    }

    form.appendChild(forfeitbtn);
});

/** If im just connecting and a game has started update my board values for my currentboard **/
socket.on('get currentboard', function(data) {
	console.log(data);
	for(var i = 0; i < data.length; i++) {
		
             if(data[i].gold == "RedGold"){
            	console.log(data[i]);
                redGold.updateLocation(data[i].location, gameGrid.grid);
                redGold.setVisible(true);
            
            }
			
           if(data[i].gold == "BlueGold"){
            	console.log(data[i]);
                blueGold.updateLocation(data[i].location, gameGrid.grid);
                blueGold.setVisible(true);
            	
            }
            
          if(data[i].nickname == "RedThief"){
                redThief.updateLocation(data[i].location, gameGrid.grid);
                console.log("hit update");
                console.log(redThief.location);
            }
            if(data[i].nickname == "RedThief" && data[i].alive == false){
                redThief.setDead();
                redThief.emitDead(gameGrid.grid);
               
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == true){
                redHunter.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == false){
                redHunter.setDead();
                redHunter.emitDead(gameGrid.grid);

            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == true){
                redPawn1.updateLocation(data[i].location, gameGrid.grid);

            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == false){
                redPawn1.setDead();
                redPawn1.emitDead(gameGrid.grid);
            }
            
            if(data[i].nickname == "RedPawn2" && data[i].alive == true){
                redPawn2.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn2" && data[i].alive == false){
                redPawn2.setDead();
                redPawn2.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == true){
                redPawn3.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == false){
                redPawn3.setDead();
                redPawn3.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == true){
                redPawn4.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == false){
                redPawn4.setDead();
                redPawn4.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == true){
                redPawn5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == false){
                redPawn5.setDead();
                redPawn5.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == true){
                redThiefDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == false){
                redThiefDecoy.setDead();
                redThiefDecoy.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == true){
                redHunterDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == false){
                redHunterDecoy.setDead();
                redHunterDecoy.emitDead(gameGrid.grid);
            }
            if(data[i].name == "RedMine1" && data[i].isActive == true){
                redMine1.updateLocation(data[i].location, gameGrid.grid);
                redMine1.setVisible(true);
            }
            if(data[i].name == "RedMine2" && data[i].isActive == true){
                redMine2.updateLocation(data[i].location, gameGrid.grid);
                redMine2.setVisible(true);

            }
            if(data[i].name == "RedMine3" && data[i].isActive == true){
                redMine3.updateLocation(data[i].location, gameGrid.grid);
                redMine3.setVisible(true);
            }
            if(data[i].name == "RedMine4" && data[i].isActive == true){
                redMine4.updateLocation(data[i].location, gameGrid.grid);
                redMine4.setVisible(true);
            }
            if(data[i].name == "RedMine5" && data[i].isActive == true){
                redMine5.updateLocation(data[i].location, gameGrid.grid);
                redMine5.setVisible(true);
            }

            if(data[i].name == "RedMine1" && data[i].isActive == false){
                redMine1.defuse(gameGrid.grid);
                redMine1.setVisible(false);
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == false){
                redMine2.defuse(gameGrid.grid);
                redMine2.setVisible(false);

            }
            if(data[i].name == "RedMine3" && data[i].isActive == false){
                redMine3.defuse(gameGrid.grid);
                redMine3.setVisible(false);
            }
            if(data[i].name == "RedMine4" && data[i].isActive == false){
                redMine4.defuse(gameGrid.grid);
                redMine4.setVisible(false);
            }
            if(data[i].name == "RedMine5" && data[i].isActive == false){
                redMine5.defuse(gameGrid.grid);
                redMine5.setVisible(false);
            }
            if(data[i].gold == "RedGold"){
                redGold.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BlueThief" && data[i].alive == true){
                blueThief.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueThief" && data[i].alive == false){
                blueThief.setDead();
                blueThief.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == true){
                blueHunter.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == false){
                blueHunter.setDead();
                blueHunter.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn1" && data[i].alive == true){
                bluePawn1.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn1" && data[i].alive == false){
                bluePawn1.setDead();
                bluePawn1.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn2" && data[i].alive == true){
                bluePawn2.updateLocation(data[i].location, gameGrid.grid);
            }

             if(data[i].nickname == "BluePawn2" && data[i].alive == false){
                bluePawn2.setDead();
                bluePawn2.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == true){
                bluePawn3.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == false){
                bluePawn3.setDead();
                bluePawn3.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn4" && data[i].alive == true){
                bluePawn4.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn4" && data[i].alive == false){
                bluePawn4.setDead();
                bluePawn4.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn5" && data[i].alive == true){
                bluePawn5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn5" && data[i].alive == false){
                bluePawn5.setDead();
                bluePawn5.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == true){
                blueThiefDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == false){
                blueThiefDecoy.setDead();
                blueThiefDecoy.emitDead(gameGrid.grid);
            }
            
            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == true){
                blueHunterDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == false){
                blueHunterDecoy.setDead();
                blueHunterDecoy.emitDead(gameGrid.grid);
            }


            if(data[i].name == "BlueMine1" && data[i].isActive == true){
                blueMine1.updateLocation(data[i].location, gameGrid.grid);
                blueMine1.setVisible(true);
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == true){
                blueMine2.updateLocation(data[i].location, gameGrid.grid);
                blueMine2.setVisible(true);
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == true){
                blueMine3.updateLocation(data[i].location, gameGrid.grid);
                blueMine3.setVisible(true);
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == true){
                blueMine4.updateLocation(data[i].location, gameGrid.grid);
                blueMine4.setVisible(true);
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == true){
                blueMine5.updateLocation(data[i].location, gameGrid.grid);
                blueMine5.setVisible(true);
            }

            if(data[i].name == "BlueMine1" && data[i].isActive == false){
                blueMine1.defuse(gameGrid.grid);
                blueMine1.setVisible(false);
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == false){
                blueMine2.defuse(gameGrid.grid);
                blueMine2.setVisible(false);

            }
            if(data[i].name == "BlueMine3" && data[i].isActive == false){
                blueMine3.defuse(gameGrid.grid);
                blueMine3.setVisible(false);

            }
            if(data[i].name == "BlueMine4" && data[i].isActive == false){
                blueMine4.defuse(gameGrid.grid);
                blueMine4.setVisible(false);

            }
            if(data[i].name == "BlueMine5" && data[i].isActive == false){
                blueMine5.defuse(gameGrid.grid);
                blueMine5.setVisible(false);

            }
        
	}
});

socket.on('turn', function(player) {
	isInit = false;
	if(player == clientNickName) {
        if(document.getElementById('mine1') !=null){
        document.getElementById("mine1").setAttribute("draggable", "true");
        }
        if(document.getElementById('mine2') !=null){
        document.getElementById("mine2").setAttribute("draggable", "true");
        }
        if(document.getElementById("mine3")!=null){
        document.getElementById("mine3").setAttribute("draggable", "true");
        }

        if(document.getElementById("mine4")!=null){
        document.getElementById("mine4").setAttribute("draggable", "true");
        }
        if(document.getElementById("mine5")!=null){
        document.getElementById("mine5").setAttribute("draggable", "true");
        }
        document.getElementById("gold").setAttribute("draggable", "false");
         //console.log(draggedMines);
		cellClickListeners();
		makingMove = 0;

        /*for(var name in draggedMines) {
            if(name.locati)
        }*/
		if(form.contains(endturnbtn)) {
			form.removeChild(endturnbtn);
		}

		form.appendChild(endturnbtn);
	} else {
		console.log("Waiting for enemy to finish his turn...");
	}
});

socket.on('disable movement', function(name, isDisable){
	removeClickListeners();
});

socket.on('endturncomplete', function(data, color){
	console.log(data);
	if(myPlayer == "Red") {
		for(var i = 0; i < data.length; i++) {
		  if(data[i].nickname == "RedThief"){
                redThief.updateLocation(data[i].location, gameGrid.grid);
                console.log("hit update");
                console.log(redThief.location);
            }
            if(data[i].nickname == "RedThief" && data[i].alive == false){
                redThief.setDead();
                redThief.emitDead(gameGrid.grid);
               
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == true){
                redHunter.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == false){
                redHunter.setDead();
                redHunter.emitDead(gameGrid.grid);

            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == true){
                redPawn1.updateLocation(data[i].location, gameGrid.grid);

            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == false){
                redPawn1.setDead();
                redPawn1.emitDead(gameGrid.grid);
            }
            
            if(data[i].nickname == "RedPawn2" && data[i].alive == true){
                redPawn2.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn2" && data[i].alive == false){
                redPawn2.setDead();
                redPawn2.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == true){
                redPawn3.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == false){
                redPawn3.setDead();
                redPawn3.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == true){
                redPawn4.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == false){
                redPawn4.setDead();
                redPawn4.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == true){
                redPawn5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == false){
                redPawn5.setDead();
                redPawn5.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == true){
                redThiefDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == false){
                redThiefDecoy.setDead();
                redThiefDecoy.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == true){
                redHunterDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == false){
                redHunterDecoy.setDead();
                redHunterDecoy.emitDead(gameGrid.grid);
            }
            if(data[i].name == "RedMine1" && data[i].isActive == true){
                redMine1.updateLocation(data[i].location, gameGrid.grid);
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == true){
                redMine2.updateLocation(data[i].location, gameGrid.grid);

            }
            if(data[i].name == "RedMine3" && data[i].isActive == true){
                redMine3.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "RedMine4" && data[i].isActive == true){
                redMine4.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "RedMine5" && data[i].isActive == true){
                redMine5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].name == "RedMine1" && data[i].isActive == false){
                redMine1.defuse(gameGrid.grid);
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == false){
                redMine2.defuse(gameGrid.grid);

            }
            if(data[i].name == "RedMine3" && data[i].isActive == false){
                redMine3.defuse(gameGrid.grid);
            }
            if(data[i].name == "RedMine4" && data[i].isActive == false){
                redMine4.defuse(gameGrid.grid);
            }
            if(data[i].name == "RedMine5" && data[i].isActive == false){
                redMine5.defuse(gameGrid.grid);
            }
            /*
            if(data[i].gold == "RedGold"){
                redGold.updateLocation(data[i].location);
            }*/

            if(data[i].nickname == "BlueThief" && data[i].alive == true){
                blueThief.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueThief" && data[i].alive == false){
                blueThief.setDead();
                blueThief.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == true){
                blueHunter.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == false){
                blueHunter.setDead();
                blueHunter.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn1" && data[i].alive == true){
                bluePawn1.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn1" && data[i].alive == false){
                bluePawn1.setDead();
                bluePawn1.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn2" && data[i].alive == true){
                bluePawn2.updateLocation(data[i].location, gameGrid.grid);
            }

             if(data[i].nickname == "BluePawn2" && data[i].alive == false){
                bluePawn2.setDead();
                bluePawn2.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == true){
                bluePawn3.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == false){
                bluePawn3.setDead();
                bluePawn3.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn4" && data[i].alive == true){
                bluePawn4.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn4" && data[i].alive == false){
                bluePawn4.setDead();
                bluePawn4.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn5" && data[i].alive == true){
                bluePawn5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn5" && data[i].alive == false){
                bluePawn5.setDead();
                bluePawn5.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == true){
                blueThiefDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == false){
                blueThiefDecoy.setDead();
                blueThiefDecoy.emitDead(gameGrid.grid);
            }
            
            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == true){
                blueHunterDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == false){
                blueHunterDecoy.setDead();
                blueHunterDecoy.emitDead(gameGrid.grid);
            }


            if(data[i].name == "BlueMine1" && data[i].isActive == true){
                blueMine1.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == true){
                blueMine2.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == true){
                blueMine3.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == true){
                blueMine4.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == true){
                blueMine5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].name == "BlueMine1" && data[i].isActive == false){
                blueMine1.defuse(gameGrid.grid);
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == false){
                blueMine2.defuse(gameGrid.grid);
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == false){
                blueMine3.defuse(gameGrid.grid);
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == false){
                blueMine4.defuse(gameGrid.grid);
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == false){
                blueMine5.defuse(gameGrid.grid);
            }
		}

		socket.emit('switchTurn', clientNickName, myColor);
		if(form.contains(endturnbtn)) {
			form.removeChild(endturnbtn);
		}
	}
    
	if(myPlayer == "Blue") {
        for(var i = 0; i < data.length; i++) {
          if(data[i].nickname == "RedThief"){
                redThief.updateLocation(data[i].location, gameGrid.grid);
                console.log("hit update");
                console.log(redThief.location);
            }
            if(data[i].nickname == "RedThief" && data[i].alive == false){
                redThief.setDead();
                redThief.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == true){
                redHunter.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == false){
                redHunter.setDead();
                redHunter.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == true){
                redPawn1.updateLocation(data[i].location, gameGrid.grid);

            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == false){
                redPawn1.setDead();
                redPawn1.emitDead(gameGrid.grid);
            }
            
            if(data[i].nickname == "RedPawn2" && data[i].alive == true){
                redPawn2.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn2" && data[i].alive == false){
                redPawn2.setDead();
                redPawn2.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == true){
                redPawn3.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == false){
                redPawn3.setDead();
                redPawn3.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == true){
                redPawn4.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == false){
                redPawn4.setDead();
                redPawn4.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == true){
                redPawn5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == false){
                redPawn5.setDead();
                redPawn5.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == true){
                redThiefDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == false){
                redThiefDecoy.setDead();
                redThiefDecoy.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == true){
                redHunterDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == false){
                redHunterDecoy.setDead();
                redHunterDecoy.emitDead(gameGrid.grid);
            }
            if(data[i].name == "RedMine1" && data[i].isActive == true){
                redMine1.updateLocation(data[i].location, gameGrid.grid);
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == true){
                redMine2.updateLocation(data[i].location, gameGrid.grid);

            }
            if(data[i].name == "RedMine3" && data[i].isActive == true){
                redMine3.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "RedMine4" && data[i].isActive == true){
                redMine4.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "RedMine5" && data[i].isActive == true){
                redMine5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].name == "RedMine1" && data[i].isActive == false){
                redMine1.defuse(gameGrid.grid);
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == false){
                redMine2.defuse(gameGrid.grid);

            }
            if(data[i].name == "RedMine3" && data[i].isActive == false){
                redMine3.defuse(gameGrid.grid);
            }
            if(data[i].name == "RedMine4" && data[i].isActive == false){
                redMine4.defuse(gameGrid.grid);
            }
            if(data[i].name == "RedMine5" && data[i].isActive == false){
                redMine5.defuse(gameGrid.grid);
            }
            /*
            if(data[i].gold == "RedGold"){
                redGold.updateLocation(data[i].location);
            }*/

            if(data[i].nickname == "BlueThief" && data[i].alive == true){
                blueThief.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueThief" && data[i].alive == false){
                blueThief.setDead();
                blueThief.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == true){
                blueHunter.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == false){
                blueHunter.setDead();
                blueHunter.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn1" && data[i].alive == true){
                bluePawn1.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn1" && data[i].alive == false){
                bluePawn1.setDead();
                bluePawn1.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn2" && data[i].alive == true){
                bluePawn2.updateLocation(data[i].location, gameGrid.grid);
            }

             if(data[i].nickname == "BluePawn2" && data[i].alive == false){
                bluePawn2.setDead();
                bluePawn2.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == true){
                bluePawn3.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == false){
                bluePawn3.setDead();
                bluePawn3.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn4" && data[i].alive == true){
                bluePawn4.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn4" && data[i].alive == false){
                bluePawn4.setDead();
                bluePawn4.emitDead(gameGrid.grid);
            }


            if(data[i].nickname == "BluePawn5" && data[i].alive == true){
                bluePawn5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BluePawn5" && data[i].alive == false){
                bluePawn5.setDead();
                bluePawn5.emitDead(gameGrid.grid);
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == true){
                blueThiefDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == false){
                blueThiefDecoy.setDead();
                blueThiefDecoy.emitDead(gameGrid.grid);
            }
            
            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == true){
                blueHunterDecoy.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == false){
                blueHunterDecoy.setDead();
                blueHunterDecoy.emitDead(gameGrid.grid);
            }


            if(data[i].name == "BlueMine1" && data[i].isActive == true){
                blueMine1.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == true){
                blueMine2.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == true){
                blueMine3.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == true){
                blueMine4.updateLocation(data[i].location, gameGrid.grid);
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == true){
                blueMine5.updateLocation(data[i].location, gameGrid.grid);
            }

            if(data[i].name == "BlueMine1" && data[i].isActive == false){
                blueMine1.defuse(gameGrid.grid);
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == false){
                blueMine2.defuse(gameGrid.grid);
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == false){
                blueMine3.defuse(gameGrid.grid);
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == false){
                blueMine4.defuse(gameGrid.grid);
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == false){
                blueMine5.defuse(gameGrid.grid);
            }
        }

		socket.emit('switchTurn', clientNickName, myColor);
		if(form.contains(endturnbtn)) {
			form.removeChild(endturnbtn);
		}
	}
     //console.log(gameGrid.grid[('(5,4)')]);
});

socket.on('reset boardvar', function(){
isInit = true;
toolboxWipe();
toolboxHunterFive();
enableHunterToolbox();
cellClickListeners();

gameGrid.resetGrid();
});

//ahshahdsa