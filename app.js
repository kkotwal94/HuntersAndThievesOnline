var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8080;
var express = require('express');
var path = require('path');

//app.use(express.static(path.join(__dirname, 'chat_app')));
//setting up our port
http.listen(port, function() {
console.log('Server is listening on port... ' + port);
});

//usernames connected to the chat
var usernames = {};
var numUsers = 0;
var rooms = ['Lobby','Dota 2 Chat','Joke Chat'];
var lobby = [];
var ready = {};
var clients = {};
var blueplayer = {};
var redplayer = {};
var blueplayerName;
var redplayerName;
var isInit = true;
var redinit = false;
var blueinit = false;
var gameStart = false;



//===================================Object replications, server holds each objects state===========//
//===============================================================
//Hero Model
//===============================================================
var Hero = function(name, type, location, team) {
    this.alive = true; //are we alive?
    this.nickname = name;  //is this hero pawn1? pawn2?
    this.location = location; //its spot or position on the grid
    this.type = type; //their type
    this.attack = true; //these characters can attack!
    this.hasMoved = false; //has this piece's location changed?
    this.team = team;
    this.setDead = function() {
        this.alive = false;
    }

    this.updateNickname = function(name) {
        this.nickname = name;
    }

    this.initLocation = function() {
        this.location = this.location;
    }

    this.updateLocation = function(location) {
        if(this.location == location) {
            this.hasMoved = false;
            this.location = location;
        } else {
            

            this.hasMoved = true;
            this.location = location;
            

        }

    }


}

//=============================================================
//Gold Model
//=============================================================
var Gold = function(goldname) {
    this.gold = goldname; //"Red or Blue"
    this.location = null;
    this.hasMoved = false;
    this.isPickedUp = false;
    this.isVisible = false;

    this.setVisible = function(val) {
        this.isVisible = val;
    }

    this.initLocation = function() {
        this.location = this.location;

    }
    this.updateLocation = function(location) {
        if(this.location == location) {
            this.hasMoved = false;
            this.location = location;
        } else {
            this.hasMoved = true;
            this.location = location;
        }

    }
}

//=============================================================
//Mine Model
//=============================================================
var Mine = function(name, type, isActive, team) {
    this.name = name;
    this.type = type;
    this.team = team;
    this.location = null;
    this.isActive = isActive; //is it explosive or defused
    this.hasMoved = false;
    this.isVisible = false; //do we want to see this actually

        this.setVisible = function(val) {
        this.isVisible = val;
    }

    this.defuse = function() {
        this.isActive = false;
    }
    this.initLocation = function(grid) { //draws our init location
        this.isActive = true;
        if(this.isVisible == false){
                //document.getElementById(this.location).classList.toggle("hasMine");
            } else {
                //document.getElementById(this.location).classList.toggle("hasMineInvis");
            }
    }
    
    this.updateLocation = function(location, grid) { //a location string, and grid object
        if(this.location == location) {
            this.hasMoved = false;
            this.location = location;
        } else {
            /*this.hasMoved = true;
            grid[this.location].trap.active = false;
            grid[this.location].trap.type = null;*/
    
            this.location = location;
            this.isActive = true;
            this.hasMoved = true;
                    if(this.isVisible == false){
                //document.getElementById(this.location).classList.toggle("hasMine");
            } else {
               // document.getElementById(this.location).classList.toggle("hasMineInvis");
            }
    
        }

    }

}
//=============================================================
//Online Player Model
//=============================================================

var Player = function(nickname, team, isInitializing){
    this.nickname = nickname; //set the player in the game
    this.heroes = []; //all the current pieces that exists
    this.mines = [];
    this.grid = {}; //players version of the grid
    this.team = team; //what color that player ends up Red | Blue?
    this.isInitPhase = isInitializing; //A boolean for checking if the player is in the 'Setting up the board phase'
    this.isTurn = false; //Is it players turn?
    this.win = null;
    this.isReady = false; //Is player Read in lobby
    this.isPlaying = false; //Is player playing right now

    this.addHero = function(hero) { //add a hero object
        this.heroes.push(hero);
        
    }

    this.addMines = function(mine) {
        this.mines.push(mine);
    }

    this.setHeroList = function(heros) { //set the hero list itself
        this.heroes = heros;
    }

    this.setMineList = function(mines) {
        this.mines = mines;
    }

    this.getHeroData = function(name) {
        var size = this.heroes.length;
        for(var i = 0; i < size; i++) {
            if(this.heroes[i].nickname == name) {
                return this.heroes[i];
            }
        }
    }

    this.setTurn = function() {
        this.isTurn = !this.isTurn;
    }

    this.setWin = function(wl) {
        if(wl == 'won') {
            this.setWin = true;
        } else {
            this.setWin = false;
        }
    }

    this.setReady = function() {
        this.isReady = !this.isReady;
    }

    this.setPlaying = function() {
        this.isPlaying = !this.isPlaying;
    }
}

