var underlingInitialSelect = function(clickedTile) {
     
     if(isInit){
     if(isInit){
     var teamcolor; //for our color
     var color = gameGrid.grid[clickedTile].cellColor;
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined) {
        var colorbound1 = color;
     } else {
        var colorbound1 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
        }

    if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined) {
        var colorbound2 = color;
     } else {
        var colorbound2 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }

     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined) {
        var colorbound3 = color;
     } else { 
        var colorbound3 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
    }

    if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined) {
        var colorbound4 = color;
     } else {
        var colorbound4 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     
     } else { var color = null;  var colorbound1 = null; var colorbound2 = null; var colorbound3 = null; var colorbound4 = null;}

     var fish = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")");
     if((fish) && (color == colorbound1 && color == myPlayer)){
     fish.classList.toggle("validU");
     currentValidMoveLocations[currentNumOfValid] = fish.id;
     currentNumOfValid++;
     }
     fish = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")");
     if((fish) && (colorbound2 == color && color == myPlayer)){
     fish.classList.toggle("validU");
     currentValidMoveLocations[currentNumOfValid] = fish.id;
     currentNumOfValid++;
     }
    fish = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")");
    if((fish) && (colorbound3 == color && color == myPlayer)){
    fish.classList.toggle("validU");
    currentValidMoveLocations[currentNumOfValid] = fish.id;
    currentNumOfValid++;
    }  
    fish = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")");
    if((fish) && (colorbound4 == color && color == myPlayer)){
    fish.classList.toggle("validU");
    currentValidMoveLocations[currentNumOfValid] = fish.id;
    currentNumOfValid++;
    }  
}
    else {
        var fish = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")");
     if(fish){
     fish.classList.toggle("validU");
     currentValidMoveLocations[currentNumOfValid] = fish.id;
     currentNumOfValid++;
     }
     fish = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")");
     if(fish){
     fish.classList.toggle("validU");
     currentValidMoveLocations[currentNumOfValid] = fish.id;
     currentNumOfValid++;
     }
    fish = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")");
    if(fish){
    fish.classList.toggle("validU");
    currentValidMoveLocations[currentNumOfValid] = fish.id;
    currentNumOfValid++;
    }  
    fish = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")");
    if(fish){
    fish.classList.toggle("validU");
    currentValidMoveLocations[currentNumOfValid] = fish.id;
    currentNumOfValid++;
    }        
    }
     
}
var underlingDeselect = function(clickedTile) {
    if(isInit){
    if(isInit){
     var teamcolor; //for our color
     var color = gameGrid.grid[clickedTile].cellColor;
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined) {
        var colorbound1 = color;
     } else {
        var colorbound1 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
        }

    if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined) {
        var colorbound2 = color;
     } else {
        var colorbound2 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }

     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined) {
        var colorbound3 = color;
     } else { 
        var colorbound3 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
    }

    if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined) {
        var colorbound4 = color;
     } else {
        var colorbound4 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     
     } else { var color = null;  var colorbound1 = null; var colorbound2 = null; var colorbound3 = null; var colorbound4 = null;}

    var fish = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")");
    if((fish) && (color == colorbound1 && color == myPlayer)){
    fish.classList.toggle("validU");
    }
    fish = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")");
    if((fish) && (color == colorbound2 && color == myPlayer)){
    fish.classList.toggle("validU");
    }
    fish = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")");
    if((fish) && (color == colorbound3 && color == myPlayer)){
    fish.classList.toggle("validU");
    }  
    fish = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")");
    if((fish) && (color == colorbound4 && color == myPlayer)){
    fish.classList.toggle("validU");
    }   }

    else {
         var fish = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")");
    if(fish){
    fish.classList.toggle("validU");
    }
    fish = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")");
    if(fish){
    fish.classList.toggle("validU");
    }
    fish = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")");
    if(fish){
    fish.classList.toggle("validU");
    }  
    fish = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")");
    if(fish){
    fish.classList.toggle("validU");
    }        
     
    }    
     
     }

var hunterInitialSelect = function(clickedTile) {
    if(isInit) {
    if(isInit){
     var teamcolor; //for our color
     var color = gameGrid.grid[clickedTile].cellColor;
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined){colorbound1 = color} else {
     var colorbound1 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 2)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined){colorbound2 = color} else {
     var colorbound2 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 2)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined){colorbound3 = color} else {
     var colorbound3 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound4 = color} else {
     var colorbound4 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound5 = color} else {
     var colorbound5 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound6 = color} else {
     var colorbound6 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound7 = color} else {
     var colorbound7 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 2)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined){colorbound8 = color} else {
     var colorbound8 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 2)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }
     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound9 = color} else {
     var colorbound9 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+2)+")"] == undefined){colorbound10 = color} else {
     var colorbound10 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+2)+")"].cellColor;
     }
     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound11 = color} else {
     var colorbound11 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-2)+")"] == undefined){colorbound12 = color} else {
     var colorbound12 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-2)+")"].cellColor;
        }

     } else { var color = null;  var colorbound1 = null; var colorbound2 = null; var colorbound3 = null; var colorbound4 = null; var colorbound5 = null; var colorbound6 = null; var colorbound7 = null; var colorbound8 = null; var colorbound9 = null; var colorbound10 = null; var colorbound11 = null; var colorbound12 = null;}

    var cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")");
            if(cat && colorbound1 == color && color == myPlayer){ //1
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            if(cat && (gameGrid.grid[cat.id].hasPlayer == false) && colorbound1 == color && color == myPlayer){
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 2)+","+gameGrid.grid[clickedTile].locationY+")");
            if(cat && colorbound2 == color && color == myPlayer){ //2
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")");
            if(cat && colorbound3 == color && color == myPlayer){ //3
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            if(cat && (gameGrid.grid[cat.id].hasPlayer == false) && colorbound1 == color && color == myPlayer){
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 2)+","+gameGrid.grid[clickedTile].locationY+")");
            if(cat && colorbound8 == color && color == myPlayer){//8
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(cat && colorbound4 == color && color == myPlayer){ //4
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(cat && colorbound5 == color && color == myPlayer){ //5
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(cat && colorbound6 == color && color == myPlayer){ //6
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(cat && colorbound7 == color && color == myPlayer){//7
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(cat && colorbound9 == color && color == myPlayer){//9
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            if(cat && (gameGrid.grid[cat.id].hasPlayer == false) && colorbound1 == color && color == myPlayer){
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+2)+")");
            if(cat && colorbound10 == color && color == myPlayer){//10
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(cat && colorbound11 == color && color == myPlayer){//11
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            if(cat && (gameGrid.grid[cat.id].hasPlayer == false) && colorbound1 == color && color == myPlayer){
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-2)+")");
            if(cat && colorbound12 == color && color == myPlayer){//12
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            } 
            }
}
            else {
            var cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")");  //right tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            if(cat && (gameGrid.grid[cat.id].hasPlayer == false)){
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 2)+","+gameGrid.grid[clickedTile].locationY+")"); //2 right tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"); //left tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            if (cat && (gameGrid.grid[cat.id].hasPlayer == false)){
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 2)+","+gameGrid.grid[clickedTile].locationY+")"); // 2 left tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"); //diagonal up left tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"); //diagonal up right tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"); //diagonal down left tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"); //diagonal down right tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"); //up tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            if(cat && (gameGrid.grid[cat.id].hasPlayer == false)){
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+2)+")"); //2 up tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"); //down tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            if(cat && (gameGrid.grid[cat.id].hasPlayer == false)){
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-2)+")"); //2 down tile
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            }
            }
            
        }
