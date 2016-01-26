
//asdasdsa
//Hero Class, could be a Thief, Hunter, what team is he on? Also are there any pawns?

var socket = io();


//===============================================================
//What the board should look like after the init phase!
//5bluePawns, 1 Blue Hunter, 1 Blue thief, 1 blue gold
//5redPawns, 1 Red Hunter, 1 Red thief, 1 red gold
//==============================================================
var clientNickName;
var returnedClientId;
var $table = document.createElement('table'); //creating table element
var $gameDiv = document.getElementById('gameContent');  //getting gameDiv element
$table.id = "gameGrid"; //setting table id

var isInit = true;
var isSelected = false;
var isTurn = true;
var enemyTurn = false;
var currentSelectedTile = null;
var currentValidMoveLocations = [];
var makingMove = 0;
var currentNumOfValid = 0;
var whoseTurn = "Blue";
var isTrapPlaced = false;
var goldPlaced = false;
var lastTrap = null;
var myPlayer= "Blue";
var enemyPlayer="Red";
var isLobbyFull = false;
var lobbySize = 0;
var hasWon = false;
var redTrapNumber = 5;
var blueTrapNumber = 5;
var draggedMines = {};
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
    this.decoy = false;
    this.setDead = function() {
        this.alive = false;
    }

    this.setDecoy = function(val) {
        this.decoy = val;
    }

    this.updateNickname = function(name) {
        this.nickname = name;
    }

    this.emitDead = function(grid) {
        if(this.alive == false) {
            //grid[this.location].hasPlayer = false;
            //grid[this.location].playerType = null;
            //grid[this.location].playerTeam = null;
            //grid[this.location].playerNickName = null;
            //this.alive = "OmegaDead";

        if(this.type=="Hunter" && this.team=="Red") {
            if(document.getElementById(this.location).classList.contains('hasRedHunter')){
            document.getElementById(this.location).classList.toggle('hasRedHunter');
        }
        }

        if(this.type=="Hunter" && this.team=="Blue") {
            if(document.getElementById(this.location).classList.contains('hasBlueHunter')){
            document.getElementById(this.location).classList.toggle('hasBlueHunter');
        }
        }

        if(this.type=="Thief" && this.team=="Red") {
            if(document.getElementById(this.location).classList.contains('hasRedThief')){
            document.getElementById(this.location).classList.toggle('hasRedThief');
        }
        }

        if(this.type=="Thief" && this.team=="Blue") {
            if(document.getElementById(this.location).classList.contains('hasBlueThief')){
            document.getElementById(this.location).classList.toggle('hasBlueThief');
        }
        }

        if(this.type=="DecoyHunter" && this.team=="Red") {
            if(document.getElementById(this.location).classList.contains('hasDecoyRedHunter')){
            document.getElementById(this.location).classList.toggle('hasDecoyRedHunter');
        }}

        if(this.type=="DecoyHunter" && this.team=="Blue") {
            if(document.getElementById(this.location).classList.contains('hasDecoyBlueHunter')){
            document.getElementById(this.location).classList.toggle('hasDecoyBlueHunter');
        }
        }

        if(this.type=="DecoyThief" && this.team=="Red") {
            if(document.getElementById(this.location).classList.contains('hasDecoyRedThief')){
            document.getElementById(this.location).classList.toggle('hasDecoyRedThief');
        }
        }

        if(this.type=="DecoyThief" && this.team=="Blue") {
            if(document.getElementById(this.location).classList.contains('hasDecoyBlueThief')){
            document.getElementById(this.location).classList.toggle('hasDecoyBlueThief');
        }
        }

        if(this.type=="Pawn" && this.team=="Red") {
            if(document.getElementById(this.location).classList.contains('hasRedPawn')){
            document.getElementById(this.location).classList.toggle('hasRedPawn');
        }
        }
        if(this.type=="Pawn" && this.team=="Blue") {
            if(document.getElementById(this.location).classList.contains('hasBluePawn')){
            document.getElementById(this.location).classList.toggle('hasBluePawn');
        }
        }
    }
}
    this.initLocation = function(grid) {
        grid[this.location].hasPlayer = true;
        grid[this.location].playerType = this.type;
        grid[this.location].playerTeam = this.team;
        grid[this.location].playerNickName = this.nickname;
        
        if(this.type=="Hunter" && this.team=="Red") {
            document.getElementById(this.location).classList.toggle('hasRedHunter');
        }

        if(this.type=="Hunter" && this.team=="Blue") {
            document.getElementById(this.location).classList.toggle('hasBlueHunter');
        }

        if(this.type=="Thief" && this.team=="Red") {
            document.getElementById(this.location).classList.toggle('hasRedThief');
        }

        if(this.type=="Thief" && this.team=="Blue") {
            document.getElementById(this.location).classList.toggle('hasBlueThief');
        }

        if(this.type=="DecoyHunter" && this.team=="Red") {
            document.getElementById(this.location).classList.toggle('hasDecoyRedHunter');
        }

        if(this.type=="DecoyHunter" && this.team=="Blue") {
            document.getElementById(this.location).classList.toggle('hasDecoyBlueHunter');
        }

        if(this.type=="DecoyThief" && this.team=="Red") {
            document.getElementById(this.location).classList.toggle('hasDecoyRedThief');
        }

        if(this.type=="DecoyThief" && this.team=="Blue") {
            document.getElementById(this.location).classList.toggle('hasDecoyBlueThief');
        }

        if(this.type=="Pawn" && this.team=="Red") {
            document.getElementById(this.location).classList.toggle('hasRedPawn');
        }
        if(this.type=="Pawn" && this.team=="Blue") {
            document.getElementById(this.location).classList.toggle('hasBluePawn');
        }

    }

    this.updateLocation = function(location, grid) {
        if(this.location == location) {
            this.hasMoved = false;
            this.location = location;
        } else {
            //remove previous grid edits
            grid[this.location].hasPlayer = false;
            grid[this.location].playerType = null;
            grid[this.location].playerTeam = null;
            grid[this.location].playerNickName = null;
            //untoggle previous grid stuff
                if(this.type=="Hunter" && this.team=="Red") {
                    document.getElementById(this.location).classList.toggle('hasRedHunter');
                }

                if(this.type=="Hunter" && this.team=="Blue") {
                    document.getElementById(this.location).classList.toggle('hasBlueHunter');
                }

                if(this.type=="Thief" && this.team=="Red") {
                    document.getElementById(this.location).classList.toggle('hasRedThief');
                }

                if(this.type=="Thief" && this.team=="Blue") {
                    document.getElementById(this.location).classList.toggle('hasBlueThief');
                }

                if(this.type=="DecoyHunter" && this.team=="Red") {
                    document.getElementById(this.location).classList.toggle('hasDecoyRedHunter');
                }

                if(this.type=="DecoyHunter" && this.team=="Blue") {
                    document.getElementById(this.location).classList.toggle('hasDecoyBlueHunter');
                }

                if(this.type=="DecoyThief" && this.team=="Red") {
                    document.getElementById(this.location).classList.toggle('hasDecoyRedThief');
                }

                if(this.type=="DecoyThief" && this.team=="Blue") {
                    document.getElementById(this.location).classList.toggle('hasDecoyBlueThief');
                }

                if(this.type=="Pawn" && this.team=="Red") {
                    document.getElementById(this.location).classList.toggle('hasRedPawn');
                }
                if(this.type=="Pawn" && this.team=="Blue") {
                    document.getElementById(this.location).classList.toggle('hasBluePawn');
                }

            this.hasMoved = true;
            this.location = location;
            //set New Location
            //Set new grid data
            //Toggle new classes for each cell to show new location
            grid[this.location].hasPlayer = true;
            grid[this.location].playerType = this.type;
            grid[this.location].playerTeam = this.team;
            grid[this.location].playerNickName = this.nickname;

            if(this.type=="Hunter" && this.team=="Red") {
                document.getElementById(this.location).classList.toggle('hasRedHunter');
            }

            if(this.type=="Hunter" && this.team=="Blue") {
                document.getElementById(this.location).classList.toggle('hasBlueHunter');
            }

            if(this.type=="Thief" && this.team=="Red") {
                document.getElementById(this.location).classList.toggle('hasRedThief');
            }

            if(this.type=="Thief" && this.team=="Blue") {
                document.getElementById(this.location).classList.toggle('hasBlueThief');
            }

            if(this.type=="DecoyHunter" && this.team=="Red") {
                document.getElementById(this.location).classList.toggle('hasDecoyRedHunter');
            }

            if(this.type=="DecoyHunter" && this.team=="Blue") {
                document.getElementById(this.location).classList.toggle('hasDecoyBlueHunter');
            }

            if(this.type=="DecoyThief" && this.team=="Red") {
                document.getElementById(this.location).classList.toggle('hasDecoyRedThief');
            }

            if(this.type=="DecoyThief" && this.team=="Blue") {
                document.getElementById(this.location).classList.toggle('hasDecoyBlueThief');
            }

            if(this.type=="Pawn" && this.team=="Red") {
                console.log("Redunderling");
                document.getElementById(this.location).classList.toggle('hasRedPawn');
            }
            if(this.type=="Pawn" && this.team=="Blue") {
                console.log("BlueUnderling");
                document.getElementById(this.location).classList.toggle('hasBluePawn');
            }
        }

    }


}

