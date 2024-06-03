//we need 3 main objects: gameboard,player, game

function showBoard(rows,columns,array) {
    
    const body = document.querySelector("body");
    for(let i=0; i<rows; i++) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        body.appendChild(rowElement);
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
    console.log(array);
    
}





function createCell(rowIndex, columnIndex, arrayIndex) {
    const cellId = "c" + arrayIndex;
    let content="";
    return {rowIndex,columnIndex, cellId, content}
}

function createPlayer(name,mark) {
    return {name,mark}
}

function getComputerChoice(array,computerObj,playerObj){
    let evaluation = evaluateBoard(array,computerObj,playerObj);

    
    let emptyCellIndexes=[];
    for(i=0; i < array.length; i++) {
        if(array[i].content == "") {
            emptyCellIndexes.push(i);
        }
    }
    //pick random value from emptyCellIndexes
    const randomIndex = emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];
    console.log("Random index: " + randomIndex);

    if((evaluation == false) && (randomIndex != undefined)) {
        //mark div and change corresponding object at randomIndex
        array[randomIndex].content = computerObj.mark;
        const divId = "#" + array[randomIndex].cellId;
        console.log(divId);
        document.querySelector(divId).textContent = computerObj.mark;
    } else if ((evaluation == false) && (randomIndex == undefined)) {
        alert("It's a tie!");
    } else if (evaluation == true) {
        
    } 

    

    
}


function evaluateBoard (objectArray,player1obj, player2obj) {
    //evaluate first row
    let firstRow = ((objectArray[0].content == objectArray[1].content) && 
        (objectArray[0].content == objectArray[2].content) && objectArray[0].content != "");
    
    let secondRow = ((objectArray[3].content == objectArray[4].content) && 
        (objectArray[3].content == objectArray[5].content) && objectArray[3].content != "");

    let thirdRow = ((objectArray[6].content == objectArray[7].content) && 
        (objectArray[6].content == objectArray[8].content) && objectArray[6].content != "");

    let accross = ((objectArray[0].content == objectArray[4].content) && 
    (objectArray[6].content == objectArray[8].content) && objectArray[0].content != "");

    let firstColumn = ((objectArray[0].content == objectArray[3].content) && 
        (objectArray[0].content == objectArray[6].content) && objectArray[0].content != "");
    
    let secondColumn = ((objectArray[1].content == objectArray[4].content) && 
        (objectArray[1].content == objectArray[7].content) && objectArray[1].content != "");

    let thirdColumn = ((objectArray[2].content == objectArray[5].content) && 
        (objectArray[2].content == objectArray[8].content) && objectArray[2].content != "");


    let result = firstRow || secondRow || thirdRow || firstColumn || secondColumn || thirdColumn || accross;
    
   return result;
} 





function game(){
    const computer = createPlayer("Computer","O");
    const player = createPlayer("Csaba", "X");
    let board =[];
    showBoard(3,3,board);
    const divs = document.querySelectorAll(".cell");
    console.log(divs);
    for(i=0; i < divs.length; i++) {
        if (divs[i].textContent == "") {
            divs[i].addEventListener("click", (e)=> {
                e.target.textContent = player.mark;
                let id = e.target.id;
                console.log(id);
                for (let i=0; i < board.length; i++) {
                    if(board[i].cellId == id) {
                        board[i].content = player.mark;
                    }
                }
                console.log(board);
                getComputerChoice(board,computer,player);
            })
        }
    }

    
    
    
    
}

game();