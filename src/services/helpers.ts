export function getMoveableSquares(
  pieces: Array<string>,
  piece: string,
  x: number,
  y: number
): Array<boolean> {
  const moveableSquares = new Array<boolean>(64)
  moveableSquares.fill(false)

  if (piece.toLowerCase() === 'p') {
    // PAWN, direct movement
    // checking if pawn in an initial position
    let maxLength: number = 0
    if (piece.toUpperCase() === piece) {
      maxLength = y === 6 ? 3 : 2 // for white pawn
    } else {
      maxLength = y === 1 ? 3 : 2 // for black pawn
    }
    for (let i = 1; i < maxLength; i++) {
      let index: number = 0
      if (piece.toUpperCase() === piece) {
        index = x + (y - i) * 8 // for white pawn
      } else {
        index = x + (y + i) * 8 // for black pawn
      }

      if (pieces[index] === '') {
        moveableSquares[index] = true
      } else {
        break
      }
    }

    // PAWN, attack movement
    if (piece.toUpperCase() === piece) {
      // left forward square
      if (x > 0 && y > 0) {
        const lfSquareIndex: number = x - 1 + (y - 1) * 8
        if (pieces[lfSquareIndex] === pieces[lfSquareIndex].toLowerCase()) {
          
        }
      }
    } else {
    }
  }
  return moveableSquares
}
