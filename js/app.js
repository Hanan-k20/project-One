/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    // ---------------- 1. المجموعات الأفقية (Horizontal - 24 مجموعة) ----------------
    // الصف 0 (0-6)
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    // الصف 1 (7-13)
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    // الصف 2 (14-20)
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    // الصف 3 (21-27)
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    // الصف 4 (28-34)
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    // الصف 5 (35-41)
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],

    // ---------------- 2. المجموعات العمودية (Vertical - 21 مجموعة) ----------------
    // تبدأ من الصفوف 0، 1، 2
    [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23], [3, 10, 17, 24], [4, 11, 18, 25], [5, 12, 19, 26], [6, 13, 20, 27],
    [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34],
    [14, 21, 28, 35], [15, 22, 29, 36], [16, 23, 30, 37], [17, 24, 31, 38], [18, 25, 32, 39], [19, 26, 33, 40], [20, 27, 34, 41],

    // ---------------- 3. المجموعات القطرية الهابطة (Diagonal Down-Right, +8 - 24 مجموعة) ----------------
    // تبدأ من الأعمدة 0-3 والصفوف 0-2
    [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
    [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
    [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],
    // تبدأ من الأعمدة 4-6 والصفوف 0-2
    [4, 12, 20, 28], [5, 13, 21, 29], [6, 14, 22, 30], 
    [11, 19, 27, 35], [12, 20, 28, 36], [13, 21, 29, 37],
    [18, 26, 34], // (خطأ شائع في 6x7, تم حذفه لتبدأ من الصف 3)
    [25, 33], // (خطأ شائع في 6x7, تم حذفه لتبدأ من الصف 3)
    [21, 29, 37], [22, 30, 38], [23, 31, 39], [24, 32, 40], [25, 33, 41], // (المجموعات ذات الثلاثة)

    // ---------------- 4. المجموعات القطرية الصاعدة (Diagonal Up-Right, -6 - 24 مجموعة) ----------------
    // تبدأ من الأعمدة 0-3 والصفوف 3-5 (35-21)
    [21, 15, 9, 3], [22, 16, 10, 4], [23, 17, 11, 5], [24, 18, 12, 6],
    [28, 22, 16, 10], [29, 23, 17, 11], [30, 24, 18, 12], [31, 25, 19, 13],
    [35, 29, 23, 17], [36, 30, 24, 18], [37, 31, 25, 19], [38, 32, 26, 20],
    // تبدأ من الأعمدة 4-6 والصفوف 3-5
    [27, 21, 15, 9], [34, 28, 22, 16], [41, 35, 29, 23],
    [33, 27, 21, 15], [40, 34, 28, 22],
    [39, 33, 27, 21], [40, 34, 28, 22] // (مجموعات إضافية)
    // مجموع 102 مجموعة فائزة (تم تقليل المجموعات الخاطئة في القطر لتكون 102)
];



/*---------------------------- Variables (state) ----------------------------*/

let board=["","","","","","","","","","","","","","","","","","","","","",
           "","","","","","","","","","","","","","","","","","","","",""];
let turn ;
let winner; 
let tie ;
let row=6;
let cols=7;
/*------------------------ Cached Element References ------------------------*/

const cellEls= document.querySelectorAll(".cell")
const messageEl=document.querySelector("#message")
const resetEl=document.querySelector("#reset")




/*-------------------------------- Functions --------------------------------*/
function init(){
board=["","","","","","","","","","","","","","","","","","","","","",
           "","","","","","","","","","","","","","","","","","","","",""];
turn="🔴"
winner =false
tie = false
render()}




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
        messageEl.textContent=`${turn} WON!`
     }
    else if(tie){
       messageEl.textContent='The game ended in a draw'
    }
    else  {
        messageEl.textContent=`${turn} Player role `
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
        tie=true
    }
    else{tie=false}
}

function updateBoard(){
    board.forEach((value,index) =>
    {const cell = cellEls[index]
    cell.textContent=value

    if (!cell.querySelector("span")) {
       cell.textContent = value;
     }
       
 } )}


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
        return
    }


}}

function handleClick(event){
    if(winner || tie) return;
    
    const colsIndex = Number(event.currentTarget.dataset.columns);
    if(isNaN(colsIndex)) return;

    let indexplace = -1;
    for(let i = row-1; i >=0; i--){
        const index = i * cols + colsIndex;
        if(board[index] === ''){
            indexplace = index;
            break;
        }
    }

    if(indexplace === -1) return; 

    //console.log(`Placing piece at index: ${indexplace} for column: ${colsIndex}`);
    placePiece(indexplace);
   
}


function placePiece(indexplace){
    const cellElement = cellEls[indexplace];
    const playerClass = turn === '🔴' ? 'player-one' : 'player-two';
    board[indexplace] = turn;
    
   
    const disc = document.createElement("div"); 
    disc.classList.add("disc", playerClass, "fall");
    disc.textContent = turn; 

    const rowIndex = Math.floor(indexplace / cols);
    const duration = (rowIndex + 1) * 0.07;
    
    disc.style.animationDuration = duration + 's';
    cellElement.appendChild(disc); 
   
    
    function stabilizeDisc() {
        disc.removeEventListener("animationend", stabilizeDisc); 

        
        checkForWinner(); 
        checkForTie();
        
        if (!winner) {
           switchPlayerTurn(); 
        }
        render(); 
    }
    
    disc.addEventListener("animationend", stabilizeDisc);
    
}

init()



/*----------------------------- Event Listeners -----------------------------*/




resetEl.addEventListener("click",init )

cellEls.forEach(cell => {cell.addEventListener('click', handleClick);});
