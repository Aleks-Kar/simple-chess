function isWhite(piece: string): boolean {
  return piece === piece.toUpperCase()
}

export function getMoveableSquares(
  pieces: Array<string>,
  piece: string,
  x: number,
  y: number
): Array<boolean> {
  const moveableSquares = new Array<boolean>(64)
  moveableSquares.fill(false)

  if (piece.toUpperCase() === 'P') {
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
  } else if (piece.toUpperCase() === 'R') {
    // ROOK, movement to the up
    for (let i = y - 1; i >= 0; i--) {
      if (pieces[x + i * 8] === '') {
        moveableSquares[x + i * 8] = true
      } else if (isWhite(piece) !== isWhite(pieces[x + i * 8])) {
        moveableSquares[x + i * 8] = true
        break
      } else {
        break
      }
    }




    // ROOK, movement to the left
    for (let i = x - 1; i >= 0; i--) {
      if (pieces[i + y * 8] === '') {
        moveableSquares[i + y * 8] = true
      } else if (isWhite(piece) !== isWhite(pieces[i + y * 8])) {
        moveableSquares[i + y * 8] = true
        break
      } else {
        break
      }
    }

    // ROOK, movement to the right
    for (let i = x + 1; i <= 7; i++) {
      if (pieces[i + y * 8] === '') {
        moveableSquares[i + y * 8] = true
      } else if (isWhite(piece) !== isWhite(pieces[i + y * 8])) {
        moveableSquares[i + y * 8] = true
        break
      } else {
        break
      }
    }



    // ROOK, movement to the down
    for (let i = y + 1; i <= 7; i++) {
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
