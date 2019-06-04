const frontImage = "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fdog%2Fdog-12.jpg&f=1";
const green = "http://www.seoeditors.com/wp-content/uploads/2012/05/green-seo-colour-experiment.jpg"
let needToClearClickedArray = false;

class Board {
  constructor(rows, columns) {
    this.imageArray = [];
    this._rows = rows || 2;
    this.tileArray = [];
    this.clickedTileArray = [];
    this._columns = columns || 10;
    this._unflipped = this._rows * this._columns;
  }
    get rows() {
    return this._rows;
  }
    get columns() {
    return this._columns;
  }
    get unflipped() {
    return this._unflipped;
  }
  isGameOver(){
      return this.unflipped <= 0;
  }
  isMatch(tileNum1,tileNum2){
      if (board.tileArray[tileNum1]._backImage[0] == board.tileArray[tileNum2]._backImage[0]){
        board.tileArray[tileNum1].matched = true;
        board.tileArray[tileNum2].matched = true;
        board.tileArray[tileNum1].changeImage(green);
        board.tileArray[tileNum2].changeImage(green);
        board._unflipped = board._unflipped -2;
        let buttonID = "#button"+ board.tileArray[tileNum1]._position.toString();
        var myButton = document.querySelector(buttonID)
        myButton.style.backgroundImage = 'url('+green+')';
        myButton.classList.add("matched");
        buttonID = "#button"+ board.tileArray[tileNum2]._position.toString();
        var myButton = document.querySelector(buttonID)
        myButton.style.backgroundImage = 'url('+green+')';
        myButton.classList.add("matched");
        return true;
      }return false;
  }
}
class Tile{
    constructor(position, backImage) {
    this._position = position;
    this.row = Math.floor(position/board.columns);
    this.flipped = false;
    this.matched = false;
    this.column = position % board.columns;
    this._image = frontImage;
    this._backImage = backImage || "https://www.insidedogsworld.com/wp-content/uploads/2016/03/Dog-Pictures.jpg";
  }
  get image(){
      return this._image;
  }
  changeImage(newImage){
    this._image = newImage;
  }
  flipTile(){
    if (needToClearClickedArray){
      updateButtons(board.clickedTileArray[0],board.clickedTileArray[2])
      board.clickedTileArray =[];
      needToClearClickedArray = false;
    }
    this.flipped = true;
    board.clickedTileArray.push(this._position);
    let buttons = document.querySelectorAll(".tileButton");
    for (button of buttons){
      if (button.value == this._position){
        button.style.backgroundImage = 'url('+this._backImage+')';
      }
    }
    if (board.clickedTileArray.length == 2){
      if (board.isMatch(board.clickedTileArray[0],board.clickedTileArray[1])){
        board.clickedTileArray =[];
        if (board._unflipped == 0){
          document.querySelector("#message").innerHTML= "Game Over You DID IT!";
        }
      }else{
        board.tileArray[board.clickedTileArray[0]].changeImage(frontImage);
        board.tileArray[board.clickedTileArray[1]].changeImage(frontImage);
        needToClearClickedArray = true;
      } 
    }
  }
}
function updateButtons(tile1,tile2){
  let buttonID = "#button"+ board.tileArray[board.clickedTileArray[0]]._position.toString();
  var myButton = document.querySelector(buttonID);
  myButton.style.backgroundImage = 'url('+frontImage+')';
  buttonID = "#button"+ board.tileArray[board.clickedTileArray[1]]._position.toString();
  var myButton = document.querySelector(buttonID);
  myButton.style.backgroundImage = 'url('+frontImage+')';                     
}
function flipThisTile(){
  board.tileArray[this.value].flipTile();

}
function setUpListeners(){
    let buttons = document.querySelectorAll(".tileButton");
    for (button of buttons){
        button.addEventListener("click",flipThisTile);
    }
    let reset = document.querySelector("#reset");
    reset.addEventListener("click",function(){
      main();
      needToClearClickedArray = false;
      document.querySelector("#message").innerHTML= "Welcome to Concentration";
      let buttons = document.querySelectorAll(".tileButton");
      for (button of buttons){
        button.style.backgroundImage= 'url('+frontImage+')';
        button.classList.remove("matched");
      }
    })
}
function shuffle(){
  let randomArray = [];
  while (board.imageArray.length > 0){
    let randomNum = Math.floor(Math.random() * board.imageArray.length);
    let currentImage = board.imageArray.splice(randomNum, 1);
    randomArray.push(currentImage);
  }
  board.imageArray = randomArray;
}
function setUpTiles(){
  var backImage;
  for (let i=0; i < board.unflipped;i=i+2){
      fetch ("https://dog.ceo/api/breeds/image/random")
      .then(function(data){return data.json();
      })
      .then(function(json){
      backImage = json.message;
      board.imageArray.push(backImage);
      board.imageArray.push(backImage);
      })
  }
  setTimeout(function(){
    shuffle()
    for (let i=0;i<board.imageArray.length;i++){
      board.tileArray.push(new Tile((i),board.imageArray[i]));  
}}, 2000);
             
  }

function main(){
    setUpListeners();
    board = new Board;
    setUpTiles();
}

main()

