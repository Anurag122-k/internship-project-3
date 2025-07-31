const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
let board = Array(9).fill(null);
let xIsNext = true;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleClick(e) {
  const idx = e.target.dataset.index;
  if (board[idx] || checkWinner()) return;

  board[idx] = xIsNext ? 'X' : 'O';
  e.target.textContent = board[idx];

  if (checkWinner()) {
    message.textContent = `Winner: ${board[idx]}`;
  } else if (!board.includes(null)) {
    message.textContent = "It's a draw!";
  } else {
    xIsNext = !xIsNext;
    message.textContent = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function startGame() {
  board.fill(null);
  xIsNext = true;
  cells.forEach(cell => { cell.textContent = ''; });
  message.textContent = `Next player: X`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', startGame);

startGame();