var thiefInitialSelect = function(clickedTile) {
for(var i=1; i<gameGrid.size; i++){

    if(isInit){
    if(isInit){
     var teamcolor; //for our color
     var color = gameGrid.grid[clickedTile].cellColor;
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")"] == undefined){colorbound1 = color} else {
     var colorbound1 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")"] == undefined){colorbound2 = color} else {
     var colorbound2 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")"] == undefined){colorbound3 = color} else {
     var colorbound3 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")"] == undefined){colorbound4 = color} else {
     var colorbound4 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound5 = color} else {
     var colorbound5 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound6 = color} else {
     var colorbound6 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound7 = color} else {
     var colorbound7 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound8 = color} else {
     var colorbound8 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
} else { var color = null;  var colorbound1 = null; var colorbound2 = null; var colorbound3 = null; var colorbound4 = null; var colorbound5 = null; var colorbound6 = null; var colorbound7 = null; var colorbound8 = null;}


            var dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")");
            if(dog && color == colorbound1 && color == myPlayer){ //1
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")");
            if(dog && color == colorbound2 && color == myPlayer){ //2
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            } 
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")");
            if(dog && color == colorbound3 && color == myPlayer){ //3
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")");
            if(dog && color == colorbound4 && color == myPlayer){ //4
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(dog && color == colorbound5 && color == myPlayer){ //5
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(dog && color == colorbound6 && color == myPlayer){ //6
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(dog && color == colorbound7 && color == myPlayer){ //7
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(dog && color == colorbound8 && color == myPlayer){ //8
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            }
        }

            if(isInit == false) {
                for(var i=1; i<gameGrid.size; i++){
            var dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            } 
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            }
            }
    
}
var hunterDeselect = function(clickedTile){
    if(isInit){
    if(isInit){
     var teamcolor; //for our color
     var color = gameGrid.grid[clickedTile].cellColor;
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined){colorbound1 = color} else {
     var colorbound1 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 2)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined){colorbound2 = color} else {
     var colorbound2 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 2)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined){colorbound3 = color} else {
     var colorbound3 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound4 = color} else {
     var colorbound4 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound5 = color} else {
     var colorbound5 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound6 = color} else {
     var colorbound6 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound7 = color} else {
     var colorbound7 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 2)+","+gameGrid.grid[clickedTile].locationY+")"] == undefined){colorbound8 = color} else {
     var colorbound8 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 2)+","+gameGrid.grid[clickedTile].locationY+")"].cellColor;
     }
     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound9 = color} else {
     var colorbound9 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+2)+")"] == undefined){colorbound10 = color} else {
     var colorbound10 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+2)+")"].cellColor;
     }
     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound11 = color} else {
     var colorbound11 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     if(gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-2)+")"] == undefined){colorbound12 = color} else {
     var colorbound12 = gameGrid.grid["("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-2)+")"].cellColor;
        }

     } else { var color = null;  var colorbound1 = null; var colorbound2 = null; var colorbound3 = null; var colorbound4 = null; var colorbound5 = null; var colorbound6 = null; var colorbound7 = null; var colorbound8 = null; var colorbound9 = null; var colorbound10 = null; var colorbound11 = null; var colorbound12 = null;}


    var cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")");
            if(cat && colorbound1 == color && color == myPlayer){ //1
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 2)+","+gameGrid.grid[clickedTile].locationY+")");
            if(cat && (cat.classList.contains("validH")) && colorbound2 == color && color == myPlayer){ //2
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")");
            if(cat && colorbound3 == color && color == myPlayer){ //3
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 2)+","+gameGrid.grid[clickedTile].locationY+")");
            if(cat && (cat.classList.contains("validH")) && colorbound8 == color && color == myPlayer){//8
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(cat && colorbound4 == color && color == myPlayer){ //4
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(cat && colorbound5 == color && color == myPlayer){ //5
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(cat && colorbound6 == color && color == myPlayer){ //6
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(cat && colorbound7 == color && color == myPlayer){//7
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(cat && colorbound9 == color && color == myPlayer){//9
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+2)+")");
            if(cat && (cat.classList.contains("validH")) && colorbound10 == color && color == myPlayer){//10
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(cat && colorbound11 == color && color == myPlayer){//11
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-2)+")");
            if(cat && (cat.classList.contains("validH"))  && colorbound12 == color && color == myPlayer){//12
            cat.classList.toggle("validH");
            } 
}
            else {
            var cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+gameGrid.grid[clickedTile].locationY+")");  //right tile
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 2)+","+gameGrid.grid[clickedTile].locationY+")"); //2 right tile
            if(cat && (cat.classList.contains("validH"))){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+gameGrid.grid[clickedTile].locationY+")"); //left tile
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 2)+","+gameGrid.grid[clickedTile].locationY+")"); // 2 left tile
            if(cat && (cat.classList.contains("validH"))){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"); //diagonal up left tile
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"); //diagonal up right tile
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"); //diagonal down left tile
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"); //diagonal down right tile
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+1)+")"); //up tile
            if(cat){
            cat.classList.toggle("validH");
            }     
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY+2)+")"); //2 up tile
            if(cat && (cat.classList.contains("validH"))){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-1)+")"); //down tile
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+gameGrid.grid[clickedTile].locationX+","+(gameGrid.grid[clickedTile].locationY-2)+")"); //2 down tile
            if(cat && (cat.classList.contains("validH"))){
            cat.classList.toggle("validH");
            }
            }
            
        }