//=============================================================
//Checking if things are working as expected (objects)
//var newHero = new Hero('BlueHunter1', 'Hunter', '(0,0)', 'Blue');
//var newPlayer = new Player('Karan', 'Blue', true);
//newPlayer.addHero(newHero);
//console.log(newPlayer.getHeroData('BlueHunter1'));
//newHero.updateLocation('(0,1)');
//console.log(newPlayer.getHeroData('BlueHunter1'));
//=============================================================
//Red Team :)
var redThief = new Hero("RedThief", "Thief", '(0,0)', 'Red');
var redHunter = new Hero("RedHunter", "Hunter", '(1,0)', 'Red');

var redThiefDecoy = new Hero("RedThiefDecoy", "DecoyThief", '(2,0)', 'Red');
var redHunterDecoy = new Hero("RedHunterDecoy", "DecoyHunter", '(3,0)', 'Red');

var redPawn1 = new Hero("RedPawn1", "Pawn", '(0,1)', 'Red');
var redPawn2 = new Hero("RedPawn2", "Pawn", '(1,1)', 'Red');
var redPawn3 = new Hero("RedPawn3", "Pawn", '(2,1)', 'Red');
var redPawn4 = new Hero("RedPawn4", "Pawn", '(3,1)', 'Red');
var redPawn5 = new Hero("RedPawn5", "Pawn", '(4,1)', 'Red');
var redMine1 = new Mine("RedMine1", "Mine", null, "Red");
var redMine2 = new Mine("RedMine2", "Mine", null, "Red");
var redMine3 = new Mine("RedMine3", "Mine", null, "Red");
var redMine4 = new Mine("RedMine4", "Mine", null, "Red");
var redMine5 = new Mine("RedMine5", "Mine", null, "Red");

var redGold = new Gold("RedGold");

//Blue Team :(
var blueThief = new Hero('BlueThief', "Thief", '(0,9)', 'Blue');
var blueHunter = new Hero('BlueHunter', "Hunter", '(1,9)', 'Blue');

var blueThiefDecoy = new Hero('BlueThiefDecoy', 'DecoyThief', '(2,9)', 'Blue');
var blueHunterDecoy = new Hero('BlueHunterDecoy', 'DecoyHunter', '(3,9)', 'Blue');

var bluePawn1 = new Hero("BluePawn1", "Pawn", '(0,8)', 'Blue');
var bluePawn2 = new Hero("BluePawn2", "Pawn", '(1,8)', 'Blue');
var bluePawn3 = new Hero("BluePawn3", "Pawn", '(2,8)', 'Blue');
var bluePawn4 = new Hero("BluePawn4", "Pawn", '(3,8)', 'Blue');
var bluePawn5 = new Hero("BluePawn5", "Pawn", '(4,8)', 'Blue');

var blueMine1 = new Mine("BlueMine1", "Mine", null, "Blue");
var blueMine2 = new Mine("BlueMine2", "Mine", null, "Blue");
var blueMine3 = new Mine("BlueMine3", "Mine", null, "Blue");
var blueMine4 = new Mine("BlueMine4", "Mine", null, "Blue");
var blueMine5 = new Mine("BlueMine5", "Mine", null, "Blue");

var blueGold = new Gold("BlueGold");

//===================================================================================================//


//===================================Server Stuff=====================================/
//====================================================================================/
//routing to our index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname +'/'));



