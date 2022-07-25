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
    // the left corner move of the white pawn
    if (x > 0 && y < 7) {
      const lIndex = x - 1 + (y + 1) * 8
      if (board[lIndex] !== '' && !isWhite(board[lIndex]))
        moveableSquares[lIndex] = true
    }
    // the right corner move of the white pawn
    if (x < 7 && y < 7) {
      const rIndex = x + 1 + (y + 1) * 8
      if (board[rIndex] !== '' && !isWhite(board[rIndex]))
        moveableSquares[rIndex] = true
    }
  } else {
    // the left corner move of the black pawn
    if (x > 0 && y > 0) {
      const lIndex = x - 1 + (y - 1) * 8
      if (board[lIndex] !== '' && isWhite(board[lIndex]))
        moveableSquares[lIndex] = true
    }
    // the right corner move of the black pawn
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

  /* functions for calculating the attacks of the rook, bishop and queen */
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

  /* functions for calculating the attacks of the bishop and queen */
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
    /* Bishop */
    angularUpperRight() // the upper right corner attack
    angularLowerRight() // the lower right corner attack
    angularLowerLeft() // the lower left corner attack
    angularUpperLeft() // the upper left corner attack
  } else if (piece.toUpperCase() === 'K') {
    /* King */
    if (y < 7) attackedSquares[x + (y + 1) * 8] = true // top
    if (x < 7 && y < 7) attackedSquares[x + 1 + (y + 1) * 8] = true // upper right
    if (x < 7) attackedSquares[x + 1 + y * 8] = true // right
    if (x < 7 && y > 0) attackedSquares[x + 1 + (y - 1) * 8] = true // lower right
    if (y > 0) attackedSquares[x + (y - 1) * 8] = true // bottom
    if (x > 0 && y > 0) attackedSquares[x - 1 + (y - 1) * 8] = true // lower left
    if (x > 0) attackedSquares[x - 1 + y * 8] = true // left
    if (x > 0 && y < 7) attackedSquares[x - 1 + (y + 1) * 8] = true // upper left
  } else if (piece.toUpperCase() === 'N') {
    /* Knight */
    if (x > 0 && y < 6) attackedSquares[x - 1 + (y + 2) * 8] = true // top left
    if (x < 7 && y < 6) attackedSquares[x + 1 + (y + 2) * 8] = true // top right
    if (x < 6 && y < 7) attackedSquares[x + 2 + (y + 1) * 8] = true // right top
    if (x < 6 && y > 0) attackedSquares[x + 2 + (y - 1) * 8] = true // right bottom
    if (x < 7 && y > 1) attackedSquares[x + 1 + (y - 2) * 8] = true // bottom right
    if (x > 0 && y > 1) attackedSquares[x - 1 + (y - 2) * 8] = true // bottom left
    if (x > 1 && y > 0) attackedSquares[x - 2 + (y - 1) * 8] = true // left bottom
    if (x > 1 && y < 7) attackedSquares[x - 2 + (y + 1) * 8] = true // left top
  } else if (piece.toUpperCase() === 'P') {
    /* Pawn */
    if (piece.toUpperCase() === piece) {
      // the left corner attack of the white pawn
      if (x > 0 && y < 7) attackedSquares[x - 1 + (y + 1) * 8] = true
      // the right corner attack of the white pawn
      if (x < 7 && y < 7) attackedSquares[x + 1 + (y + 1) * 8] = true
    } else {
      // the left corner attack of the black pawn
      if (x > 0 && y > 0) attackedSquares[x - 1 + (y - 1) * 8] = true
      // the right corner attack of the black pawn
      if (x < 7 && y > 0) attackedSquares[x + 1 + (y - 1) * 8] = true
    }

    // pawn, taking on the pass
    // ...
  } else if (piece.toUpperCase() === 'Q') {
    /* Queen */
    orthoUp() // the up attack
    angularUpperRight() // the upper right corner attack
    orthoRight() // the right attack
    angularLowerRight() // the lower right corner attack
    orthoDown() // the down attack
    angularLowerLeft() // the lower left corner attack
    orthoLeft() // the left attack
    angularUpperLeft() // the upper left corner attack
  } else if (piece.toUpperCase() === 'R') {
    /* Rook */
    orthoUp() // the up attack
    orthoRight() // the right attack
    orthoDown() // the down attack
    orthoLeft() // the left attack
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

export function getCoordFromIndex(index: number): number[] {
  const y = Math.trunc(index / 8)
  const x = index - y * 8
  return [x, y]
}

export function getSquareIndexesInBetween(
  index1: number,
  index2: number
): number[] {
  const array1 = getCoordFromIndex(index1)
  const array2 = getCoordFromIndex(index2)
  // console.warn(array1, array2)

  const outcome: number[] = []

  if (array1[0] === array2[0]) {
    // vertical
    const length = Math.abs(array1[1] - array2[1]) - 1
    const lowBound = Math.min(array1[1], array2[1]) + 1
    for (let i = lowBound; i < lowBound + length; i++) {
      outcome.push(Math.min(array1[0], array2[0]) + i * 8)
    }
  } else if (array1[1] === array2[1]) {
    // horizontal
    const length = Math.abs(array1[0] - array2[0]) - 1
    const lowBound = Math.min(array1[0], array2[0]) + 1
    for (let i = lowBound; i < lowBound + length; i++) {
      outcome.push(i + Math.min(array1[1], array2[1]) * 8)
    }
  } else {
    // diagonal
    const x = Math.min(array1[0], array2[0])
    const y = x === array1[0] ? array1[1] : array2[1]
    const z = x === array1[0] ? array2[1] : array1[1]
    const length = Math.abs(array1[0] - array2[0]) - 1

    if (y < z) {
      // from lower left corner to upper right corner
      for (let i = 1; i <= length; i++) outcome.push(x + i + (y + i) * 8)
    } else {
      // from upper left corner to lower right corner
      for (let i = 1; i <= length; i++) outcome.push(x + y * 8 - 7 * i)
    }
  }

  return outcome
}
