// ========== console =========

// // //gameBoard IIFE module
// const gameBoard=(function(){
//     const board=["","","","","","","","",""];
//     function setCell(index,marker){
//         board[index]=marker;
//     }
//     function reset(){
//         for (let i = 0; i < board.length; i++) {
//             board[i] = "";
//         }
//     }
//     function getBoard(){
//         return board;
//     }
//     function displayBoard(){
//         for (let i = 0; i < board.length; i+=3) {
//             console.log(board[i] + " | " + board[i+1] + " | " + board[i+2])
//         }
//     }
//      return {
//         setCell,
//         getBoard,
//         reset,
//         displayBoard
//     }
// })();

// //factory function
// function createPlayer(name,marker){
//     return {name,marker};
// }

// //gamestate IIFE module
// const gameState=(function(){
//     const checkwin=function(board){
//         let winningConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
//         for (let pattern of winningConditions){
//             const [a,b,c]=pattern;
//             if (board[a] && board[a]==board[b] && board[a]==board[c]){
//                 return board[a];
//             }
//         }
//     }
//     const checkdraw=function(board){
//         for (let i=0;i<board.length;i++){
//             if (board[i]=="" ){
//                 return false;
//             }
//         }
//         if (checkwin(board)){
//             return false;
//         }
//         return true;
//     }
//     return {
//         checkwin,
//         checkdraw
//     }
// })();

// //gameController IIFE module
// const gameController=(function(){
//     let player1,player2,currPlayer;
//     let gameOver=false;

//     player1=createPlayer("Abdullah","X");
//     player2=createPlayer("Ali","O");

//     currPlayer=player1;
    
//     gameBoard.displayBoard();
//     while (!gameOver){
//         // let choice=prompt("Enter index 0 - 8 :  ");
//         if (gameBoard.getBoard()[choice] !== "") {
//             console.log("Cell already marked. Try again.");
//             continue;
//         }
//         gameBoard.setCell(choice,currPlayer.marker);
//         gameBoard.displayBoard();
//         if (gameState.checkwin(gameBoard.getBoard())){
//             console.log(currPlayer.name+" wins");
//             gameOver=true;
//         }
//         else if (gameState.checkdraw(gameBoard.getBoard())){
//             console.log("It's a draw");
//             gameOver=true;
//         }else{
//             currPlayer=currPlayer===player2?player1:player2;
//         }
//     }
// })();
// // gameController();

// ========== gui ==========

//gameBoard IIFE module
const gameBoard=(function(){
    const board=["","","","","","","","",""];
    function setCell(index,marker){
        board[index]=marker;
    }
    function reset(){
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }
    function getBoard(){
        return board;
    }
     return {setCell,getBoard,reset};

})();

//factory function
function createPlayer(name,marker){
    return {name,marker};
}

//gamestate IIFE module
const gameState=(function(){
    const checkwin=function(board){
        let winningConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (let pattern of winningConditions){
            const [a,b,c]=pattern;
            if (board[a] && board[a]==board[b] && board[a]==board[c]){
                return board[a];
            }
        }
    }
    const checkdraw=function(board){
        for (let i=0;i<board.length;i++){
            if (board[i]=="" ){
                return false;
            }
        }
        if (checkwin(board)){
            return false;
        }
        return true;
    }
    return {
        checkwin,
        checkdraw
    }
})();

//gameController IIFE module
const gameController=(function(){
    let player1,player2,currPlayer;
    let gameOver=false;
    player1=createPlayer("Player 1","X");
    player2=createPlayer("Player 2","O");
    currPlayer=player1;
    
    function handleMove(index){

        if (gameOver || gameBoard.getBoard()[index] !== "") return;
        gameBoard.setCell(index,currPlayer.marker);

        displayController.render();
        if (gameState.checkwin(gameBoard.getBoard())){
            document.getElementById("message").textContent=currPlayer.name+" wins 🥳 ";
            gameOver=true;
        }
        else if (gameState.checkdraw(gameBoard.getBoard())){
            document.getElementById("message").textContent="It's a draw";
            gameOver=true;
        }else{
            currPlayer=currPlayer===player2?player1:player2;
        }
    } 
    function resetBoard(){
        gameBoard.reset();
        gameOver=false;
        currentPlayer = player1;
        displayController.render();
        document.getElementById("message").textContent = "";
    }
    return {handleMove,resetBoard};
    displayController();
})();

//displayControlling IIFE Module
const displayController=(function(){
    const grid=document.querySelector(".grid");
    function render(){
        grid.innerHTML="";
        for (let i=0;i<9;i++){
            const cell=document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = gameBoard.getBoard()[i];
            cell.dataset.index = i;
            cell.addEventListener("click",()=>{
                if (gameBoard.getBoard()[i]!=="") return; 
                gameController.handleMove(cell.dataset.index);    
            })
            grid.appendChild(cell);
        }
    }
    return {render};
})();

document.getElementById("resetBtn").addEventListener("click",gameController.resetBoard);
displayController.render();