var thiefDeselect = function(clickedTile){
    for(var i=1; i<gameGrid.size; i++){

        if(isInit){
if(isInit){
     var teamcolor; //for our color
     var color = gameGrid.grid[clickedTile].cellColor;
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")"] == undefined){colorbound1 = color} else {
     var colorbound1 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")"] == undefined){colorbound2 = color} else {
     var colorbound2 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")"] == undefined){colorbound3 = color} else {
     var colorbound3 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")"] == undefined){colorbound4 = color} else {
     var colorbound4 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound5 = color} else {
     var colorbound5 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound6 = color} else {
     var colorbound6 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"] == undefined){colorbound7 = color} else {
     var colorbound7 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")"].cellColor;
     }
     if(gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"] == undefined){colorbound8 = color} else {
     var colorbound8 = gameGrid.grid["("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")"].cellColor;
     }
} else { var color = null;  var colorbound1 = null; var colorbound2 = null; var colorbound3 = null; var colorbound4 = null; var colorbound5 = null; var colorbound6 = null; var colorbound7 = null; var colorbound8 = null;}

            var dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")");
            if(dog && color == colorbound1 && color == myPlayer){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")");
            if(dog && color == colorbound2 && color == myPlayer){
            dog.classList.toggle("validT");
            } 
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")");
            if(dog && color == colorbound3 && color == myPlayer){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")");
            if(dog && color == colorbound4 && color == myPlayer){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(dog && color == colorbound5 && color == myPlayer){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(dog && color == colorbound6 && color == myPlayer){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(dog && color == colorbound7 && color == myPlayer){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(dog && color == colorbound8 && color == myPlayer){
            dog.classList.toggle("validT");
            } 
            }
        }
            if(isInit == false){

                for(var i=1; i<gameGrid.size; i++){
            var dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            } 
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + 1)+","+(gameGrid.grid[clickedTile].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX - i - 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(gameGrid.grid[clickedTile].locationX + i + 1)+","+(gameGrid.grid[clickedTile].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            } 
            }
            }
}

