const rows = 30;
const cols = 50;
const boardElement = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const winnerMessageElement = document.getElementById('winnerMessage');
let currentPlayer = 'X';

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const row = parseInt(clickedCell.dataset.row);
    const col = parseInt(clickedCell.dataset.col);

    if (!clickedCell.textContent) {
        clickedCell.textContent = currentPlayer;

        if (checkWin(row, col)) {
            showWinner(currentPlayer);
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(row, col) {
    if (checkDirection(row, col, 0, 1)) return true;
    if (checkDirection(row, col, 1, 0)) return true;
    if (checkDirection(row, col, 1, 1) || checkDirection(row, col, 1, -1)) return true;

    return false;
}

function checkDirection(row, col, rowStep, colStep) {
    const symbol = currentPlayer;
    let count = 1;

    function checkStep(r, c) {
        return r >= 0 && r < rows && c >= 0 && c < cols && boardElement.children[r * cols + c].textContent === symbol;
    }

    for (let i = 1; i < 5; i++) {
        const newRow = row + i * rowStep;
        const newCol = col + i * colStep;

        if (checkStep(newRow, newCol)) {
            count++;
        } else {
            break;
        }
    }

    for (let i = 1; i < 5; i++) {
        const newRow = row - i * rowStep;
        const newCol = col - i * colStep;

        if (checkStep(newRow, newCol)) {
            count++;
        } else {
            break;
        }
    }

    return count >= 5;
}

function showWinner(player) {
    winnerMessageElement.textContent = `Hráč ${player} vyhrál!`;
}

function resetBoard() {
    boardElement.innerHTML = '';
    winnerMessageElement.textContent = '';

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }

    currentPlayer = 'X';
}

resetButton.addEventListener('click', resetBoard);