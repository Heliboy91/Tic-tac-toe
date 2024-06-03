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

function getComputerChoice(array){
    let emptyCellIndexes=[];
    for(i=0; i < array.length; i++) {
        if(array[i].content == "") {
            emptyCellIndexes.push(i);
        }
    }
    //pick random value from emptyCellIndexes
    const randomIndex = emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];
    console.log(randomIndex);
    
}








function game(){
    let board =[];
    showBoard(3,3,board);
    const divs = document.querySelectorAll(".cell");
    console.log(divs);
    for(i=0; i < divs.length; i++) {
        if (divs[i].textContent == "") {
            divs[i].addEventListener("click", (e)=> {
                e.target.textContent = "X";
                let id = e.target.id;
                console.log(id);
                for (let i=0; i < board.length; i++) {
                    if(board[i].cellId == id) {
                        board[i].content = "X";
                    }
                }
                console.log(board);
                getComputerChoice(board);
            })
        }
    }

    
    
    
    
}

game();