var movementLogic = function() {
    //console.log("In Movement logics");
    if(gameGrid.grid[this.id].hasPlayer == true){
        if(isSelected == false && gameGrid.grid[this.id].playerType == "Hunter" && gameGrid.grid[this.id].playerTeam == myPlayer && makingMove==0){ //nothing is selected and you click a hunter
            this.classList.toggle("selectedH");
            hunterInitialSelect(this.id);
            currentSelectedTile = this.id;
            isSelected = true;
            /*
            if(whoseTurn == "Blue"){
                if(trapHunterBlue == 5){
                    toolboxHunterFive();
                    enableHunterToolbox();
                }
                else if(trapHunterBlue == 4){
                    toolboxHunterFour();
                    enableHunterToolbox();
                }
                else if(trapHunterBlue == 3){
                    toolboxHunterThree();
                    enableHunterToolbox();
                }
                else if(trapHunterBlue == 2){
                    toolboxHunterTwo();
                    enableHunterToolbox();
                }
                else if(trapHunterBlue == 1){
                    toolboxHunterOne();
                    enableHunterToolbox();
                }
            }
            else if(whoseTurn == "Red"){
                if(trapHunterRed == 5){
                    toolboxHunterFive();
                    enableHunterToolbox();
                }
                else if(trapHunterRed == 4){
                    toolboxHunterFour();
                    enableHunterToolbox();
                }
                else if(trapHunterRed == 3){
                    toolboxHunterThree();
                    enableHunterToolbox();
                }
                else if(trapHunterRed == 2){
                    toolboxHunterTwo();
                    enableHunterToolbox();
                }
                else if(trapHunterRed == 1){
                    toolboxHunterOne();
                    enableHunterToolbox();
                }
            }
            */
        }
        else if (isSelected == false && gameGrid.grid[this.id].playerType == "Thief" && gameGrid.grid[this.id].playerTeam == myPlayer && makingMove==0){ //nothing is selected and you click a thief
            this.classList.toggle("selectedT");
            thiefInitialSelect(this.id);
            currentSelectedTile = this.id;
            isSelected = true;
        }
        else if (isSelected == false && gameGrid.grid[this.id].playerType == "Pawn" && gameGrid.grid[this.id].playerTeam == myPlayer && makingMove==0){ //nothing is selected and you click a underling
            this.classList.toggle("selectedU");
            underlingInitialSelect(this.id);
            currentSelectedTile = this.id;
            isSelected = true;
        }
        else if(isSelected == true && this.classList.contains("selectedH")){ //hunter is selected, click again to disable
            this.classList.toggle("selectedH");
            hunterDeselect(this.id);
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
            //toolboxWipe();
            //disableHunterToolbox();
        }
        else if(isSelected == true && this.classList.contains("selectedT")){ //thief is selected, click again to disable
            this.classList.toggle("selectedT");
            thiefDeselect(this.id);
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
        }   
        else if(isSelected == true && this.classList.contains("selectedU")){ //underling is selected, click again to disable
            this.classList.toggle("selectedU");
            underlingDeselect(this.id);
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
        }   
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (gameGrid.grid[this.id].playerTeam != gameGrid.grid[currentSelectedTile].playerTeam) && gameGrid.grid[currentSelectedTile].playerType == "Thief"){ //thief making kill
            thiefDeselect(currentSelectedTile);
            console.log(gameGrid.grid[this.id]);
            if(gameGrid.grid[this.id].playerNickName == "RedPawn1") {
                redPawn1.setDead();
                redPawn1.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn2") {
                redPawn2.setDead();
                redPawn2.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn3") {
                redPawn3.setDead();
                redPawn3.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn4") {
                redPawn4.setDead();
                redPawn4.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn5") {
                redPawn5.setDead();
                redPawn5.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn1") {
                bluePawn1.setDead();
                bluePawn1.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn2") {
                bluePawn2.setDead();
                bluePawn2.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn3") {
                bluePawn3.setDead();
                bluePawn3.emitDead(gameGrid.grid);
            }
           if(gameGrid.grid[this.id].playerNickName == "BluePawn4") {
                bluePawn4.setDead();
                bluePawn4.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn5") {
                bluePawn5.setDead();
                bluePawn5.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "BlueThief") {
                blueThief.setDead();
                blueThief.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "RedThief") {
                redThief.setDead();
                redThief.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "RedHunter") {
                redHunter.setDead();
                redHunter.emitDead(gameGrid.grid);
                console.log("just hit the redhunter and am setting him dead");
            }

             if(gameGrid.grid[this.id].playerNickName == "BlueHunter") {
                blueHunter.setDead();
                blueHunter.emitDead(gameGrid.grid);
                console.log("just hit the redhunter and am setting him dead");
            }

            if(gameGrid.grid[this.id].playerNickName == "BlueThiefDecoy") {
                blueThiefDecoy.setDead();
                blueThiefDecoy.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "RedThiefDecoy") {
                redThiefDecoy.setDead();
                redThiefDecoy.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "RedHunterDecoy") {
                redHunterDecoy.setDead();
                redHunterDecoy.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "BlueHunterDecoy") {
                blueHunterDecoy.setDead();
                blueHunterDecoy.emitDead(gameGrid.grid);
            }
            
            document.getElementById(currentSelectedTile).classList.toggle("selectedT");

            if(gameGrid.grid[currentSelectedTile].playerNickName == "BlueHunter") {
                blueHunter.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedHunter") {
                redHunter.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "BlueThief") {
                blueThief.updateLocation(this.id, gameGrid.grid);
            }
            
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedThief") {
                redThief.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn1") {
                redPawn1.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn2") {
                redPawn2.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn3") {
                redPawn3.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn4") {
                redPawn4.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn5") {
                redPawn5.updateLocation(this.id, gameGrid.grid);
            }


            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn1") {
                bluePawn1.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn2") {
                bluePawn2.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn3") {
                bluePawn3.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn4") {
                bluePawn4.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn5") {
                bluePawn5.updateLocation(this.id, gameGrid.grid);
            }
            /*
            document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[this.id].playerTeam+gameGrid.grid[this.id].playerType);
            document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            gameGrid.grid[this.id].hasPlayer = true;
            gameGrid.grid[this.id].playerType = "Thief";
            gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
*/
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false; 
            console.log("Thief killed another player!");
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (gameGrid.grid[this.id].playerTeam != gameGrid.grid[currentSelectedTile].playerTeam) && gameGrid.grid[currentSelectedTile].playerType == "Hunter"){ //hunter making kill
            hunterDeselect(currentSelectedTile);
            console.log(gameGrid.grid[this.id]);
            console.log(gameGrid.grid[currentSelectedTile]);
            if(gameGrid.grid[this.id].playerNickName == "RedPawn1") {
                redPawn1.setDead();
                redPawn1.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn2") {
                redPawn2.setDead();
                redPawn2.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn3") {
                redPawn3.setDead();
                redPawn3.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn4") {
                redPawn4.setDead();
                redPawn4.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn5") {
                redPawn5.setDead();
                redPawn5.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn1") {
                bluePawn1.setDead();
                bluePawn1.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn2") {
                bluePawn2.setDead();
                bluePawn2.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn3") {
                bluePawn3.setDead();
                bluePawn3.emitDead(gameGrid.grid);
            }
           if(gameGrid.grid[this.id].playerNickName == "BluePawn4") {
                bluePawn4.setDead();
                bluePawn4.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn5") {
                bluePawn5.setDead();
                bluePawn5.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "BlueThief") {
                blueThief.setDead();
                blueThief.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "RedThief") {
                redThief.setDead();
                redThief.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "RedHunter") {
                redHunter.setDead();
                redHunter.emitDead(gameGrid.grid);
                console.log("just hit the redhunter and am setting him dead");
            }

             if(gameGrid.grid[this.id].playerNickName == "BlueHunter") {
                blueHunter.setDead();
                blueHunter.emitDead(gameGrid.grid);
                console.log("just hit the redhunter and am setting him dead");
            }

            if(gameGrid.grid[this.id].playerNickName == "BlueThiefDecoy") {
                blueThiefDecoy.setDead();
                blueThiefDecoy.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "RedThiefDecoy") {
                redThiefDecoy.setDead();
                redThiefDecoy.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "RedHunterDecoy") {
                redHunterDecoy.setDead();
                redHunterDecoy.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "BlueHunterDecoy") {
                blueHunterDecoy.setDead();
                blueHunterDecoy.emitDead(gameGrid.grid);
            }
            
            document.getElementById(currentSelectedTile).classList.toggle("selectedH");

            if(gameGrid.grid[currentSelectedTile].playerNickName == "BlueHunter") {
                blueHunter.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedHunter") {
                redHunter.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "BlueThief") {
                blueThief.updateLocation(this.id, gameGrid.grid);
            }
            
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedThief") {
                redThief.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn1") {
                redPawn1.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn2") {
                redPawn2.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn3") {
                redPawn3.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn4") {
                redPawn4.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn5") {
                redPawn5.updateLocation(this.id, gameGrid.grid);
            }


            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn1") {
                bluePawn1.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn2") {
                bluePawn2.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn3") {
                bluePawn3.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn4") {
                bluePawn4.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn5") {
                bluePawn5.updateLocation(this.id, gameGrid.grid);
            }



            //document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            //document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[this.id].playerTeam+gameGrid.grid[this.id].playerType);
            //document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            //gameGrid.grid[this.id].hasPlayer = true;
            //gameGrid.grid[this.id].playerType = "Hunter";
            //gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
            //gameGrid.grid[this.id].playerNickName = gameGrid.grid[currentSelectedTile].playerNickName;
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;

            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false; 
            //toolboxWipe();
            //disableHunterToolbox();
            console.log("Hunter killed another player!");
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (gameGrid.grid[this.id].playerTeam != gameGrid.grid[currentSelectedTile].playerTeam) && gameGrid.grid[currentSelectedTile].playerType == "Pawn"){ //underling making kill
            underlingDeselect(currentSelectedTile);
if(gameGrid.grid[this.id].playerNickName == "RedPawn1") {
                redPawn1.setDead();
                redPawn1.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn2") {
                redPawn2.setDead();
                redPawn2.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn3") {
                redPawn3.setDead();
                redPawn3.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn4") {
                redPawn4.setDead();
                redPawn4.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "RedPawn5") {
                redPawn5.setDead();
                redPawn5.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn1") {
                bluePawn1.setDead();
                bluePawn1.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn2") {
                bluePawn2.setDead();
                bluePawn2.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn3") {
                bluePawn3.setDead();
                bluePawn3.emitDead(gameGrid.grid);
            }
           if(gameGrid.grid[this.id].playerNickName == "BluePawn4") {
                bluePawn4.setDead();
                bluePawn4.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[this.id].playerNickName == "BluePawn5") {
                bluePawn5.setDead();
                bluePawn5.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "BlueThief") {
                blueThief.setDead();
                blueThief.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "RedThief") {
                redThief.setDead();
                redThief.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "RedHunter") {
                redHunter.setDead();
                redHunter.emitDead(gameGrid.grid);
                console.log("just hit the redhunter and am setting him dead");
            }

             if(gameGrid.grid[this.id].playerNickName == "BlueHunter") {
                blueHunter.setDead();
                blueHunter.emitDead(gameGrid.grid);
                console.log("just hit the redhunter and am setting him dead");
            }

            if(gameGrid.grid[this.id].playerNickName == "BlueThiefDecoy") {
                blueThiefDecoy.setDead();
                blueThiefDecoy.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].playerNickName == "RedThiefDecoy") {
                redThiefDecoy.setDead();
                redThiefDecoy.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "RedHunterDecoy") {
                redHunterDecoy.setDead();
                redHunterDecoy.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].playerNickName == "BlueHunterDecoy") {
                blueHunterDecoy.setDead();
                blueHunterDecoy.emitDead(gameGrid.grid);
            }
            
            document.getElementById(currentSelectedTile).classList.toggle("selectedU");

            if(gameGrid.grid[currentSelectedTile].playerNickName == "BlueHunter") {
                blueHunter.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedHunter") {
                redHunter.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "BlueThief") {
                blueThief.updateLocation(this.id, gameGrid.grid);
            }
            
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedThief") {
                redThief.updateLocation(this.id, gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn1") {
                redPawn1.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn2") {
                redPawn2.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn3") {
                redPawn3.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn4") {
                redPawn4.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn5") {
                redPawn5.updateLocation(this.id, gameGrid.grid);
            }


            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn1") {
                bluePawn1.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn2") {
                bluePawn2.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn3") {
                bluePawn3.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn4") {
                bluePawn4.updateLocation(this.id, gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn5") {
                bluePawn5.updateLocation(this.id, gameGrid.grid);
            }
            //document.getElementById(currentSelectedTile).classList.toggle("selectedU");
            /*
            document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[this.id].playerTeam+gameGrid.grid[this.id].playerType);
            document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            gameGrid.grid[this.id].hasPlayer = true;
            gameGrid.grid[this.id].playerType = "Pawn";
            gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
            */
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false; 
            console.log("Underling killed another player!");
        }
          
        }
    if(gameGrid.grid[this.id].hasPlayer == false){ //making moves and mine interaction
     
        if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (gameGrid.grid[this.id].playerTeam != gameGrid.grid[currentSelectedTile].playerTeam) && gameGrid.grid[this.id].gold.active == true && gameGrid.grid[currentSelectedTile].playerType == "Thief"){ //thief finding enemy gold
            thiefDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedT");
            document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            this.classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            this.classList.toggle("hasGoldInvis");
            gameGrid.grid[this.id].gold = false;
            gameGrid.grid[this.id].hasPlayer = true;
            gameGrid.grid[this.id].playerType = gameGrid.grid[currentSelectedTile].playerType;
            gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false;
            hasWon = true;
            alert("Thief found the gold, you win!");
            socket.emit('haswon', clientNickName);
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (gameGrid.grid[this.id].playerTeam != gameGrid.grid[currentSelectedTile].playerTeam) && gameGrid.grid[this.id].gold.active == true && gameGrid.grid[currentSelectedTile].playerType == "Hunter"){ //hunter finding enemy gold
            hunterDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedH");
            document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);      
            this.classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            this.classList.toggle("hasGoldInvis");
            gameGrid.grid[this.id].gold = false;
            gameGrid.grid[this.id].hasPlayer = true;
            gameGrid.grid[this.id].playerType = gameGrid.grid[currentSelectedTile].playerType;
            gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false; 
            disableHunterToolbox();
            hasWon = true;
            alert("Hunter found the gold, you win!");
            socket.emit('haswon', clientNickName);
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (gameGrid.grid[this.id].playerTeam != gameGrid.grid[currentSelectedTile].playerTeam) && gameGrid.grid[this.id].gold.active == true && gameGrid.grid[currentSelectedTile].playerType == "Pawn"){ //underling finding enemy gold
            underlingDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedU");
            document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);         
            this.classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            this.classList.toggle("hasGoldInvis");
            gameGrid.grid[this.id].gold = false;
            gameGrid.grid[this.id].hasPlayer = true;
            gameGrid.grid[this.id].playerType = gameGrid.grid[currentSelectedTile].playerType;
            gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false;
            hasWon = true;
            alert("Underling found the gold, you win!");
            socket.emit('haswon', clientNickName);
        } 
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (myPlayer != gameGrid.grid[this.id].trap.type) && gameGrid.grid[this.id].trap.active == true && gameGrid.grid[currentSelectedTile].playerType == "Thief"){ //thief hitting enemy mine
            thiefDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedT");
            //document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BlueThief") {
                blueThief.setDead();
                blueThief.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedThief") {
                redThief.setDead();
                redThief.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine1") {
                blueMine1.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine2") {
                blueMine2.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine3") {
                blueMine3.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine4") {
                blueMine4.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine5") {
                blueMine5.defuse(gameGrid.grid);
            }



            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine1") {
                redMine1.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine2") {
                redMine2.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine3") {
                redMine3.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine4") {
                redMine4.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine5") {
                redMine5.defuse(gameGrid.grid);
            }
            
            gameGrid.grid[this.id].trap = false;
            gameGrid.grid[this.id].hasPlayer = false;
            gameGrid.grid[this.id].playerType = "null";
            gameGrid.grid[this.id].playerTeam = "null";
            
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false; 
            alert("Thief hit a mine and died!");
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (myPlayer != gameGrid.grid[this.id].trap.type) && gameGrid.grid[this.id].trap.active == true && gameGrid.grid[currentSelectedTile].playerType == "Hunter"){ //hunter hitting enemy mine
            hunterDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedH");
            //document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedHunter") {
                redHunter.setDead();
                redHunter.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[currentSelectedTile].playerNickName == "BlueHunter") {
                blueHunter.setDead();
                blueHunter.emitDead(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine1") {
                blueMine1.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine2") {
                blueMine2.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine3") {
                blueMine3.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine4") {
                blueMine4.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine5") {
                blueMine5.defuse(gameGrid.grid);
            }



            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine1") {
                redMine1.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine2") {
                redMine2.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine3") {
                redMine3.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine4") {
                redMine4.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine5") {
                redMine5.defuse(gameGrid.grid);
            }

            
            gameGrid.grid[this.id].trap = false;
            gameGrid.grid[this.id].hasPlayer = false;
            gameGrid.grid[this.id].playerType = "null";
            gameGrid.grid[this.id].playerTeam = "null";
            
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false; 
            //disableHunterToolbox(); //hunter dies with your mines thats rough m8
            alert("Hunter hit a mine!");
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (myPlayer != gameGrid.grid[this.id].trap.type) && gameGrid.grid[this.id].trap.active == true && gameGrid.grid[currentSelectedTile].playerType == "Pawn"){ //underling hitting enemy mine
            underlingDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedU");
            //document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn1") {
                redPawn1.setDead();
                redPawn1.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn2") {
                redPawn2.setDead();
                redPawn2.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn3") {
                redPawn3.setDead();
                redPawn3.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn4") {
                redPawn4.setDead();
                redPawn4.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "RedPawn5") {
                redPawn5.setDead();
                redPawn5.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn1") {
                bluePawn1.setDead();
                bluePawn1.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn2") {
                bluePawn2.setDead();
                bluePawn2.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn3") {
                bluePawn3.setDead();
                bluePawn3.emitDead(gameGrid.grid);
            }
           if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn4") {
                bluePawn4.setDead();
                bluePawn4.emitDead(gameGrid.grid);
            }
            if(gameGrid.grid[currentSelectedTile].playerNickName == "BluePawn5") {
                bluePawn5.setDead();
                bluePawn5.emitDead(gameGrid.grid);
            }

             if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine1") {
                blueMine1.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine2") {
                blueMine2.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine3") {
                blueMine3.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine4") {
                blueMine4.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "BlueMine5") {
                blueMine5.defuse(gameGrid.grid);
            }



            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine1") {
                redMine1.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine2") {
                redMine2.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine3") {
                redMine3.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine4") {
                redMine4.defuse(gameGrid.grid);
            }

            if(gameGrid.grid[this.id].trap.type != myPlayer && gameGrid.grid[this.id].trap.name == "RedMine5") {
                redMine5.defuse(gameGrid.grid);
            }
            
            gameGrid.grid[this.id].trap = false;
            gameGrid.grid[this.id].hasPlayer = false;
            gameGrid.grid[this.id].playerType = "null";
            gameGrid.grid[this.id].playerTeam = "null";
            
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false; 
            alert("Underling hit a mine!");
        }    
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && gameGrid.grid[currentSelectedTile].playerType == "Thief"){ //thief making valid move
            gameGrid.grid[this.id].hasPlayer = true;
            gameGrid.grid[this.id].playerType = "Thief";
            gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            console.log(gameGrid.grid[currentSelectedTile]);
            
            if(gameGrid.grid[currentSelectedTile].playerTeam == "Red"){
                redThief.updateLocation(this.id, gameGrid.grid); 
                console.log(redThief.location);
            }
            
            if(gameGrid.grid[currentSelectedTile].playerTeam == "Blue"){
                blueThief.updateLocation(this.id, gameGrid.grid); 
                console.log(blueThief.location);
            }

            
            thiefDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedT");
            document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false;
            }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && gameGrid.grid[currentSelectedTile].playerType == "Hunter"){ //hunter making valid move
            gameGrid.grid[this.id].hasPlayer = true;
            gameGrid.grid[this.id].playerType = "Hunter";
            gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
            
            if(gameGrid.grid[currentSelectedTile].playerTeam == "Red"){
                redHunter.updateLocation(this.id, gameGrid.grid); 
                console.log(redHunter.location);
            }
            
            if(gameGrid.grid[currentSelectedTile].playerTeam == "Blue"){
                blueHunter.updateLocation(this.id, gameGrid.grid); 
                console.log(blueHunter.location);
            }
            hunterDeselect(currentSelectedTile);
    
            document.getElementById(currentSelectedTile).classList.toggle("selectedH");
            document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            currentValidMoveLocations = [];
            if(isInit == false){
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false;
            //toolboxWipe();
            //disableHunterToolbox();
        }  
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && gameGrid.grid[currentSelectedTile].playerType == "Pawn"){ //underling making valid move
            gameGrid.grid[this.id].hasPlayer = true;
            gameGrid.grid[this.id].playerType = "Pawn";
            gameGrid.grid[this.id].playerTeam = gameGrid.grid[currentSelectedTile].playerTeam;
            gameGrid.grid[this.id].playerNickName = gameGrid.grid[currentSelectedTile].playerNickName;
            underlingDeselect(currentSelectedTile);

            if(gameGrid.grid[this.id].playerNickName =="RedPawn1") {
                redPawn1.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(redPawn1.location);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="RedPawn2") {
                redPawn2.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(redPawn2.location);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="RedPawn3") {
                redPawn3.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(redPawn3.location);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="RedPawn4") {
                redPawn4.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(redPawn3.location);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="RedPawn5") {
                redPawn5.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(redPawn5.location);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="BluePawn1") {
                bluePawn1.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(bluePawn1.location);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="BluePawn2") {
                bluePawn2.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(bluePawn2.location);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="BluePawn3") {
                bluePawn3.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(bluePawn3.location);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="BluePawn4") {
                bluePawn4.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(bluePawn4.location);
                console.log(this.id);
            }
            
             if(gameGrid.grid[this.id].playerNickName =="BluePawn5") {
                bluePawn5.updateLocation(this.id, gameGrid.grid);
                console.log(gameGrid.grid[this.id]);
                console.log(this.id);
                console.log(bluePawn5.location);
            }
        

            document.getElementById(currentSelectedTile).classList.toggle("selectedU");
            document.getElementById(currentSelectedTile).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+gameGrid.grid[currentSelectedTile].playerTeam+gameGrid.grid[currentSelectedTile].playerType);
            gameGrid.grid[currentSelectedTile].hasPlayer = false;
            gameGrid.grid[currentSelectedTile].playerTeam = null;
            gameGrid.grid[currentSelectedTile].playerType = null;
            gameGrid.grid[currentSelectedTile].playerNickName = null;
            currentValidMoveLocations = [];
            if(isInit == false ){
                console.log("pawn move: " + currentNumOfValid)
             makingMove = makingMove + 1;
            }
            currentSelectedTile = null;
            isSelected = false;
        }
        } 
};

