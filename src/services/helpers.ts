function isWhite(piece: string): boolean {
  return piece === piece.toUpperCase()
}

export function getMoveableSquares(
  pieces: Array<string>,
  piece: string,
  index: number
): Array<boolean> {
  const moveableSquares = new Array<boolean>(64)
  moveableSquares.fill(false)

  // getting coordinates
  const y = Math.trunc(index / 8)
  const x = index - y * 8

  // FUNCTIONS FOR CALCULATING THE MOVEMENT OF THE ROOK, BISHOP AND QUEEN
  function orthoUp() {
    for (let i = y - 1; i >= 0; i--) {
      if (y < 1) break
      if (pieces[x + i * 8] === '') {
        moveableSquares[x + i * 8] = true
      } else if (isWhite(piece) !== isWhite(pieces[x + i * 8])) {
        moveableSquares[x + i * 8] = true
        break
      } else {
        break
      }
    }
  }

  function orthoRight() {
    for (let i = x + 1; i <= 7; i++) {
      if (x > 6) break
      if (pieces[i + y * 8] === '') {
        moveableSquares[i + y * 8] = true
      } else if (isWhite(piece) !== isWhite(pieces[i + y * 8])) {
        moveableSquares[i + y * 8] = true
        break
      } else {
        break
      }
    }
  }

  function orthoDown() {
    for (let i = y + 1; i <= 7; i++) {
      if (y > 6) break
      if (pieces[x + i * 8] === '') {
        moveableSquares[x + i * 8] = true
      } else if (isWhite(piece) !== isWhite(pieces[x + i * 8])) {
        moveableSquares[x + i * 8] = true
        break
      } else {
        break
      }
    }
  }

  function orthoLeft() {
    for (let i = x - 1; i >= 0; i--) {
      if (x < 1) break
      if (pieces[i + y * 8] === '') {
        moveableSquares[i + y * 8] = true
      } else if (isWhite(piece) !== isWhite(pieces[i + y * 8])) {
        moveableSquares[i + y * 8] = true
        break
      } else {
        break
      }
    }
  }

  // FUNCTIONS FOR CALCULATING THE MOVEMENT OF THE BISHOP AND QUEEN
  function angularUpperRight() {
    const length = 7 - x < y ? 7 - x : y
    for (let i = 1; i <= length; i++) {
      const index = x + y * 8 - 7 * i
      if (pieces[index] === '') {
        moveableSquares[index] = true
      } else if (isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
        break
      } else {
        break
      }
    }
  }

  function angularLowerRight() {
    const length = x === y ? 7 - x : 7 - Math.max(x, y)
    for (let i = 1; i <= length; i++) {
      const index = x + i + (y + i) * 8
      if (pieces[index] === '') {
        moveableSquares[index] = true
      } else if (isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
        break
      } else {
        break
      }
    }
  }

  function angularLowerLeft() {
    const length = 7 - y < x ? 7 - y : x
    for (let i = 1; i <= length; i++) {
      const index = x + y * 8 + 7 * i
      if (pieces[index] === '') {
        moveableSquares[index] = true
      } else if (isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
        break
      } else {
        break
      }
    }
  }

  function angularUpperLeft() {
    const length = x === y ? x : Math.min(x, y)
    for (let i = 1; i <= length; i++) {
      const index = x - i + (y - i) * 8
      if (pieces[index] === '') {
        moveableSquares[index] = true
      } else if (isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
        break
      } else {
        break
      }
    }
  }

  if (piece.toUpperCase() === 'B') {
    // BISHOP, movement to the upper right corner
    angularUpperRight()
    // BISHOP, movement to the lower right corner
    angularLowerRight()
    // BISHOP, movement to the lower left corner
    angularLowerLeft()
    // BISHOP, movement to the upper left corner
    angularUpperLeft()
  } else if (piece.toUpperCase() === 'K') {
    // KING movement
    if (y > 0) {
      const index = x + (y - 1) * 8 // top
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x < 7 && y > 0) {
      const index = x + 1 + (y - 1) * 8 // upper right
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x < 7) {
      const index = x + 1 + y * 8 // right
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x < 7 && y < 7) {
      const index = x + 1 + (y + 1) * 8 // lower right
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (y < 7) {
      const index = x + (y + 1) * 8 // bottom
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x > 0 && y < 7) {
      const index = x - 1 + (y + 1) * 8 // lower left
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x > 0) {
      const index = x - 1 + y * 8 // left
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x > 0 && y > 0) {
      const index = x - 1 + (y - 1) * 8 // upper left
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        console.warn('!')
        moveableSquares[index] = true
      }
    }
  } else if (piece.toUpperCase() === 'N') {
    // KNIGHT movement
    if (x > 0 && y > 1) {
      const index = x - 1 + (y - 2) * 8 // top left
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x < 7 && y > 1) {
      const index = x + 1 + (y - 2) * 8 // top right
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x < 6 && y > 0) {
      const index = x + 2 + (y - 1) * 8 // right top
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x < 6 && y < 7) {
      const index = x + 2 + (y + 1) * 8 // right bottom
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x < 7 && y < 6) {
      const index = x + 1 + (y + 2) * 8 // bottom right
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x > 0 && y < 6) {
      const index = x - 1 + (y + 2) * 8 // bottom left
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x > 1 && y < 7) {
      const index = x - 2 + (y + 1) * 8 // left bottom
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
    if (x > 1 && y > 0) {
      const index = x - 2 + (y - 1) * 8 // left top
      if (pieces[index] === '' || isWhite(piece) !== isWhite(pieces[index])) {
        moveableSquares[index] = true
      }
    }
  } else if (piece.toUpperCase() === 'P') {
    // PAWN, movement forward
    // checking if pawn in an initial position
    let maxLength: number = 0
    let index: number = 0
    if (isWhite(piece)) {
      maxLength = y === 6 ? 3 : 2 // for the white pawn
    } else {
      maxLength = y === 1 ? 3 : 2 // for the black pawn
    }

    for (let i = 1; i < maxLength; i++) {
      if (y < 1 || y > 6) break
      let index: number = 0
      if (isWhite(piece)) {
        index = x + (y - i) * 8 // for the white pawn
      } else {
        index = x + (y + i) * 8 // for the black pawn
      }

      if (pieces[index] === '') {
        moveableSquares[index] = true
      } else {
        break
      }
    }

    // PAWN, attack movement
    if (piece.toUpperCase() === piece) {
      // the left square for the attack of the white pawn
      if (x > 0 && y > 0) {
        const lSquareIndex: number = x - 1 + (y - 1) * 8
        if (!isWhite(pieces[lSquareIndex]) && pieces[lSquareIndex] !== '')
          moveableSquares[lSquareIndex] = true
      }
      // the right square for the attack of the white pawn
      if (x < 7 && y > 0) {
        const rSquareIndex: number = x + 1 + (y - 1) * 8
        if (!isWhite(pieces[rSquareIndex]) && pieces[rSquareIndex] !== '')
          moveableSquares[rSquareIndex] = true
      }
    } else {
      // the left square for the attack of the black pawn
      if (x > 0 && y < 7) {
        const lSquareIndex: number = x - 1 + (y + 1) * 8
        if (isWhite(pieces[lSquareIndex]) && pieces[lSquareIndex] !== '')
          moveableSquares[lSquareIndex] = true
      }
      // the right square for the attack of the black pawn
      if (x < 7 && y < 7) {
        const rSquareIndex: number = x + 1 + (y + 1) * 8
        if (isWhite(pieces[rSquareIndex]) && pieces[rSquareIndex] !== '')
          moveableSquares[rSquareIndex] = true
      }
    }

    // PAWN, taking on the pass
    // ...
  } else if (piece.toUpperCase() === 'Q') {
    // QUEEN, movement to the up
    orthoUp()
    // QUEEN, movement to the upper right corner
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

  return moveableSquares
}

export function getHoverSquareIndex(
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

  return x - 1 + (y - 1) * 8
}