//socket io, connected pls, server stuff
io.on('connection', function(socket) {
  //console.log("User has connected");
  socket.on('adduser', function(username) {
    socket.username = username;
    clients[socket.username] = {id: socket.id, username: socket.username, isPlaying: false};
    //adding our name to the global scope
    //console.log(username);
    socket.room = 'Lobby';
    usernames[username] = username;
    io.emit('updateusers', usernames);
    //usernames[username] = socket;
    //say this user has connected to client
    socket.join('Lobby');
    numUsers++;
    socket.broadcast.emit('chat message', socket.username + ' has connected to the chat!')
    socket.emit('updaterooms',rooms,'Lobby');
    io.emit('show lobbymembers', lobby);
    //socket.emit('lobbyfull', lobby);
    //socket.emit('readyComplete', readyStatus);
    //socket.emit('unreadyComplete', readyStatus);
    if(gameStart == true) {
        data = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold, redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold, redMine1, redMine2, redMine3, redMine4, redMine5, blueMine1, blueMine2, blueMine3, blueMine4, blueMine5];
        socket.emit('get currentboard', data);
    }
});

//socket on changing our nickname
socket.on('changenickname', function(new_username) {
   var temp;
   temp = usernames[socket.username];
   delete usernames[socket.username];
   socket.username = new_username;
   usernames[new_username] = new_username;
   clients[socket.username] = {id: socket.id, username: socket.username, isPlaying: false}; //change or add new id client stuff for a new user
   io.emit('updateusers', usernames);
   //usernames[new_username] = socket;
   io.emit('console message',"GAMECONSOLE: " + temp +' has changed his name to ' + socket.username);
	});

//how to handle chat message
socket.on('chat message', function(msg) {
   io.sockets.in(socket.room).emit('chat message', socket.username + ': '+ msg); 
});

//how to deal with checking lobby space
socket.on('check lobby', function() {
    if(lobby.length < 2) {
        socket.emit('lobby status', true);
    } else {
        socket.emit('lobby status', false);
    }
});

//how to deal with lobbyroom attempt
socket.on('attempting lobbyjoin', function(name) {
    if(lobby.length < 2) {
        lobby.push(name);
        socket.emit('success lobbyjoin');
        ready[name] = {name: name, isReady: false};
        io.emit('console message', "GAMECONSOLE: " + name + " has joined the game lobby!");
        io.emit('show lobbymembers', lobby);
    } else {
        socket.emit('fail lobbyjoin');
        socket.emit('console message', "GAMECONSOLE: Room is filled right now or closed, check the lobby space below!");
        io.emit('show lobbymembers', lobby);
    }
});

socket.on('leaving lobby', function(name) {
    var size = lobby.length;
    for(var i = 0; i < size; i++) {
        //console.log(lobby);
        //console.log(lobby[i]);
        //console.log(name);


        if(lobby[i] == name) {
            ready[name].isReady = false;
            lobby.splice(i, 1);
            if(lobby.length == 1) {
                io.sockets.connected[clients[lobby[0]].id].emit('turn off startgame');
            }
        }
    }

    socket.emit('lobby left');
    io.emit('show lobbymembers', lobby);
    io.emit('lobby status', true);
    io.emit('console message', "GAMECONSOLE: " + name + " has left the lobby, lobby has a open slot right now!");
});

socket.on('ready lobby', function(name, readyStatus) {
    if(readyStatus == true) {
        ready[name] = {name: name, isReady: true}
        io.emit('console message', "GAMECONSOLE: " + name + " has readied up!" );
    }

    socket.emit('ready success');

    var bothready = 0;

    for(var i=0; i < lobby.length; i++) {
        //current lobby
        console.log(lobby);
        console.log(ready);
        console.log(ready[lobby[i]]);
        if(ready[lobby[i]].isReady == true){
        //console.log(ready[lobby[i]]);
        bothready = bothready + 1;
        }
    }

    if(bothready == 2) { //emit to just the two sockets
        console.log("The lobby at both ready: " + lobby);
        io.emit('console message', "GAMECONSOLE: Game is ready to start, waiting for either player to hit start game..." );
        io.sockets.connected[clients[lobby[0]].id].emit('game can start'); //emit start game button to user 1
        io.sockets.connected[clients[lobby[1]].id].emit('game can start'); //emit start game button to user 2
    }
});

socket.on('unready lobby', function(name, readyStatus) {
    if(readyStatus == false) {
        //console.log("unreadylobby");
        //console.log(ready[name]);
        ready[name] = {name: name, isReady: false};


        //console.log(ready[name]);
    }
    if(lobby[0]!=undefined){
    io.sockets.connected[clients[lobby[0]].id].emit('turn off startgame'); //emit start game button to user 1
    }
    if(lobby[1]!=undefined){
    io.sockets.connected[clients[lobby[1]].id].emit('turn off startgame'); //emit start game button to user 2
    }

    io.emit('console message', "GAMECONSOLE: " + name + " has unreadied up!" );
    socket.emit('unready success');

});

  socket.on('startInitializePhase', function(name) {
    gameStart = true;
    io.sockets.connected[clients[lobby[0]].id].emit("colorplayerami", "Red", "Blue", true); //what team they are on, and if it is on init phase or not
    io.sockets.connected[clients[lobby[1]].id].emit("colorplayerami", "Blue", "Red", true); //what team they are on, and if it is init phase

    clients[lobby[0]].isPlaying = true;
    clients[lobby[1]].isPlaying = true;
    ready[lobby[0]].color = "Red";
    ready[lobby[1]].color = "Blue";

    io.emit("console message", "Player: " + lobby[0] + " is on the Red Team and " + "Player: " + lobby[1] + " is on the Blue Team");
    

  });

  socket.on('endTurnData', function(data, color) {
     if(color == "Red") {
        redinit = false;
        for(var i = 0; i < data.length; i++) {
            if(data[i].nickname == "RedThief" && data[i].alive == true){
                redThief.updateLocation(data[i].location)
            }
            if(data[i].nickname == "RedThief" && data[i].alive == false){
                redThief.setDead();
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == true){
                redHunter.updateLocation(data[i].location)
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == false){
                redHunter.setDead();
            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == true){
                redPawn1.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == false){
                redPawn1.setDead();
            }
            
            if(data[i].nickname == "RedPawn2" && data[i].alive == true){
                redPawn2.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn2" && data[i].alive == false){
                redPawn2.setDead();
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == true){
                redPawn3.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == false){
                redPawn3.setDead();
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == true){
                redPawn4.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == false){
                redPawn4.setDead();
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == true){
                redPawn5.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == false){
                redPawn5.setDead();
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == true){
                redThiefDecoy.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == false){
                redThiefDecoy.setDead();
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == true){
                redHunterDecoy.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == false){
                redHunterDecoy.setDead();
            }
            if(data[i].name == "RedMine1" && data[i].isActive == true){
                redMine1.updateLocation(data[i].location);
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == true){
                redMine2.updateLocation(data[i].location);

            }
            if(data[i].name == "RedMine3" && data[i].isActive == true){
                redMine3.updateLocation(data[i].location);
            }
            if(data[i].name == "RedMine4" && data[i].isActive == true){
                redMine4.updateLocation(data[i].location);
            }
            if(data[i].name == "RedMine5" && data[i].isActive == true){
                redMine5.updateLocation(data[i].location);
            }

            if(data[i].name == "RedMine1" && data[i].isActive == false){
                redMine1.defuse();
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == false){
                redMine2.defuse();

            }
            if(data[i].name == "RedMine3" && data[i].isActive == false){
                redMine3.defuse();
            }
            if(data[i].name == "RedMine4" && data[i].isActive == false){
                redMine4.defuse();
            }
            if(data[i].name == "RedMine5" && data[i].isActive == false){
                redMine5.defuse();
            }
            if(data[i].gold == "RedGold"){
                redGold.updateLocation(data[i].location);
            }

             if(data[i].gold == "BlueGold"){
                blueGold.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BlueThief" && data[i].alive == true){
                blueThief.updateLocation(data[i].location)
            }

            if(data[i].nickname == "BlueThief" && data[i].alive == false){
                blueThief.setDead();
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == true){
                blueHunter.updateLocation(data[i].location)
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == false){
                blueHunter.setDead();
            }


            if(data[i].nickname == "BluePawn1" && data[i].alive == true){
                bluePawn1.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BluePawn1" && data[i].alive == false){
                bluePawn1.setDead();
            }

            if(data[i].nickname == "BluePawn2" && data[i].alive == true){
                bluePawn2.updateLocation(data[i].location);
            }

             if(data[i].nickname == "BluePawn2" && data[i].alive == false){
                bluePawn2.setDead();
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == true){
                bluePawn3.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == false){
                bluePawn3.setDead();
            }


            if(data[i].nickname == "BluePawn4" && data[i].alive == true){
                bluePawn4.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BluePawn4" && data[i].alive == false){
                bluePawn4.setDead();
            }


            if(data[i].nickname == "BluePawn5" && data[i].alive == true){
                bluePawn5.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BluePawn5" && data[i].alive == false){
                bluePawn5.setDead();
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == true){
                blueThiefDecoy.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == false){
                blueThiefDecoy.setDead();
            }
            
            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == true){
                blueHunterDecoy.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == false){
                blueHunterDecoy.setDead();
            }


            if(data[i].name == "BlueMine1" && data[i].isActive == true){
                blueMine1.updateLocation(data[i].location);
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == true){
                blueMine2.updateLocation(data[i].location);
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == true){
                blueMine3.updateLocation(data[i].location);
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == true){
                blueMine4.updateLocation(data[i].location);
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == true){
                blueMine5.updateLocation(data[i].location);
            }

            if(data[i].name == "BlueMine1" && data[i].isActive == false){
                blueMine1.defuse();
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == false){
                blueMine2.defuse();
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == false){
                blueMine3.defuse();
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == false){
                blueMine4.defuse();
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == false){
                blueMine5.defuse();
            }
        }
        var data = [redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold, redMine1, redMine2, redMine3, redMine4, redMine5, blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueMine1, blueMine2, blueMine3, blueMine4, blueMine5, redGold, blueGold];
        io.emit('console message', "GAMECONSOLE: " + lobby[0] + ' has finished their move!');
        io.sockets.connected[clients[lobby[1]].id].emit('endturncomplete',data, "Blue");
        //io.sockets.connected[clients[lobby[0]].id].emit('endturncomplete',data, "Red");
    }

    if(color == "Blue") {
        blueinit = false;
        for(var i = 0; i < data.length; i++) {
            if(data[i].nickname == "RedThief" && data[i].alive == true){
                redThief.updateLocation(data[i].location)
            }
            if(data[i].nickname == "RedThief" && data[i].alive == false){
                redThief.setDead();
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == true){
                redHunter.updateLocation(data[i].location)
            }

            if(data[i].nickname == "RedHunter" && data[i].alive == false){
                redHunter.setDead();
            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == true){
                redPawn1.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn1" && data[i].alive == false){
                redPawn1.setDead();
            }
            
            if(data[i].nickname == "RedPawn2" && data[i].alive == true){
                redPawn2.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn2" && data[i].alive == false){
                redPawn2.setDead();
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == true){
                redPawn3.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn3" && data[i].alive == false){
                redPawn3.setDead();
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == true){
                redPawn4.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn4" && data[i].alive == false){
                redPawn4.setDead();
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == true){
                redPawn5.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedPawn5" && data[i].alive == false){
                redPawn5.setDead();
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == true){
                redThiefDecoy.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedThiefDecoy" && data[i].alive == false){
                redThiefDecoy.setDead();
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == true){
                redHunterDecoy.updateLocation(data[i].location);
            }

            if(data[i].nickname == "RedHunterDecoy" && data[i].alive == false){
                redHunterDecoy.setDead();
            }
            if(data[i].name == "RedMine1" && data[i].isActive == true){
                redMine1.updateLocation(data[i].location);
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == true){
                redMine2.updateLocation(data[i].location);

            }
            if(data[i].name == "RedMine3" && data[i].isActive == true){
                redMine3.updateLocation(data[i].location);
            }
            if(data[i].name == "RedMine4" && data[i].isActive == true){
                redMine4.updateLocation(data[i].location);
            }
            if(data[i].name == "RedMine5" && data[i].isActive == true){
                redMine5.updateLocation(data[i].location);
            }

            if(data[i].name == "RedMine1" && data[i].isActive == false){
                redMine1.defuse();
                
            }
            if(data[i].name == "RedMine2" && data[i].isActive == false){
                redMine2.defuse();

            }
            if(data[i].name == "RedMine3" && data[i].isActive == false){
                redMine3.defuse();
            }
            if(data[i].name == "RedMine4" && data[i].isActive == false){
                redMine4.defuse();
            }
            if(data[i].name == "RedMine5" && data[i].isActive == false){
                redMine5.defuse();
            }
            if(data[i].gold ==  "RedGold"){
                redGold.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BlueThief" && data[i].alive == true){
                blueThief.updateLocation(data[i].location)
            }

            if(data[i].nickname == "BlueThief" && data[i].alive == false){
                blueThief.setDead();
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == true){
                blueHunter.updateLocation(data[i].location)
            }

            if(data[i].nickname == "BlueHunter" && data[i].alive == false){
                blueHunter.setDead();
            }


            if(data[i].nickname == "BluePawn1" && data[i].alive == true){
                bluePawn1.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BluePawn1" && data[i].alive == false){
                bluePawn1.setDead();
            }

            if(data[i].nickname == "BluePawn2" && data[i].alive == true){
                bluePawn2.updateLocation(data[i].location);
            }

             if(data[i].nickname == "BluePawn2" && data[i].alive == false){
                bluePawn2.setDead();
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == true){
                bluePawn3.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BluePawn3" && data[i].alive == false){
                bluePawn3.setDead();
            }


            if(data[i].nickname == "BluePawn4" && data[i].alive == true){
                bluePawn4.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BluePawn4" && data[i].alive == false){
                bluePawn4.setDead();
            }


            if(data[i].nickname == "BluePawn5" && data[i].alive == true){
                bluePawn5.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BluePawn5" && data[i].alive == false){
                bluePawn5.setDead();
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == true){
                blueThiefDecoy.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BlueThiefDecoy" && data[i].alive == false){
                blueThiefDecoy.setDead();
            }
            
            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == true){
                blueHunterDecoy.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BlueHunterDecoy" && data[i].alive == false){
                blueHunterDecoy.setDead();
            }


            if(data[i].name == "BlueMine1" && data[i].isActive == true){
                blueMine1.updateLocation(data[i].location);
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == true){
                blueMine2.updateLocation(data[i].location);
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == true){
                blueMine3.updateLocation(data[i].location);
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == true){
                blueMine4.updateLocation(data[i].location);
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == true){
                blueMine5.updateLocation(data[i].location);
            }

            if(data[i].name == "BlueMine1" && data[i].isActive == false){
                blueMine1.defuse();
            }
            if(data[i].name == "BlueMine2" && data[i].isActive == false){
                blueMine2.defuse();
            }
            if(data[i].name == "BlueMine3" && data[i].isActive == false){
                blueMine3.defuse();
            }
            if(data[i].name == "BlueMine4" && data[i].isActive == false){
                blueMine4.defuse();
            }
            if(data[i].name == "BlueMine5" && data[i].isActive == false){
                blueMine5.defuse();
            }
        }
        var data = [redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold, redMine1, redMine2, redMine3, redMine4, redMine5, blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueMine1, blueMine2, blueMine3, blueMine4, blueMine5, redGold, blueGold];
        io.emit('console message', "GAMECONSOLE: " + lobby[1] + ' has finished their move!');
        io.sockets.connected[clients[lobby[0]].id].emit('endturncomplete',data, "Red");
    }

     for(var name in clients) {
            var data = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold, redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold, redMine1, redMine2, redMine3, redMine4, redMine5, blueMine1, blueMine2, blueMine3, blueMine4, blueMine5];

            if(name != lobby[0] && name!= lobby[1]) {
                io.sockets.connected[clients[name].id].emit('get currentboard', data);
            }
        }

  });


  socket.on('initPhaseData', function(data, color) {

    if(color == "Red") {
        redinit = true;
        for(var i = 0; i < data.length; i++) {
            if(data[i].nickname == "RedThief"){
                redThief.updateLocation(data[i].location)
            }

            if(data[i].nickname == "RedHunter"){
                redHunter.updateLocation(data[i].location)
            }
            if(data[i].nickname == "RedPawn1"){
                redPawn1.updateLocation(data[i].location);
            }
            if(data[i].nickname == "RedPawn2"){
                redPawn2.updateLocation(data[i].location);
            }
            if(data[i].nickname == "RedPawn3"){
                redPawn3.updateLocation(data[i].location);
            }
            if(data[i].nickname == "RedPawn4"){
                redPawn4.updateLocation(data[i].location);
            }
            if(data[i].nickname == "RedPawn5"){
                redPawn5.updateLocation(data[i].location);
            }
            if(data[i].nickname == "RedThiefDecoy"){
                redThiefDecoy.updateLocation(data[i].location);
            }
            if(data[i].nickname == "RedHunterDecoy"){
                redHunterDecoy.updateLocation(data[i].location);
            }
            if(data[i].gold == "RedGold"){
                console.log(data[i]);
                redGold.updateLocation(data[i].location);
            }
        }
        io.emit('console message', "GAMECONSOLE: " + lobby[0] + ' has finished setting up pieces!');
    }

    if(color == "Blue") {
        blueinit = true;
        for(var i = 0; i < data.length; i++) {
            if(data[i].nickname == "BlueThief"){
                blueThief.updateLocation(data[i].location)
            }

            if(data[i].nickname == "BlueHunter"){
                blueHunter.updateLocation(data[i].location)
            }
            if(data[i].nickname == "BluePawn1"){
                bluePawn1.updateLocation(data[i].location);
            }
            if(data[i].nickname == "BluePawn2"){
                bluePawn2.updateLocation(data[i].location);
            }
            if(data[i].nickname == "BluePawn3"){
                bluePawn3.updateLocation(data[i].location);
            }
            if(data[i].nickname == "BluePawn4"){
                bluePawn4.updateLocation(data[i].location);
            }
            if(data[i].nickname == "BluePawn5"){
                bluePawn5.updateLocation(data[i].location);
            }
            if(data[i].gold == "BlueGold"){
                console.log(data[i]);
                blueGold.updateLocation(data[i].location);
            }

            if(data[i].nickname == "BlueThiefDecoy"){
                blueThiefDecoy.updateLocation(data[i].location);
            }
            if(data[i].nickname == "BlueHunterDecoy"){
                blueHunterDecoy.updateLocation(data[i].location);
            }
        }

        io.emit('console message', "GAMECONSOLE: " + lobby[1] + ' has finished setting up pieces!');
    }

    if(blueinit == true && redinit ==true){
        var dataToSendRedPlayer = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold];
        var dataToSendBluePlayer = [redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold];
        var data = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold, redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold];

        console.log("Both inits are true");
        io.sockets.connected[clients[lobby[0]].id].emit('init complete', dataToSendRedPlayer, "Red");
        io.sockets.connected[clients[lobby[1]].id].emit('init complete', dataToSendBluePlayer, "Blue");



        for(var name in clients) {
            if(name != lobby[0] && name!= lobby[1]) {
                io.sockets.connected[clients[name].id].emit('get currentboard', data);
            }
        }

        io.emit('console message', "GAMECONSOLE: LOADED EACH PLAYERS BOARD AFTER INITIALIZING");
        io.emit('console message', "GAMECONSOLE: It is " + lobby[1]+ " turn first, waiting for their move...")
        io.sockets.connected[clients[lobby[1]].id].emit('turn', lobby[1]);
        io.sockets.connected[clients[lobby[0]].id].emit('disable movement', lobby[0], true);
    }

  });