var allowDrop = function(ev) {
    ev.preventDefault();
}

var drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

var placeMineInGrid = function(ev) {
    ev.preventDefault();
    /*if(isTrapPlaced == true){
        console.log("In place mine!, trap is true!");
        gameGrid.grid[lastTrap].trap.active = false;
        gameGrid.grid[lastTrap].playerTeam = "null";
        gameGrid.grid[ev.target.id].trap.active = true;
        gameGrid.grid[ev.target.id].playerTeam = whoseTurn; 
        console.log("placing mine here...");
        console.log(ev.target.id);
        lastTrap = ev.target.id;
        console.log(lastTrap);
        //redgold.location = lastTrap;
        //bluegold.location = lastTrap;
        data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
    else{*/
    //console.log("In this place else");
    
    var data = ev.dataTransfer.getData("text");
    console.log(ev.target.id);
    //console.log(data);
    //console.log(ev.target.id);
    if(isInit == true && data == 'gold') {

        console.log("in first shit");
        if(ev.target.id != "mine1" && ev.target.id != "mine2" && ev.target.id != "mine3" && ev.target.id != "mine4" && ev.target.id != "mine5"){
            console.log("in second shit");
            if(ev.target.id=="toolbox"){
            console.log(lastTrap);
            console.log(gameGrid.grid[lastTrap].gold.active);
            }  
            else if(gameGrid.grid[ev.target.id].hasPlayer == false && gameGrid.grid[ev.target.id].gold.active == false && gameGrid.grid[ev.target.id].cellColor == myPlayer && gameGrid.grid[ev.target.id].trap.active == false){
                 lastTrap = ev.target.id;
                ev.target.appendChild(document.getElementById(data));
                gameGrid.grid[ev.target.id].gold.active = true;
                if(data == "gold" && myPlayer == "Red") {
                    redGold.updateLocation(ev.target.id, gameGrid.grid);
                    goldPlaced = true;
                    //console.log(redGold.location);
                }

                if(data == "gold" && myPlayer == "Blue") {
                    blueGold.updateLocation(ev.target.id, gameGrid.grid);
                    goldPlaced = true;
                    //console.log(blueGold.location);
                }
            }
        }

    }
    if(isInit != true && makingMove == 0){
    if(ev.target.id == 'toolbox') {
        //gameGrid.grid[lastTrap].trap.active = false;
        //gameGrid.grid[lastTrap].playerTeam = "null";
        //gameGrid.grid[ev.target.id].trap.active = true;
        //isTrapPlaced = false;
    }
    else if(ev.target.id != "mine1" && ev.target.id != "mine2" && ev.target.id != "mine3" && ev.target.id != "mine4" && ev.target.id != "mine5" && isInit == false){
        if(gameGrid.grid[ev.target.id].hasPlayer == false && gameGrid.grid[ev.target.id].gold.active == false && gameGrid.grid[ev.target.id].cellColor == myPlayer && gameGrid.grid[ev.target.id].trap.active == false) {
    //console.log(gameGrid.grid[ev.target.id]);
    ev.target.appendChild(document.getElementById(data));
    lastTrap = ev.target.id;
    gameGrid.grid[ev.target.id].trap.active = true;
    gameGrid.grid[ev.target.id].playerTeam = whoseTurn;
    isTrapPlaced = true;
    //console.log(isTrapPlaced);
    if(data == "mine1" && (myPlayer == "Red" || myPlayer == "All")) {
        redMine1.updateLocation(ev.target.id, gameGrid.grid);
        redMine1.isActive = true;
        draggedMines[5 - redTrapNumber] = ev.target.id;
        redTrapNumber = redTrapNumber - 1;
        console.log(redMine1.location);
        makingMove = makingMove + 1;
    }

    if(data == "mine2" && (myPlayer == "Red" || myPlayer == "All")) {
        redMine2.updateLocation(ev.target.id, gameGrid.grid);
        redMine2.isActive = true;
        draggedMines[5 - redTrapNumber] = ev.target.id;
        redTrapNumber = redTrapNumber - 1;
        console.log(redMine2.location);
        makingMove = makingMove + 1;
    }

    if(data == "mine3" && (myPlayer == "Red" || myPlayer == "All")) {
        redMine3.updateLocation(ev.target.id, gameGrid.grid);
        redMine3.isActive = true;
        draggedMines[5 - redTrapNumber] = ev.target.id;
        redTrapNumber = redTrapNumber - 1;
        console.log(redMine3.location);
        makingMove = makingMove + 1;
    }

    if(data == "mine4" && (myPlayer == "Red" || myPlayer == "All")) {
        redMine4.updateLocation(ev.target.id, gameGrid.grid);
        redMine4.isActive = true;
        draggedMines[5 - redTrapNumber] = ev.target.id;
        redTrapNumber = redTrapNumber - 1;
        console.log(redMine4.location);
    }
    //some comment
    if(data == "mine5" && (myPlayer == "Red" || myPlayer == "All")) {
        redMine5.updateLocation(ev.target.id, gameGrid.grid);
        redMine5.isActive = true;
        draggedMines[5 - redTrapNumber] = ev.target.id;
        redTrapNumber = redTrapNumber - 1;
        console.log(redMine5.location);
        makingMove = makingMove + 1;
    }

    if(data == "mine1" && (myPlayer == "Blue" || myPlayer == "All")) {
        blueMine1.updateLocation(ev.target.id, gameGrid.grid);
        blueMine1.isActive = true;
        draggedMines[5 - blueTrapNumber] = ev.target.id;
        blueTrapNumber = blueTrapNumber - 1;
        console.log(blueMine1.location);
        makingMove = makingMove + 1;
    }

    if(data == "mine2" && (myPlayer == "Blue" || myPlayer == "All")) {
        blueMine2.updateLocation(ev.target.id, gameGrid.grid);
        blueMine2.isActive = true;
        draggedMines[5 - blueTrapNumber] = ev.target.id;
        blueTrapNumber = blueTrapNumber - 1;
        console.log(blueMine2.location);
        makingMove = makingMove + 1;
    }

    if(data == "mine3" && (myPlayer == "Blue" || myPlayer == "All")) {
        blueMine3.updateLocation(ev.target.id, gameGrid.grid);
        blueMine3.isActive = true;
        draggedMines[5 - blueTrapNumber] = ev.target.id;
        blueTrapNumber = blueTrapNumber - 1;
        console.log(blueMine3.location);
        makingMove = makingMove + 1;
    }

    if(data == "mine4" && (myPlayer == "Blue" || myPlayer == "All")) {
        blueMine4.updateLocation(ev.target.id, gameGrid.grid);
        blueMine4.isActive = true;
        draggedMines[5 - blueTrapNumber] = ev.target.id;
        blueTrapNumber = blueTrapNumber - 1;
        console.log(blueMine4.location);
        makingMove = makingMove + 1;
    }

    if(data == "mine5" && (myPlayer == "Blue" || myPlayer == "All")) {
        blueMine5.updateLocation(ev.target.id, gameGrid.grid);
        blueMine5.isActive = true;
        draggedMines[5 - blueTrapNumber] = ev.target.id;
        blueTrapNumber = blueTrapNumber - 1;
        console.log(blueMine5.location);
        makingMove = makingMove + 1;
    }
    if(document.getElementById('mine1') !=null){
        document.getElementById("mine1").setAttribute("draggable", "false");
        }
        if(document.getElementById('mine2') !=null){
        document.getElementById("mine2").setAttribute("draggable", "false");
        }
        if(document.getElementById("mine3")!=null){
        document.getElementById("mine3").setAttribute("draggable", "false");
        }

        if(document.getElementById("mine4")!=null){
        document.getElementById("mine4").setAttribute("draggable", "false");
        }
        if(document.getElementById("mine5")!=null){
        document.getElementById("mine5").setAttribute("draggable", "false");
        }
    document.getElementById(data).setAttribute("draggable", "true");
    }  
}else {
        alert("Cannot place mine there");
    }

}

    
}

