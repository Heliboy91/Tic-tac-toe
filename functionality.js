//we need 3 main objects: gameboard,player, game

function gameBoard(rows,columns) {
    
    const body = document.querySelector("body");
    let board = [];
    for(let i=0; i<rows; i++) {
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        body.appendChild(rowElement);
        for(j=0; j < columns; j++) {
            let cell = createCell(i,j,board.length +1);
            let cellDiv = document.createElement("div");
            cellDiv.textContent = cell.content;
            cellDiv.classList.add("cell");
            cellDiv.setAttribute("id", cell.cellId);
            rowElement.appendChild(cellDiv);
            board.push(cell);


        }
    }
    return board;
}





function createCell(rowIndex, columnIndex, arrayIndex) {
    const cellId = "c" + arrayIndex;
    let content="";
    return {rowIndex,columnIndex, cellId, content}
}





function game(){
    //create players
    //display board
    //evaluate board: win/tie
    //player choose
    //display new board
    //player choose
}