//japan
  socket.on('disconnect', function() {
    var gameplayerhasleft = false;
    var username = socket.username;
    //removes the username from global array of username
    delete usernames[socket.username];
    numUsers--;
    for(var i =0; i<lobby.length;i++){
        if(socket.username == lobby[i]){
            //console.log("In disconnect");
            //console.log(ready[socket.username].isReady)
            ready[socket.username].isReady = false;
            //console.log(ready[socket.username].isReady)
            lobby.splice(i,1);
            gameplayerhasleft = true;
        }
    }
    //io.sockets.emit('lobbyfull', lobby); //emit to all sockets
    //update list of users in chat, client side
    io.emit('updateusers', usernames);
    //tell chat room user has left

    socket.broadcast.emit('chat message', socket.username + ' has disconnected');
    if(gameplayerhasleft == true) {
        for(var user in ready){
            user.isReady = false;
        }
    io.emit('console message', "GAME CONSOLE: " + username + " has forfeited, other player has won!");
    lobby = [];

    io.emit('reset ui');
    io.emit('lobby status', true);


   resetBoard();

    

    io.emit('show lobbymembers', lobby);
    io.emit('lobby status', true);
    var data = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold, redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold];

    io.emit("get currentboard", data);
    io.emit('reset boardvar');
    }
    socket.leave(socket.room);


});

  socket.on('giveup', function(name, color) { //losing
    ready[lobby[0]].isReady = false;
    ready[lobby[1]].isReady = false;
    
    for(var user in ready){
            user.isReady = false;
        }

    if(color == "Red") {
    io.emit('console message', "GAMECONSOLE: " + lobby[0] + " has been defeated!");
    io.emit('console message', "GAMECONSOLE: " + lobby[1] + " has won!");
    }
    if(color == "Blue") {
    io.emit('console message', "GAMECONSOLE: " + lobby[1] + " has been defeated!");
    io.emit('console message', "GAMECONSOLE: " + lobby[0] + " has won!");

    }

    lobby = [];

    io.emit('reset ui');
    io.emit('lobby status', true);


   resetBoard();

    

    io.emit('show lobbymembers', lobby);
    io.emit('lobby status', true);
    var data = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold, redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold];

    io.emit("get currentboard", data);
    io.emit('reset boardvar');
  });