//=============================================================
//Gold Model
//=============================================================
var Gold = function(type) {
    this.gold = type; //"Red or Blue"
    this.location = null;
    this.hasMoved = false;
    this.isPickedUp = false;
    this.isVisible = false;

    this.initLocation = function(grid) {
        
        if(!document.getElementById(this.location).classList.contains("hasGold")){
                document.getElementById(this.location).classList.toggle("hasGold");
            } 
    }

    this.setVisible = function(val) {
        this.isVisible = val;
             if(this.isVisible == true){
                if(this.location != null) {
                    if(!document.getElementById(this.location).classList.contains("hasGold")){
                    document.getElementById(this.location).classList.toggle("hasGold");
                }
            } 
    }
    }
    this.updateLocation = function(location, grid) { //a location string, and grid object
        if(this.location == location) {
            this.hasMoved = false;
            this.location = location;
        } else {
            if(location == null) {
                if(grid!=undefined){
                grid[this.location].gold.active = false;
                grid[this.location].gold.type = null;
                if(document.getElementById(this.location).classList.contains("hasGold")) {
                    document.getElementById(this.location).classList.toggle("hasGold");  
                }
            }
            } else {

            if(this.location == null) {
                 this.isActive = true;
                 this.location = location;
                 grid[this.location].gold.active = true;
                 grid[this.location].gold.type = this.team;
                 console.log(grid[this.location].gold.active);
            }
            else {
            this.hasMoved = true;
            grid[this.location].gold.active = false;
            console.log("Gold Grid location before: " + grid[this.location].gold.active);
            grid[this.location].gold.type = null;
            this.location = location;
            grid[this.location].gold.active = true;
            console.log("Gold Grid location after: " + grid[this.location].gold.active);
            grid[this.location].gold.type = this.team;
            this.isActive = true;
                    if(this.isVisible == false){
                //document.getElementById(this.location).classList.toggle("hasMine");
            } else {
               // document.getElementById(this.location).classList.toggle("hasMineInvis");
            }
        }
            }
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
        if(val == true){
            if(!document.getElementById(this.location).classList.contains("hasMine")){
            document.getElementById(this.location).classList.toggle("hasMine");
            }
        }

        if(val == false) {
            if(document.getElementById(this.location).classList.contains("hasMine")){
            document.getElementById(this.location).classList.toggle("hasMine");
            }

        }
    }

    this.defuse = function(grid) {
        this.isActive = false;
        /*
        grid[this.location].trap.active = false;
        grid[this.location].trap.type = null;
        grid[this.location].trap.name = null;
        */
        if(this.name == "BlueMine1" || this.name == "RedMine1") {
            if(document.getElementById(this.location).classList.contains("hasMine")) {
                document.getElementById(this.location).classList.toggle("hasMine");
            } else {
                if(document.getElementById("mine1") != null) {
                var image = document.getElementById("mine1");
                image.parentNode.removeChild(image);
            }
            }
        }


        if(this.name == "BlueMine2" || this.name == "RedMine2") {
            if(document.getElementById(this.location).classList.contains("hasMine")) {
                document.getElementById(this.location).classList.toggle("hasMine");
            } else {
                if(document.getElementById("mine2") != null) {
                var image = document.getElementById("mine2");
                image.parentNode.removeChild(image);
            }
            }
        }


        if(this.name == "BlueMine3" || this.name == "RedMine3") {
            if(document.getElementById(this.location).classList.contains("hasMine")) {
                document.getElementById(this.location).classList.toggle("hasMine");
            } else {
                if(document.getElementById("mine3") != null) {
                var image = document.getElementById("mine3");
                image.parentNode.removeChild(image);
            }
            }
        }

        if(this.name == "BlueMine4" || this.name == "RedMine4") {
            if(document.getElementById(this.location).classList.contains("hasMine")) {
                document.getElementById(this.location).classList.toggle("hasMine");
            } else {
                if(document.getElementById("mine4") != null) {
                var image = document.getElementById("mine4");
                image.parentNode.removeChild(image);
            }
            }
        }


        if(this.name == "BlueMine5" || this.name == "RedMine5") {
            if(document.getElementById(this.location).classList.contains("hasMine")) {
                document.getElementById(this.location).classList.toggle("hasMine");
            } else {
                if(document.getElementById("mine5") != null) {
                var image = document.getElementById("mine5");
                image.parentNode.removeChild(image);
            }
            }
        }



    }
    this.emitDefuse = function(grid) {
        //remove img inside td here...
    }

    this.initLocation = function(grid) { //draws our init location
        this.isActive = true;
        grid[this.location].trap.active = true;
        grid[this.location].trap.type = this.team;
        grid[this.location].trap.name = this.name;
        console.log(grid[this.location].trap.active);
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
            if(location == null) {
                grid[this.location].trap.active = false;
                grid[this.location].trap.type = null;
                grid[this.location].trap.name = null;
                if(document.getElementById(this.location).classList.contains("hasMine")) {
                    document.getElementById(this.location).classList.toggle("hasMine");  
                }
            } else {

            if(this.location == null) {
                 this.isActive = true;
                 this.location = location;
                 grid[this.location].trap.active = true;
                 grid[this.location].trap.type = this.team;
                 grid[this.location].trap.name = this.name;
                 console.log(grid[this.location].trap.active);
            }
            else {
            this.hasMoved = true;
            grid[this.location].trap.active = false;
            grid[this.location].trap.name = null;
            console.log("Grid location before: " + grid[this.location].trap.active);
            grid[this.location].trap.type = null;
            this.location = location;
            grid[this.location].trap.active = true;
            console.log("Grid location after: " + grid[this.location].trap.active);
            grid[this.location].trap.type = this.team;
            grid[this.location].trap.name = this.name;
            this.isActive = true;
                    if(this.isVisible == false){
                //document.getElementById(this.location).classList.toggle("hasMine");
            } else {
               // document.getElementById(this.location).classList.toggle("hasMineInvis");
            }
        }
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

//================================================================
//Grid Model
//================================================================
var Grid = function(size) {
    this.halfpoint = size / 2;
    this.size = size;
    this.grid = {};
    this.createGrid = function() {
        for(var i =0; i< this.size; i++) {
            var $tr = document.createElement('tr'); //create a new table row
            $tr.id = "row: " + i; //give the id row: 0 ... 1 .. 2
            if(i <= this.halfpoint-1) {
                $tr.classList.add("enemyCell");
            }
            else {
                $tr.classList.add("myCell");
            }
        $table.appendChild($tr); //append the row to our table
        $table.id = "table";
        for(var j=0; j<size; j++) {
            var color;
            if(i < this.halfpoint) {
                color = "Red";
            } else {
                color = "Blue";
            }
            var newObj={locationY: i, locationX: j, trap: {name: null, type:null, active:false}, gold: {type:null, active: false}, hasPlayer: false, playerType: null, playerTeam:null, playerNickName: null, cellColor: color}; //create a new key/dictionary value for each cell/tile in our table into our grid obj, which will keep track of what exists in each cell
            var pos = "(" + j + "," + i + ")"; //gives us our position for these cells as a coordinate
            this.grid[pos] = newObj; //in our grid object, we'll have another object within it named the location such as grid { (0,1): {locationX: 0, locationY:0 .... } (0,2) : ... }
            var $td = document.createElement('td'); //create our cell element
            $td.id = pos; //set the cell id to the position, i.e (0,0) being the first cell
            $tr.appendChild($td); //append cell to table row
        }
    }
   $gameDiv.appendChild($table); //Append our table to our gamediv
    }

    this.resetGrid = function() {
        for(var i = 0; i < this.size; i++) {
            for(var j = 0; j < this.size; j++) {
                if(document.getElementById("(" + j + "," + i + ")").classList.contains("hasMine")) {
                    document.getElementById("(" + j + "," + i + ")").classList.toggle("hasMine");
                }

                if(document.getElementById("(" + j + "," + i + ")").classList.contains("hasGold")) {
                    document.getElementById("(" + j + "," + i + ")").classList.toggle("hasGold");
                }
            }
        }
    }
}