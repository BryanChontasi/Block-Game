/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function validation() {
    var name = document.getElementById("contactName").value;
    var surname = document.getElementById("contactSurname").value;
    var email = document.getElementById("mail").value;
    var text = document.getElementById("text1").value;
    

    if (name === "") {
        alert("Insert name")
        return false;
    } else if (surname === "") {
        alert("Insert surname")
        return false;
    }
      else if (email == "") {
        alert("Insert email")
        return false;
    }
      else if (text === "") {
        alert("Insert text")
        return false;
    }
      
    
}



function register() {

    //build object that we are going to store
    var nameusr = document.getElementById("nameusr").value;
    var country = document.getElementById("country").value;
    var username = document.getElementById("username1").value;
    var passwrod1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;

    //build object that we are going to store
    var usernameObject = {};
    usernameObject.name = document.getElementById("username1").value;
    usernameObject.country = document.getElementById("country").value;
    usernameObject.username = document.getElementById("username1").value;
    usernameObject.password = document.getElementById("password1").value;

    
    if (usernameObject.username === "" && usernameObject.password === "") {
        alert("Fill the form");
        
    } else if (username === "") {
        alert("Insert username");

    } else if (passwrod1 === "") {
        alert("Create new password");

    } else if (passwrod1 !== password2) {
        alert("The password doen not match");

    } else {
        //to store data in local storage
        localStorage[usernameObject.username] = JSON.stringify(usernameObject);
        document.getElementById("resultMessage").innerHTML = alert("Registration successful");
    }

}

function checkLogin(){
    if(localStorage.loggedInUsername !== undefined){
        var usernameObject = JSON.parse(localStorage[localStorage.loggedInUsername]);
        
        //say hello to logged in user
        document.getElementById("loginAlert").innerHTML = document.location.href="game.html";      
    }
}
// 
function log_in(){
    //get email address
    var username = document.getElementById("username").value;
    
    //user does not have an account
    if(localStorage[username] === undefined){
        //message to user
        document.getElementById("loginError").innerHTML = "Insert an account or fill the register"; 
        return; // return nothing
    }
    else {//user has an account
        var usernameObject = JSON.parse(localStorage[username]);
        var password = document.getElementById("password").value;
        
        if(password === usernameObject.password){// if successful login send user to the game
            document.getElementById("loginAlert").innerHTML = document.location.href="game.html";
            document.getElementById("loginError").innerHTML = "";//clear any login failure
            localStorage.loggedInUsrEmail = usernameObject.username;//
        }
        else{
            //message to user
            document.getElementById("loginError").innerHTML = "Password not correct. Please try again";
        }
    }
}
//////////////////////////////////////////////////////////////

//JAVASCRIPT FOR THE GAME

//I create the variables that I am going to use
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var sizeInput = document.getElementById("size");
var changeSize = document.getElementById("change-size");
var scoreLabel = document.getElementById("score");

var score = 0;//to store the score
var size = 4;//the default size of the game 
var width = canvas.width / size - 6;//default width

var cells = [];
var fontSize;
var loss = false;

startGame();

changeSize.onclick = function () {
  if (sizeInput.value >= 2 && sizeInput.value <= 7) { // you can choose the size of the grill from 2 to 7
    size = sizeInput.value;
    width = canvas.width / size - 6;
    console.log(sizeInput.value);
    canvasClean();
    startGame();	
  }
}
//functions for the cells of the game
function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function createCells() {
  for (var i = 0; i < size; i++) {//depends of the size chosen
    cells[i] = [];
    for (var j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);

  switch (cell.value){//colors of the cells with its number
     case 0 : ctx.fillStyle = "#A9A9A9"; break;
     case 2 : ctx.fillStyle = "#1E90FF"; break;
     case 4 : ctx.fillStyle = "#FF7F50"; break;
     case 8 : ctx.fillStyle = "#ffbf00"; break;
     case 16 : ctx.fillStyle = "#bfff00"; break;
     case 32 : ctx.fillStyle = "#40ff00"; break;
     case 64 : ctx.fillStyle = "#00008B"; break;
     case 128 : ctx.fillStyle = "#FF7F50"; break;
     case 256 : ctx.fillStyle = "#0040ff"; break;
     case 512 : ctx.fillStyle = "#ff0080"; break;
     case 1024 : ctx.fillStyle = "#D2691E"; break;
     case 2048 : ctx.fillStyle = "#FF7F50"; break;
     case 4096 : ctx.fillStyle = "#ffbf00"; break;
     default : ctx.fillStyle = "#ff0080";
  }

  ctx.fill();

  if (cell.value) {
    fontSize = width/2;
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }
}

function canvasClean() { // to clean the cells
  ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
    //you can play with the arrows or with pressing the letters a,s,d,w on the keyboard
  if (!loss) {
    if (event.keyCode ===38 || event.keyCode === 87) moveUp();
    else if (event.keyCode === 39 || event.keyCode === 68) moveRight();
    else if (event.keyCode === 40 || event.keyCode === 83) moveDown();
    else if (event.keyCode === 37 || event.keyCode === 65) moveLeft();
    scoreLabel.innerHTML = "Score : " + score;
  
  }
}

function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell();
}

function finishGame() {//when you lost the game
  canvas.style.opacity = "0.5";
  loss = true;

}

function drawAllCells() {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function pasteNewCell() {
  var countFree = 0;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if (!countFree){
    finishGame();
    return alert("Game over. Click in Try again"); // this alerts you that game is over
  }


  while (true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if (!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
     }
  }
}
//When you click right arrow
function moveRight () {
  for (var i = 0; i < size; i++) {
    for (var j = size - 2; j >= 0; j--) {
      if (cells[i][j].value) {
        var coll = j;
        while (coll + 1 < size) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          }
          else if (cells[i][coll].value === cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score +=  cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
}
//When you click left arrow
function moveLeft() {
  for (var i = 0; i < size; i++) {
    for (var j = 1; j < size; j++) {
      if (cells[i][j].value) {
        var coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          }
          else if (cells[i][coll].value === cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score +=   cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
}
//When you click up arrow
function moveUp() {
  for (var j = 0; j < size; j++) {
    for (var i = 1; i < size; i++) {
      if (cells[i][j].value) {
        var row = i;
        while (row > 0) {
          if (!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          }
          else if (cells[row][j].value === cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
}
//When you click down arrow
function moveDown() {
  for (var j = 0; j < size; j++) {
    for (var i = size - 2; i >= 0; i--) {
      if (cells[i][j].value) {
        var row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          }
          else if (cells[row][j].value === cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
}

  