var toolboxHunterOne = function(){
    document.getElementById('mine1').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
}
var toolboxHunterTwo = function(){
    document.getElementById('mine1').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine2').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
}
var toolboxHunterThree = function(){
    document.getElementById('mine1').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine2').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine3').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
}
var toolboxHunterFour = function(){
    document.getElementById('mine1').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine2').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine3').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine4').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
}
var toolboxHunterFive = function(){
    document.getElementById('mine1').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine2').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine3').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine4').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('mine5').src="http://dj9e9nrc3eeux.cloudfront.net/icons/_mines_weeper_xp.png";
    document.getElementById('gold').src="https://cdn0.iconfinder.com/data/icons/48_px_web_icons/48/money_gold.png";
}


var disableHunterToolbox = function(){
            document.getElementById("gameContent").setAttribute("ondrop", "null"); 
            document.getElementById("gameContent").setAttribute("ondragover", "null"); 
            document.getElementById("toolbox").setAttribute("ondrop", "null"); 
            document.getElementById("toolbox").setAttribute("ondragover", "null"); 
            document.getElementById("toolbox").style.visibility = "hidden";
}
var enableHunterToolbox = function(){
            document.getElementById("gameContent").setAttribute("ondrop", "placeMineInGrid(event)"); 
            document.getElementById("gameContent").setAttribute("ondragover", "allowDrop(event)"); 
            document.getElementById("toolbox").setAttribute("ondrop", "placeMineInToolbox(event)"); 
            document.getElementById("toolbox").setAttribute("ondragover", "allowDrop(event)"); 
            document.getElementById("toolbox").style.visibility = "visible";
}

