//we need 3 main objects: gameboard,player, game

function showBoard(rows,columns,array) {
    
    const container = document.querySelector(".container");
    for(let i=0; i<rows; i++) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        container.appendChild(rowElement);
        for(j=0; j < columns; j++) {
            let cell = createCell(i,j,array.length +1);
            let cellDiv = document.createElement("div");
            cellDiv.textContent = cell.content;
            cellDiv.classList.add("cell");
            cellDiv.setAttribute("id", cell.cellId);
            rowElement.appendChild(cellDiv);
            array.push(cell);


        }
    }
    
    
}


function createCell(rowIndex, columnIndex, arrayIndex) {
    const cellId = "c" + arrayIndex;
    let content="";
    return {rowIndex,columnIndex, cellId, content}
}

function createPlayer(name,mark) {
    return {name,mark}
}

function getComputerChoice(array,computerObj){
        let emptyCellIndexes=[];
        for(i=0; i < array.length; i++) {
            if(array[i].content == "") {
                emptyCellIndexes.push(i);
            }
        }
        //pick random value from emptyCellIndexes
        const randomIndex = emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];
        
        if(randomIndex == undefined) {
            return false;
        } else {
             //mark div and change corresponding object at randomIndex
        array[randomIndex].content = computerObj.mark;
        const divId = "#" + array[randomIndex].cellId;
        
        document.querySelector(divId).textContent = computerObj.mark;
        
        }
     
}

function evaluateLine(obj1,obj2,obj3) {
    if(obj1 != undefined && obj2 != undefined && obj3 != undefined) {

    const a = obj1.content;
    const b = obj2.content;
    const c = obj3.content;
    const id1 = "#" + obj1.cellId;
    const id2 = "#" + obj2.cellId;
    const id3 = "#" + obj3.cellId;    
    let winningMark = ((a != "") && (a == b) && (a == c) ) ? a : "";
    if (winningMark != "") {
        let div1 = document.querySelector(id1);
        let div2 = document.querySelector(id2);
        let div3 = document.querySelector(id3);
        div1.style.background = "rgb(40, 148, 80)";
        div1.style.color = "white";
        div2.style.background = "rgb(40, 148, 80)";
        div2.style.color = "white";
        div3.style.background = "rgb(40, 148, 80)";
        div3.style.color = "white";
    }
    return winningMark;
    } else {
        return "HMM";
    }

}

function evaluateBoard(board) {
    let fRow = evaluateLine(board[0],board[1],board[2]);
    let secRow = evaluateLine(board[3],board[4],board[5]);
    let tRow = evaluateLine(board[6],board[7],board[8]);
    let fCol = evaluateLine(board[0],board[3],board[6]);
    let secCol = evaluateLine(board[1],board[4],board[7]);
    let tCol = evaluateLine(board[2],board[5],board[8]);
    let accross = evaluateLine(board[0],board[4],board[8]);
    let accross2 = evaluateLine(board[2], board[4], board[6]);
    let result;
    let emptys= [];
    for (i=0; i < board.length; i++) {
        if(board[i].content == "") {
            emptys.push(board[i]);
        }
    }
    let arr = [fRow,fCol,secRow,secCol,tCol,tRow,accross,accross2]
    for(i = 0; i < arr.length;i++) {
        if(arr[i] != "") {
            result = arr[i];
            for(j=0; j < emptys.length; j++) {
                let divId = "#" + emptys[j].cellId
                let div = document.querySelector(divId);
                div.style.background = "black"; 
                div.style.pointerEvents = "none";
            }

        }
    }
    return result;
}
//popup div to display winner + start new game
function newGame(message){
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    p.textContent = "Click here to start a new game";
    h3. textContent = message;
    div.classList.add("new");
    div.appendChild(h3);
    div.appendChild(p);
    
    let body =  document.querySelector("body");
    body.appendChild(div);
    div.addEventListener("click", ()=> {

        div.style.display = "none";
        game(playerName,playerMark,computerMark);
        
    })

    
}

function finish(valuation, array,playerObj,computerObj){
    let emptycellsLeft=0;
    let message;
    for(i =0; i < array.length; i++) {
        if (array[i].content == "") {
            emptycellsLeft +=1;
        }
    }
    const finishedTie = (emptycellsLeft == 0 && valuation == undefined) ? true : false;
    const finishedWon = (valuation != undefined) ? true : false;

    if(finishedWon == true) {
        let matchPlayer = (valuation == playerObj.mark) ? playerObj.name : "Computer";
        message = matchPlayer + " has won the game!";
        newGame(message);
    } else if(finishedTie == true) {
        message = "It's a tie";
        newGame(message);
    } else return false;


}


function game(playerName, playerMark, computerMark){
    const container = document.querySelector(".container");
    container.innerHTML = "";
    let newDiv = document.querySelector(".new");
    if(newDiv) {
        newDiv.style.display = "none";
    }
   
    const computer = createPlayer("Computer",computerMark);
    const player = createPlayer(playerName, playerMark);
    let board =[];
    showBoard(3,3,board);
    const divs = document.querySelectorAll(".cell");
    
    
    for(i=0; i < divs.length; i++) {
        
            divs[i].addEventListener("click", (e)=> {
                
             
                const existingValue = e.target.textContent;
                if(existingValue == "") {
                    e.target.textContent = player.mark;
                    let id = e.target.id;
                    for (let i=0; i < board.length; i++) {
                        if(board[i].cellId == id) {
                        board[i].content = player.mark;
                        }
                    }
                    let valuation; 
                    valuation = evaluateBoard(board);
                    if (valuation == undefined) {
                        getComputerChoice(board,computer);
                        valuation= evaluateBoard(board);
                        finish(valuation,board,player,computer);
                    } else {
                        finish(valuation,board,player,computer);
                    }  
                    
                } else {
                    
                    e.target.textContent = existingValue;
                }
                
            })
           
      
    }

    
    
    
    
}

function checkInput (nameInput, markInput1, markInput2) {
    let validateName = (nameInput == "" || nameInput == markInput1 || nameInput == markInput2) ? false : true;
    let validateMarks = (markInput1 == markInput2 || markInput1 == "" || markInput2 == "") ? false : true;
    let validation = validateName && validateMarks;
    return validation;
}


let playerName, playerMark, computerMark;
let startButton = document.querySelector("#start");
        
startButton.addEventListener("click", ()=> {
            console.log("Event listener");
            playerName = document.querySelector("#name").value;
            playerMark = document.querySelector("#mark1").value;
            computerMark = document.querySelector("#mark2").value;
            const text = document.querySelector("#text");
            
            const welcomeDiv = document.querySelector(".welcome");
            
            let validatedInput = checkInput(playerName, playerMark, computerMark);
            console.log("Validated to: " + validatedInput);
            switch(validatedInput){
                case false:
                    alert("Fill out all the fields and make sure that the marks are not the same");
                    break;
                case true:
                    playerMark = playerMark.toUpperCase();
                    computerMark = computerMark.toUpperCase();
                    welcomeDiv.style.display = "none";
                    text.textContent = `${playerName}(${playerMark})   VS    Computer(${computerMark}) `;
                    game(playerName,playerMark,computerMark);
                    break;    
            }
            
        })
        
   