socket.on('haswon', function(name) {
    ready[lobby[0]].isReady = false;
    ready[lobby[1]].isReady = false;
    
    for(var user in ready){
            user.isReady = false;
        }

    io.emit('console message', "GAMECONSOLE: " + name + " has found the gold and won!");

    lobby = [];

    io.emit('reset ui');
    io.emit('lobby status', true);


   resetBoard();

    

    io.emit('show lobbymembers', lobby);
    io.emit('lobby status', true);
    var data = [blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5, blueGold, redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, redGold];

    io.emit("get currentboard", data);
    io.emit('reset boardvar');

    });

  socket.on('switchTurn', function(name, color) {
    if(lobby[0] == name) {
         io.emit('console message', "GAMECONSOLE: It is " + lobby[0]+ " move, waiting for their move...")
        io.sockets.connected[clients[lobby[0]].id].emit('turn', lobby[0]);
        io.sockets.connected[clients[lobby[1]].id].emit('disable movement', lobby[1], true);
    }

    if(lobby[1] == name) {
         io.emit('console message', "GAMECONSOLE: It is " + lobby[1]+ " move, waiting for their move...")
        io.sockets.connected[clients[lobby[1]].id].emit('turn', lobby[1]);
        io.sockets.connected[clients[lobby[0]].id].emit('disable movement', lobby[0], true);
    }
  });

   socket.on('getUsers', function() {
	socket.emit('updateusers', usernames);
	});

});