var placeMineInToolbox = function(ev) {
    if(ev.target.id != "mine1" && ev.target.id != "mine2" && ev.target.id != "mine3" && ev.target.id != "mine4" && ev.target.id != "mine5"){
    ev.preventDefault();
    //Sconsole.log(ev);
    console.log("Im using place mine in toolbox");
    if(gameGrid.grid[lastTrap].trap.active==true){
    gameGrid.grid[lastTrap].trap.active = false;
    gameGrid.grid[lastTrap].playerTeam = "null";
    makingMove = 0;
    }
    else if(gameGrid.grid[lastTrap].gold.active==true){
    gameGrid.grid[lastTrap].gold.active = false;
    gameGrid.grid[lastTrap].playerTeam = "null";
    }
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    isTrapPlaced=false;
    lastTrap = null;
    document.getElementById("mine1").setAttribute("draggable", "true");
    document.getElementById("mine2").setAttribute("draggable", "true");
    document.getElementById("mine3").setAttribute("draggable", "true");
    document.getElementById("mine4").setAttribute("draggable", "true");
    document.getElementById("mine5").setAttribute("draggable", "true");
    document.getElementById("gold").setAttribute("draggable", "true");
    }
    }
var toolboxWipe = function(){
    document.getElementById('gold').src="";
    document.getElementById('blueunderling1').src="";
    document.getElementById('blueunderling2').src="";
    document.getElementById('blueunderling3').src="";
    document.getElementById('blueunderling4').src="";
    document.getElementById('blueunderling5').src="";
    document.getElementById('blueunderling6').src="";
    document.getElementById('blueunderling7').src="";
    document.getElementById('blueunderling8').src="";
    document.getElementById('blueunderling9').src="";
    document.getElementById('blueunderling10').src="";
    document.getElementById('redunderling1').src="";
    document.getElementById('redunderling2').src="";
    document.getElementById('redunderling3').src="";
    document.getElementById('redunderling4').src="";
    document.getElementById('redunderling5').src="";
    document.getElementById('redunderling6').src="";
    document.getElementById('redunderling7').src="";
    document.getElementById('redunderling8').src="";
    document.getElementById('redunderling9').src="";
    document.getElementById('redunderling10').src="";
    document.getElementById('redhunter1').src="";
    document.getElementById('redthief1').src=""; 
    document.getElementById('bluehunter1').src="";
    document.getElementById('bluethief1').src="";   
    if(document.getElementById('mine1') != null) {   
    document.getElementById('mine1').src="";
    }
    if(document.getElementById('mine2') != null) {
    document.getElementById('mine2').src="";
    }
    if(document.getElementById('mine3')!= null) {
    document.getElementById('mine3').src="";
    }
    if(document.getElementById('mine4') != null) {
    document.getElementById('mine4').src="";
    }
    if(document.getElementById('mine5') != null) {
    document.getElementById('mine5').src="";
    }
}

var cellClickListeners = function() {
     for(var i =0; i< gameGrid.size; i++) {
        for(var j=0; j<gameGrid.size; j++) {
            var div = document.getElementById("("+ i +","+j+")").addEventListener("click",movementLogic);
}}};

var removeClickListeners = function() {
     for(var i =0; i< gameGrid.size; i++) {
        for(var j=0; j<gameGrid.size; j++) {
            var div = document.getElementById("("+ i +","+j+")").removeEventListener("click",movementLogic);
}}};   


toolboxWipe();
toolboxHunterFive();
enableHunterToolbox();
cellClickListeners();