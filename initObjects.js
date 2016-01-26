//Create Game Grid
var gameGrid = new Grid(10);
gameGrid.createGrid();

var trapHunterBlue = 5;
var trapHunterRed = 5;
var lastTrap = null;
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

//herolist

var herolist = [redThief, redHunter, redThiefDecoy, redHunterDecoy, redPawn1, redPawn2, redPawn3, redPawn4, redPawn5, blueThief, blueHunter, blueThiefDecoy, blueHunterDecoy, bluePawn1, bluePawn2, bluePawn3, bluePawn4, bluePawn5];

var blueplayer = new Player("Blue", "Blue", true);
var redplayer = new Player("Red", "Red", true);

blueplayer.setHeroList = herolist;
redplayer.setHeroList = herolist;


//Initialize red teams locations 
redThief.initLocation(gameGrid.grid);
redHunter.initLocation(gameGrid.grid);
redThiefDecoy.initLocation(gameGrid.grid);
redHunterDecoy.initLocation(gameGrid.grid);
redPawn1.initLocation(gameGrid.grid);
redPawn2.initLocation(gameGrid.grid);
redPawn3.initLocation(gameGrid.grid);
redPawn4.initLocation(gameGrid.grid);
redPawn5.initLocation(gameGrid.grid);
//redGold.initLocation(gameGrid.grid);

//Initialize blue team locations
blueThief.initLocation(gameGrid.grid);
blueHunter.initLocation(gameGrid.grid);
blueThiefDecoy.initLocation(gameGrid.grid);
blueHunterDecoy.initLocation(gameGrid.grid);
bluePawn1.initLocation(gameGrid.grid);
bluePawn2.initLocation(gameGrid.grid);
bluePawn3.initLocation(gameGrid.grid);
bluePawn4.initLocation(gameGrid.grid);
bluePawn5.initLocation(gameGrid.grid);
//blueGold.initLocation(gameGrid.grid);

