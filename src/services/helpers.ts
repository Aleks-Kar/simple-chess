function isWhite(piece: string): boolean {
  return piece === piece.toUpperCase()
}

/* CALCULATES PAWN MOVES */
export function getPawnMoves(board: string[], piece: string, index: number) {
  // gets coordinates
  const y = Math.trunc(index / 8)
  const x = index - y * 8

  // checks if pawn in an initial position
  let maxLength: number = 0
  if (isWhite(piece)) {
    maxLength = y === 1 ? 3 : 2 // for the white pawn
  } else {
    maxLength = y === 6 ? 3 : 2 // for the black pawn
  }

  const isWhitePiece = isWhite(piece)
  const moveableSquares = new Array<boolean>(64)
  moveableSquares.fill(false)

  /* pawn angle moves */
  if (isWhitePiece) {
    // the move to the left corner of the white piece
    if (x > 0 && y < 7) {
      const lIndex = x - 1 + (y + 1) * 8
      if (board[lIndex] !== '' && !isWhite(board[lIndex]))
        moveableSquares[lIndex] = true
    }
    // the move to the right corner of the white piece
    if (x < 7 && y < 7) {
      const rIndex = x + 1 + (y + 1) * 8
      if (board[rIndex] !== '' && !isWhite(board[rIndex]))
        moveableSquares[rIndex] = true
    }
  } else {
    // the move to the left corner of the black piece
    if (x > 0 && y > 0) {
      const lIndex = x - 1 + (y - 1) * 8
      if (board[lIndex] !== '' && isWhite(board[lIndex]))
        moveableSquares[lIndex] = true
    }
    // the move to the right corner of the black piece
    if (x < 7 && y > 0) {
      const rIndex = x + 1 + (y - 1) * 8
      if (board[rIndex] !== '' && isWhite(board[rIndex]))
        moveableSquares[rIndex] = true
    }
  }

  /* pawn forward moves */
  for (let i = 1; i < maxLength; i++) {
    if (y < 1 || y > 6) break
    let index: number = 0
    if (isWhite(piece)) {
      index = x + (y + i) * 8 // for the white pawn
    } else {
      index = x + (y - i) * 8 // for the black pawn
    }

    if (board[index] === '') {
      moveableSquares[index] = true
    } else {
      break
    }
  }

  return moveableSquares
}

