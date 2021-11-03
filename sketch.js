let board = [
  [],
  [],
  []
];
let players = ['X', 'O'];
let msg;
let row;
let col;

function mousePressed() {
  [row, col] = getField();
  if (row != null && col!= null) {
    board = setField(board, row, col, currentPlayer);
    currentPlayer = switchTurn(currentPlayer);
  }
  msg = findWinner(board);
  if (IsBoardFull(board) && !msg) {
    msg = 'Game Over';
  }
  row = null;
  col = null;
}
let restartbutton;
function restart() {
  board = [
    [],
    [],
    []
  ];
  msg = null;
  setup()
}

function setup() {
  createCanvas(400, 400);
  currentPlayer = random(players);
  restartbutton = createButton("Restart Game");
  restartbutton.position(500, 500)
  restartbutton.mousePressed(restart);
}

function draw() {
  if (msg) {
    //background(255);
    textSize(35);
    text(msg, 30, 200);
    fill(0, 102, 153);
  }
  else {
    background(255);
    ellipse(mouseX, mouseY, 25, 25);
    const w = width / 3;
    const h = height / 3;
    //set border 
    line(w, 0, w, height);
    line(2 * w, 0, 2 * w, height);
    line(0, h, width, h);
    line(0, 2 * h, width, 2 * h);

    //draw board 
    for (let row = 2; row >= 0; row--) {
      for (let col = 2; col >= 0; col--) {
        let y = w * row + w / 2;
        let x = h * col + h / 2;
        let spot = board[row][col];
        textSize(32);
        strokeWeight(4);
        if (spot == players[1]) {
          noFill();
          ellipse(x, y, w / 2);
        } else if (spot == players[0]) {
          const xr = w / 4;
          line(x - xr, y - xr, x + xr, y + xr);
          line(x + xr, y - xr, x - xr, y + xr);
        }
      }
    }
  }
}

/**
 * 
 * @param {*} board 
 * @returns 
 */
const findWinner = board => {
  if (!board) throw new "The board is required";
  const row = rowIsTaken(board)
  const diagonal = diagonalIsTaken(board);
  const col = columnIsTaken(board);
  if (row == 'X' || diagonal == 'X' || col == 'X') {
    return 'Player X Is A WINNER';
  }
  if (row === 'O' || diagonal === 'O' || col === 'O') {
    return 'Player O Is A WINNER';
  }
};

const rowIsTaken = board => {
  if (!board) throw new "The board is required";
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === 'X' && board[row][1] === 'X' && board[row][2] === 'X') {
      return 'X';
    }
    if (board[row][0] === 'O' && board[row][1] === 'O' && board[row][2] === 'O') {
      return 'O';
    }
  }
};
/**
* 
* @param {*} board 
* @returns 
*/
const diagonalIsTaken = board => {
  if (!board) throw new "The board is required";
  if ((board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O')
    || (board[2][0] === 'O' && board[1][1] === 'O' && board[0][2] === 'O'))
    return 'O'
  if ((board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') || (board[2][0] === 'X' && board[1][1] === 'X' && board[0][2] === 'X'))
    return 'X';
};
/**
* 
* @param {*} board 
* @returns 
*/
const columnIsTaken = board => {
  if (!board) throw new "The board is required";
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === 'X' && board[1][col] === 'X' && board[2][col] === 'X') {
      return 'X';
    }
    if (board[0][col] === 'O' && board[1][col] === 'O' && board[2][col] === 'O') {
      return 'O';
    }
  }
};
const IsBoardFull = board => {
  if (!board) throw new "The board is required";
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (!(board[row][col])) {
        return false;
      }
    }
  }
  return true;
};

const setField = (board, row, col, player) => {
  if (!board) throw new "The board is required";
  if (!player) throw new "The player is required";

  if (!(board[row][col])) {
    board[row][col] = player;
  }
  return board;
};
const switchTurn = currentPlayer => {
  if (!currentPlayer) throw new "The player is required";
  return currentPlayer === 'O' ? 'X' : currentPlayer === 'X' ? 'O' : "error";
}
const getField = () => {
  if (mouseX >= 0 && mouseX < width / 3) {
    col = 0;
  } else if (mouseX >= width / 3 && mouseX < 2 * (width / 3)) {
    col = 1;
  } else if (mouseX >= 2 * (width / 3) && mouseX < width) {
    col = 2;
  }
  if (mouseY >= 0 && mouseY < height / 3) {
    row = 0;
  } else if (mouseY >= height / 3 && mouseY < 2 * (height / 3)) {
    row = 1;
  } else if (mouseY >= 2 * (height / 3) && mouseY < height) {
    row = 2;
  }
  return [row, col];
}

module.exports = {
  rowIsTaken,
  diagonalIsTaken,
  columnIsTaken,
  IsBoardFull,
  setField,
  switchTurn
};


