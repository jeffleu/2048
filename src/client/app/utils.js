const createBoard = (n) => {
  const board = [];

  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) { row.push(0) }
    board.push(row);
  }

  return board;
};

// Get all blank coordinates from board
const getBlankCoordinates = (board) => {
  const blankCoordinates = [];
  
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) {blankCoordinates.push([r, c])}
    }
  }
          
  return blankCoordinates;
};

// Grab random start number
const randomStartingNumber = () => {
  const startingNumbers = [2,4];
  const randomNumber = startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
  return randomNumber;
};

// Place random starting number on an empty coordinate
export const placeRandom = (board) => {
  const blankCoordinates = getBlankCoordinates(board);
  const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
  const randomNumber = randomStartingNumber();
  board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
  return board;
};

export const getInitialState = (n) => {
  let board = createBoard(n);
  board = placeRandom(placeRandom(board));
  
  return {
    board,
    score: 0,
    gameOver: false,
    message: null
  };
};

const rotateRight = (matrix) => {
  let result = [];

  for (let c = 0; c < matrix.length; c++) {
    let row = [];
    for (let r = matrix.length - 1; r >= 0; r--) {
      row.push(matrix[r][c]);
    }
    result.push(row);
  }

  return result;
};
  
const rotateLeft = (matrix) => {
  let result = [];

  for (let c = matrix.length - 1; c >= 0; c--) {
    let row = [];
    for (let r = matrix.length - 1; r >= 0; r--) {
      row.unshift(matrix[r][c]);
    }
    result.push(row);
  }

  return result;
}

export const moveUp = (inputBoard) => {
  let rotatedRight = rotateRight(inputBoard);
  let board = [];
  let score = 0;

  // Shift all numbers to the right
  for (let r = 0; r < rotatedRight.length; r++) {
    let row = [];
    for (let c = 0; c < rotatedRight[r].length; c++) {
      let current = rotatedRight[r][c];
      (current === 0) ? row.unshift(current) : row.push(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to right
  for (let r = 0; r < board.length; r++) {
    for (let c = board[r].length - 1; c >= 0; c--) {
      if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c - 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
        board[r][c] = board[r][c - 1];
        board[r][c - 1] = 0;
      }
    }
  }

  // Rotate board back upright
  board = rotateLeft(board);

  return { board, score };
};

export const moveRight = (inputBoard) => {
  let board = [];
  let score = 0;

  // Shift all numbers to the right
  for (let r = 0; r < inputBoard.length; r++) {
    let row = [];      
    for (let c = 0; c < inputBoard[r].length; c++) {
      let current = inputBoard[r][c];
      (current === 0) ? row.unshift(current) : row.push(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to right
  for (let r = 0; r < board.length; r++) {
    for (let c = board[r].length - 1; c >= 0; c--) {
      if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c - 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c - 1] > 0) {
        board[r][c] = board[r][c - 1];
        board[r][c - 1] = 0;
      }
    }
  }

  return { board, score };
};

export const moveDown = (inputBoard) => {
  let rotatedRight = rotateRight(inputBoard);
  let board = [];
  let score = 0;

  // Shift all numbers to the left
  for (let r = 0; r < rotatedRight.length; r++) {
    let row = [];      
    for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
      let current = rotatedRight[r][c];
      (current === 0) ? row.push(current) : row.unshift(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to left
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c + 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
        board[r][c] = board[r][c + 1];
        board[r][c + 1] = 0;
      }
    }
  }

  // Rotate board back upright
  board = rotateLeft(board);

  return { board, score };
};

export const moveLeft = (inputBoard) => {
  let board = [];
  let score = 0;

  // Shift all numbers to the left
  for (let r = 0; r < inputBoard.length; r++) {
    let row = [];      
    for (let c = inputBoard[r].length - 1; c >= 0; c--) {
      let current = inputBoard[r][c];
      (current === 0) ? row.push(current) : row.unshift(current);
    }
    board.push(row);
  }

  // Combine numbers and shift to left
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board.length; c++) {
      if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
        board[r][c] = board[r][c] * 2;
        board[r][c + 1] = 0;
        score += board[r][c];
      } else if (board[r][c] === 0 && board[r][c + 1] > 0) {
        board[r][c] = board[r][c + 1];
        board[r][c + 1] = 0;
      }
    }
  }
  
  return { board, score };
};

// Compares two boards to check for movement
export const boardMoved = (original, updated) => {
  original = JSON.stringify(original);
  updated = JSON.stringify(updated);

  return (updated !== original) ? true : false;
};

// Check to see if there are any moves left
export const checkForGameOver = (board) => {
  const moves = [
    boardMoved(board, moveUp(board).board),
    boardMoved(board, moveRight(board).board),
    boardMoved(board, moveDown(board).board),
    boardMoved(board, moveLeft(board).board)
  ];
  
  return (moves.includes(true)) ? false : true;
};

export const continueOrEndGame = (board, score) => {
  if (checkForGameOver(board)) {
    return { board, gameOver: true, message: 'Game over!' };
  } else {
    return { board, score };
  }
};
