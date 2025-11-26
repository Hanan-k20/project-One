/*-------------------------------- Constants --------------------------------*/
const winningCombos = [

    // ---------------- HORIZONTAL (24) ----------------
    [0,1,2,3], [1,2,3,4], [2,3,4,5], [3,4,5,6],
    [7,8,9,10], [8,9,10,11], [9,10,11,12], [10,11,12,13],
    [14,15,16,17], [15,16,17,18], [16,17,18,19], [17,18,19,20],
    [21,22,23,24], [22,23,24,25], [23,24,25,26], [24,25,26,27],
    [28,29,30,31], [29,30,31,32], [30,31,32,33], [31,32,33,34],
    [35,36,37,38], [36,37,38,39], [37,38,39,40], [38,39,40,41],

    // ---------------- VERTICAL (21) ----------------
    [0,7,14,21], [1,8,15,22], [2,9,16,23], [3,10,17,24], [4,11,18,25], [5,12,19,26], [6,13,20,27],
    [7,14,21,28], [8,15,22,29], [9,16,23,30], [10,17,24,31], [11,18,25,32], [12,19,26,33], [13,20,27,34],
    [14,21,28,35], [15,22,29,36], [16,23,30,37], [17,24,31,38], [18,25,32,39], [19,26,33,40], [20,27,34,41],

    // ---------------- DIAGONAL DOWN-RIGHT (12) ----------------
    [0,8,16,24], [1,9,17,25], [2,10,18,26], [3,11,19,27],
    [7,15,23,31], [8,16,24,32], [9,17,25,33], [10,18,26,34],
    [14,22,30,38], [15,23,31,39], [16,24,32,40], [17,25,33,41],

    // ---------------- DIAGONAL UP-RIGHT (12) ----------------
    [21,15,9,3], [22,16,10,4], [23,17,11,5], [24,18,12,6],
    [28,22,16,10], [29,23,17,11], [30,24,18,12], [31,25,19,13],
    [35,29,23,17], [36,30,24,18], [37,31,25,19], [38,32,26,20]

];

/*---------------------------- Variables (state) ----------------------------*/

let board=["","","","","","","","","","","","","","","","","","","","","",
           "","","","","","","","","","","","","","","","","","","","",""];
let turn ;
let winner; 
let tie ;
let row=6;
let cols=7;
let isLocked = false;

/*------------------------ Cached Element References ------------------------*/
const pupElement=document.getElementById("pup")
const resetEl=document.querySelector("#reset")
const openButomn=document.querySelector("#rules")
const cellEls= document.querySelectorAll(".cell")
const messageEl=document.querySelector("#message")
const rulesImage=document.querySelector("#rules-image")
const closeButomn=document.querySelector("#close-button")
const rulesAudio = new Audio('New folder/Mohammed Mamoun 1.mp3')
const winAudio = new Audio('New folder/applause-small-audience-97257.mp3')
const dropDiscAudio= new Audio('New folder/dropping-of-the-ring-404874.mp3')


/*----------------------------- Event Listeners -----------------------------*/
resetEl.addEventListener("click",init );
openButomn.addEventListener("click",showPup );
closeButomn.addEventListener("click", closePup);
cellEls.forEach(cell => {cell.addEventListener('click', handleClick);});


/*-------------------------------- Functions --------------------------------*/
function init(){
    board=["","","","","","","","","","","","","","","","","","","","","",
           "","","","","","","","","","","","","","","","","","","","",""];
    turn="🔴"
    winner =false
    tie = false
    isLocked = false
    winAudio.pause() 
    winAudio.surrenTime=0
    render()
}


function showPup(){
    pupElement.classList.add("open") 
    rulesImage.addEventListener("click", audioRules);
}


function closePup(){
    pupElement.classList.remove("open") 
    rulesAudio.pause() 
    rulesAudio.surrenTime=0
    
}


function dropDisc (){
  dropDiscAudio.volume = 1
  dropDiscAudio.play()
}


function audioWin (){
  winAudio.volume = 0.5
  winAudio.play()
}


function audioRules (){
  rulesAudio.volume = 1
  rulesAudio.play()
 
}


function render(){
   updateBoard()
   updateMessage()
}


function updateMessage(){
    if((winner)){
        let winningPlayer = turn
        if (turn === '🔴') {
             winningPlayer = '🟡';
        }
        else {
             winningPlayer = '🔴';
        }
        messageEl.textContent=`${turn} WON! `
        audioWin ()
     }
    else if(tie){
         messageEl.textContent='The game ended in a draw'
    }
    else  {
            messageEl.textContent=`${turn} Player role  `
        }
}


function switchPlayerTurn(){
    if(winner) 
        {return}
    else if (turn==="🔴"){
        turn="🟡"
    }
    else if (turn==="🟡"){
        turn="🔴"
}}


function checkForTie(){
    if(winner)return
    if(!board.includes("") ){
        tie=true}
    else{tie=false}
}


function updateBoard(){
    board.forEach((value,index) =>
    {const cell = cellEls[index]
        cell.textContent=value

        if (!cell.querySelector("span")) {
             cell.textContent = value;
        } } )
}


function checkForWinner(){

    for(let i=0;i<winningCombos.length;i++){
        const winnerP = winningCombos[i]

        const a=winnerP[0]
        const b=winnerP[1]
        const c=winnerP[2]
        const d=winnerP[3]

        const valA = board[a] 
        const valB = board[b]
        const valC = board[c]
        const valD = board[d]

        if(valA!==""&&valA===valB && valA===valC &&valA===valD ){
             winner=true
             audioWin ()
             return
    }
  }
}

function handleClick(event){
    if(winner || tie || isLocked ) return;
    const colsIndex = Number(event.currentTarget.dataset.columns);
    if(isNaN(colsIndex)) return;
    let indexplace = -1;
    for(let i = row-1; i >=0; i--){
        const index = i * cols + colsIndex;
        if(board[index] === ''){
            indexplace = index;
            break;
    }}
    if(indexplace === -1) return; 
    placePiece(indexplace);  
}


function placePiece(indexplace){
    const cellElement = cellEls[indexplace];
    const playerClass = turn === '🔴' ? 'player-one' : 'player-two';
    board[indexplace] = turn;
    
    isLocked = true;
    const disc = document.createElement("div"); 
    disc.classList.add("disc", playerClass, "fall");
    disc.textContent = turn; 

    const rowIndex = Math.floor(indexplace / cols);
    const duration = (rowIndex + 1) * 0.07;
    
    disc.style.animationDuration = duration + 's';
    cellElement.appendChild(disc); 
   
    dropDisc ()

    function stabilizeDisc() {
        disc.removeEventListener("animationend", stabilizeDisc); 
        checkForWinner(); 
        checkForTie();
        if (!winner) {
            switchPlayerTurn()}
            isLocked = false;
            render(); 
        }
    disc.addEventListener("animationend", stabilizeDisc);  
}

init()





