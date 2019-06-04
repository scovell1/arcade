let board;
let squares;
let squaresFilled;
let squareSelected;
var gameOver;

class Board {
    constructor() {
        this.squareArray = []
        this.winners = {0:[[0,1,2],[0,3,6],[0,4,8]],1:[[0,1,2],[1,4,7]],2:[[0,1,2],[2,4,6],[2,5,8]],3:[[0,3,6],[3,4,5]],4:[[3,4,5],[0,4,8],[1,4,7],[2,4,6]],5:[[2,5,8],[3,4,5]],
            6:[[0,3,6],[2,4,6],[6,7,8]],7:[[1,4,7],[6,7,8]],8:[[0,4,8],[2,5,8],[6,7,8]]
        };
        this.whoseTurn = 0;
        this.squaresFilled = 0;
        if (opponent == "person"){
            this.players=["O","X"];
        }else{this.players=["person","computer"];}
        for (var i=0; i<9;i++){
            this.squareArray[i]= new Square(i)
        }
    } 
    isEmptysquare() {
         board.squareArray.forEach(x=> this.empty)
    }
    getWhoseTurn(){
        return this.whoseTurn;
    }
    drawBoard(){
        for (var i=0; i<9;i++){
            squares[i].innerHTML = this.squareArray[i].getXorO()
        }
    }
    changeTurns(clone){
        if (typeof(clone)==='undefined') clone = false;
        this.whoseTurn = !this.whoseTurn
        if (!clone){
            this.squaresFilled++;
            if (this.whoseTurn){
                document.querySelector("#infoLine").innerHTML = this.players[1] + " please choose a square"
            }else{ document.querySelector("#infoLine").innerHTML =  this.players[0] + " please choose a square"}
        }
    }
    isWinner(squarePosition){
        for (var winningRow of this.winners[squarePosition]){
            if (this.squareArray[winningRow[0]].XorO == this.squareArray[winningRow[1]].XorO && this.squareArray[winningRow[0]].XorO == this.squareArray[winningRow[2]].XorO){return true
            }
        }return false
    }
    reset1(){
        this.squareArray = [];
        console.log(board)
        var myButtons = document.querySelectorAll(".square");
        for (button of myButtons){
            button.disabled = false;
            button.style.backgroundColor ="#11bbcc"
        }for (var i=0; i<9;i++){
            this.squareArray[i]= new Square(i);
        }
        this.squaresFilled = 0;
        board.drawBoard();
        gameOver = false; 
        if (board.getWhoseTurn() && opponent == "computer"){selectSquare(null)}
    }
    highlight3InaRow(squarePosition){
        for (var winningRow of this.winners[squarePosition]){
            if (this.squareArray[winningRow[0]].XorO == this.squareArray[winningRow[1]].XorO && this.squareArray[winningRow[0]].XorO == this.squareArray[winningRow[2]].XorO){
                squares[winningRow[0]].style.backgroundColor = "#CC9922";
                squares[winningRow[1]].style.backgroundColor = "#CC9922";
                squares[winningRow[2]].style.backgroundColor = "#CC9922";
            }
        }
    }
}
class Square {
    constructor(position){
        this.position = position;
        this.XorO = "";
        this.empty = true;
        this.image = ""
    }
    updateSquare(isClone){
        if (this.empty){
        if (board.getWhoseTurn()){
            this.XorO = "X";
        }
        else{this.XorO = "O"
        }
        if (!isClone){
            this.empty = false;
            board.changeTurns();
            board.drawBoard();
            }
        }else{
            document.querySelector("#infoLine").innerHTML = "This space is occupied. Please pick again."
            }
    }
    getXorO(){
        return this.XorO;
    }
    isEmpty(){
        return this.empty;
    }
    backOutXorO(){
        this.XorO = "";
    }
}
function reset1(){
    board.reset1();
    cloneBoard= null;
    
}
function endGame(){
    myButtons = document.querySelectorAll(".square");
    for (button of myButtons){
        button.disabled = true;
    }
    gameOver = true;
}
function selectSquare(squareSelected){
    if (squareSelected == null && opponent == "computer"){
        if (mode == "beginner"){
        squareSelected = makeMoveBeginner();
        }else if (mode == "intermediate" || mode == "expert"  ){
          squareSelected = makeMoveIntermediate();  
        }
    }
    board.squareArray[squareSelected].updateSquare(false);
    if (board.isWinner(squareSelected)){
        board.highlight3InaRow(squareSelected);
        if (board.getWhoseTurn()){
            document.querySelector("#infoLine").innerHTML = "Congratulations! O wins!"
        }else{
            document.querySelector("#infoLine").innerHTML = "Congratulations! X wins!"
    }endGame()
    }else if (board.squaresFilled >= 9){
        document.querySelector("#infoLine").innerHTML = "It's a tie.";
        endGame();
    }
        console.log(board)
    if (board.getWhoseTurn() && !gameOver && opponent == "computer"){selectSquare(null)}
}
function makeMoveExpert(){
    if ((board.squareArray[0].getXorO() == "O" && board.squareArray[4].getXorO() == "X" && board.squareArray[8].getXorO() == "O" && board.squaresFilled == 3)|| (board.squareArray[2].getXorO == "O" && board.squareArray[4].getXorO() == "X" && board.squareArray[6].getXorO() == "O" && board.squaresFilled == 3))
    {const Noncorners = [1,3,5,7];
    return Noncorners[Math.floor(Math.random() * Noncorners.length)]
    }
    
}
function makeMoveIntermediate(){
    for (var i = 0;i<9;i++){
        if (board.squareArray[i].isEmpty()){
            board.squareArray[i].updateSquare(true);
            if (board.isWinner(i)){
                return i;
            }else {board.squareArray[i].backOutXorO()}
        }
    }board.changeTurns(true)             //if I can't win can I stop opponent
    for (var i = 0;i<9;i++){
        if (board.squareArray[i].isEmpty()){
            board.squareArray[i].updateSquare(true);
            if (board.isWinner(i)){
                board.squareArray[i].backOutXorO()
                board.changeTurns(true);
                return i;
            }else {board.squareArray[i].backOutXorO()}
        }   
    }board.changeTurns(true);
    if (board.squareArray[4].isEmpty()){ //take middle if open
        return 4;
    }else{
        if (mode == "expert"){var expertMove = makeMoveExpert();
            if (expertMove){
                return expertMove;
            }
        }
        const corners = [0,2,6,8];
        var emptyCornerArray = new Array;
        corners.forEach(function(item){if (board.squareArray[item].isEmpty())
            {emptyCornerArray.push(item);}})
        if (emptyCornerArray.length > 0){
            return emptyCornerArray[Math.floor(Math.random() * emptyCornerArray.length)];
        }else{ 
            const middles = [1,3,5,7];
            var emptyMiddles = new Array;
            middles.forEach(function(item){if (board.squareArray[item].isEmpty()){emptyMiddles.push(item);}}
            );return emptyMiddles[Math.floor(Math.random() * emptyMiddles.length)]}
        }
    
}
function makeMoveBeginner(){
    let counter = 0;
    do{counter++;
    randomSquare =  Math.floor(Math.random()*9);
    if (board.squareArray[randomSquare].isEmpty()){
        return randomSquare;}
    }while (!board.squareArray[randomSquare].isEmpty() && counter <30);
}
function setUp(){
    window.onload = function(){
        board = new Board();
        console.log(board);
        myReset = document.getElementById("reset1");
        myReset.addEventListener("click",reset1,false);
        squares = document.querySelectorAll(".square");
        for (var i = 0;i<9;i++){
            squares[i].addEventListener('click', function(){selectSquare(this.value)}, false);
            squares[i].addEventListener('mouseover', function(){this.style.backgroundColor = "#AA0000";}, false);
            squares[i].addEventListener('mouseout', function(){this.style.backgroundColor = " #11bbcc";}, false);
        }
    };
}
let opponent = localStorage["cOrP"];
if (opponent == "computer"){
    var mode = localStorage["mode"];
}
setUp();