/* CALCULATES PIECES ATTACKS */
export function getAttackedSquares(
  board: string[],
  piece: string,
  index: number
): boolean[] {
  const attackedSquares = new Array<boolean>(64)
  attackedSquares.fill(false)

  // getting coordinates
  const y = Math.trunc(index / 8)
  const x = index - y * 8

  // FUNCTIONS FOR CALCULATING THE ATTACKS OF THE ROOK, BISHOP AND QUEEN
  function orthoUp() {
    if (y < 7) {
      for (let i = y + 1; i <= 7; i++) {
        const index = x + i * 8
        if (board[index] === '') {
          attackedSquares[index] = true
        } else {
          attackedSquares[index] = true
          break
        }
      }
    }
  }

  function orthoRight() {
    if (x < 7) {
      for (let i = x + 1; i <= 7; i++) {
        const index = i + y * 8
        if (board[index] === '') {
          attackedSquares[index] = true
        } else {
          attackedSquares[index] = true
          break
        }
      }
    }
  }

  function orthoDown() {
    if (y > 0) {
      for (let i = y - 1; i >= 0; i--) {
        const index = x + i * 8
        if (board[index] === '') {
          attackedSquares[index] = true
        } else {
          attackedSquares[index] = true
          break
        }
      }
    }
  }

  function orthoLeft() {
    if (x > 0) {
      for (let i = x - 1; i >= 0; i--) {
        const index = i + y * 8
        if (board[index] === '') {
          attackedSquares[index] = true
        } else {
          attackedSquares[index] = true
          break
        }
      }
    }
  }

  // FUNCTIONS FOR CALCULATING THE ATTACKS OF THE BISHOP AND QUEEN
  function angularUpperRight() {
    const length = x === y ? 7 - x : 7 - Math.max(x, y)
    for (let i = 1; i <= length; i++) {
      const index = x + i + (y + i) * 8
      if (board[index] === '') {
        attackedSquares[index] = true
      } else {
        attackedSquares[index] = true
        break
      }
    }
  }

  function angularLowerRight() {
    const length = 7 - x < y ? 7 - x : y
    for (let i = 1; i <= length; i++) {
      const index = x + y * 8 - 7 * i
      if (board[index] === '') {
        attackedSquares[index] = true
      } else {
        attackedSquares[index] = true
        break
      }
    }
  }

  function angularLowerLeft() {
    const length = x === y ? x : Math.min(x, y)
    for (let i = 1; i <= length; i++) {
      const index = x - i + (y - i) * 8
      if (board[index] === '') {
        attackedSquares[index] = true
      } else {
        attackedSquares[index] = true
        break
      }
    }
  }

  function angularUpperLeft() {
    const length = 7 - y < x ? 7 - y : x
    for (let i = 1; i <= length; i++) {
      const index = x + y * 8 + 7 * i
      if (board[index] === '') {
        attackedSquares[index] = true
      } else {
        attackedSquares[index] = true
        break
      }
    }
  }

  if (piece.toUpperCase() === 'B') {
    // BISHOP, the upper right corner attack
    angularUpperRight()
    // BISHOP, the lower right corner attack
    angularLowerRight()
    // BISHOP, the lower left corner attack
    angularLowerLeft()
    // BISHOP, the upper left corner attack
    angularUpperLeft()
  } else if (piece.toUpperCase() === 'K') {
    // KING attack
    if (y < 7) attackedSquares[x + (y + 1) * 8] = true // top
    if (x < 7 && y < 7) attackedSquares[x + 1 + (y + 1) * 8] = true // upper right
    if (x < 7) attackedSquares[x + 1 + y * 8] = true // right
    if (x < 7 && y > 0) attackedSquares[x + 1 + (y - 1) * 8] = true // lower right
    if (y > 0) attackedSquares[x + (y - 1) * 8] = true // bottom
    if (x > 0 && y > 0) attackedSquares[x - 1 + (y - 1) * 8] = true // lower left
    if (x > 0) attackedSquares[x - 1 + y * 8] = true // left
    if (x > 0 && y < 7) attackedSquares[x - 1 + (y + 1) * 8] = true // upper left
  } else if (piece.toUpperCase() === 'N') {
    // KNIGHT attack
    if (x > 0 && y < 6) attackedSquares[x - 1 + (y + 2) * 8] = true // top left
    if (x < 7 && y < 6) attackedSquares[x + 1 + (y + 2) * 8] = true // top right
    if (x < 6 && y < 7) attackedSquares[x + 2 + (y + 1) * 8] = true // right top
    if (x < 6 && y > 0) attackedSquares[x + 2 + (y - 1) * 8] = true // right bottom
    if (x < 7 && y > 1) attackedSquares[x + 1 + (y - 2) * 8] = true // bottom right
    if (x > 0 && y > 1) attackedSquares[x - 1 + (y - 2) * 8] = true // bottom left
    if (x > 1 && y > 0) attackedSquares[x - 2 + (y - 1) * 8] = true // left bottom
    if (x > 1 && y < 7) attackedSquares[x - 2 + (y + 1) * 8] = true // left top
  } else if (piece.toUpperCase() === 'P') {
    // PAWN attack
    if (piece.toUpperCase() === piece) {
      // the left square for the attack of the white pawn
      if (x > 0 && y < 7) {
        attackedSquares[x - 1 + (y + 1) * 8] = true
      }
      // the right square for the attack of the white pawn
      if (x < 7 && y < 7) {
        attackedSquares[x + 1 + (y + 1) * 8] = true
      }
    } else {
      // the left square for the attack of the black pawn
      if (x > 0 && y > 0) {
        attackedSquares[x - 1 + (y - 1) * 8] = true
      }
      // the right square for the attack of the black pawn
      if (x < 7 && y > 0) {
        attackedSquares[x + 1 + (y - 1) * 8] = true
      }
    }

    // PAWN, taking on the pass
    // ...
  } else if (piece.toUpperCase() === 'Q') {
    // QUEEN, the up attack
    orthoUp()
    // QUEEN, the upper right corner attack
    angularUpperRight()
    // QUEEN, movement to the right
    orthoRight()
    // QUEEN, movement to the lower right corner
    angularLowerRight()
    // QUEEN, movement to the down
    orthoDown()
    // QUEEN, movement to the lower left corner
    angularLowerLeft()
    // QUEEN, movement to the left
    orthoLeft()
    // QUEEN, movement to the upper left corner
    angularUpperLeft()
  } else if (piece.toUpperCase() === 'R') {
    // ROOK, movement to the up
    orthoUp()
    // ROOK, movement to the right
    orthoRight()
    // ROOK, movement to the down
    orthoDown()
    // ROOK, movement to the left
    orthoLeft()
  }

  return attackedSquares
}

export function getHoverIndex(
  left: number,
  top: number,
  clientX: number,
  clientY: number
): number {
  if (left === 0 || top === 0) return 64
  if (
    clientX < left ||
    clientX > left + 800 ||
    clientY < top ||
    clientY > top + 800
  ) {
    return 64
  }

  let x = Math.ceil((clientX - left) / 100)
  if (x === 0) return 64
  let y = Math.ceil((clientY - top) / 100)
  if (y === 0) return 64

  y = Math.abs(-8 + y)

  return x - 1 + y * 8
}