function resetBoard() {
    var redThiefc = new Hero("RedThief", "Thief", '(0,0)', 'Red');
    var redHunterc = new Hero("RedHunter", "Hunter", '(1,0)', 'Red');

    var redThiefDecoyc = new Hero("RedThiefDecoy", "DecoyThief", '(2,0)', 'Red');
    var redHunterDecoyc = new Hero("RedHunterDecoy", "DecoyHunter", '(3,0)', 'Red');

    var redPawn1c = new Hero("RedPawn1", "Pawn", '(0,1)', 'Red');
    var redPawn2c = new Hero("RedPawn2", "Pawn", '(1,1)', 'Red');
    var redPawn3c = new Hero("RedPawn3", "Pawn", '(2,1)', 'Red');
    var redPawn4c = new Hero("RedPawn4", "Pawn", '(3,1)', 'Red');
    var redPawn5c = new Hero("RedPawn5", "Pawn", '(4,1)', 'Red');

    var redGoldc = new Gold("RedGold"); 
    redGoldc.location = null;
    var redMine1c = new Mine("RedMine1", "Mine", false, "Red");
    redMine1c.location = null;
    var redMine2c = new Mine("RedMine2", "Mine", false, "Red");
    redMine2c.location = null;
    var redMine3c= new Mine("RedMine3", "Mine", false, "Red");
    redMine3c.location = null;
    var redMine4c = new Mine("RedMine4", "Mine", false, "Red");
    redMine4c.location = null;
    var redMine5c = new Mine("RedMine5", "Mine", false, "Red");
    redMine5c.location = null;

    //Blue Team :(
    var blueThiefc = new Hero('BlueThief', "Thief", '(0,9)', 'Blue');
    var blueHunterc = new Hero('BlueHunter', "Hunter", '(1,9)', 'Blue');

    var blueThiefDecoyc = new Hero('BlueThiefDecoy', 'DecoyThief', '(2,9)', 'Blue');
    var blueHunterDecoyc = new Hero('BlueHunterDecoy', 'DecoyHunter', '(3,9)', 'Blue');

    var bluePawn1c = new Hero("BluePawn1", "Pawn", '(0,8)', 'Blue');
    var bluePawn2c = new Hero("BluePawn2", "Pawn", '(1,8)', 'Blue');
    var bluePawn3c = new Hero("BluePawn3", "Pawn", '(2,8)', 'Blue');
    var bluePawn4c = new Hero("BluePawn4", "Pawn", '(3,8)', 'Blue');
    var bluePawn5c = new Hero("BluePawn5", "Pawn", '(4,8)', 'Blue');

    var blueMine1c = new Mine("BlueMine1", "Mine", false, "Blue");
    var blueMine2c = new Mine("BlueMine2", "Mine", false, "Blue");
    var blueMine3c = new Mine("BlueMine3", "Mine", false, "Blue");
    var blueMine4c = new Mine("BlueMine4", "Mine", false, "Blue");
    var blueMine5c = new Mine("BlueMine5", "Mine", false, "Blue");

    blueMine1c.location = null;
    blueMine2c.location = null;
    blueMine3c.location = null;
    blueMine4c.location = null;
    blueMine5c.location = null;


    var blueGoldc = new Gold("BlueGold");
    blueGoldc.location = null;


    redThief = redThiefc;
    redHunter = redHunterc;
    redThiefDecoy = redThiefDecoyc;
    redHunterDecoy = redHunterDecoyc;
    redPawn1 = redPawn1c;
    redPawn2 = redPawn2c;
    redPawn3 = redPawn3c;
    redPawn4 = redPawn4c;
    redPawn5 = redPawn5c;
    redMine1 = redMine1c;
    redMine2 = redMine2c;
    redMine3 = redMine3c;
    redMine4 = redMine4c;
    redMine5 = redMine5c;
    redGold = redGoldc;

    blueThief = blueThiefc;
    blueHunter = blueHunterc;
    blueThiefDecoy = blueThiefDecoyc;
    blueHunterDecoy = blueHunterDecoyc;
    bluePawn1 = bluePawn1c;
    bluePawn2 = bluePawn2c;
    bluePawn3 = bluePawn3c;
    bluePawn4 = bluePawn4c;
    bluePawn5 = bluePawn5c;
    blueMine1 = blueMine1c;
    blueMine2 = blueMine2c;
    blueMine3 = blueMine3c;
    blueMine4 = blueMine4c;
    blueMine5 = blueMine5c;
    blueGold = blueGoldc;


    isInit = true;
    redinit = false;
    blueinit = false;
    gameStart = false;
}