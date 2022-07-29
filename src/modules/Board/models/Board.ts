import { Square } from './Square'

export class Board {
  squares: Square[][] = []
  turn: string = 'white'
  lastMove: number[] = [64, 64]
  activeIndex: number = 64

  private getCoordinatesFromIndex(index: number): number[] {
    const y = Math.trunc(index / 8)
    const x = index - y * 8
    return [x, y]
  }

  initArrangement() {
    const whitePieces: string = 'RNBQKBNRPPPPPPPP'
    const blackPieces: string = 'pppppppprnbqkbnr'

    for (let y = 0; y < 8; y++) {
      if (y >= 0 && y <= 1) {
        const row: Square[] = []
        for (let x = 0; x < 8; x++) {
          row.push(new Square(x, y, whitePieces[x + y * 8]))
        }
        this.squares.push(row)
      } else if (y >= 2 && y <= 5) {
        const row: Square[] = []
        for (let x = 0; x < 8; x++) row.push(new Square(x, y, null))
        this.squares.push(row)
      } else {
        const row: Square[] = []
        for (let x = 0; x < 8; x++) {
          row.push(new Square(x, y, blackPieces[x + y * 8 - 48]))
        }
        this.squares.push(row)
      }
    }
  }

  setActiveSquare(index: number): void {
    const coordinates = this.getCoordinatesFromIndex(index)
    const square = this.squares[coordinates[0]][coordinates[1]]
    square.active = true
  }

  setPiece(index: number, piece: string): void {
    const coordinates = this.getCoordinatesFromIndex(index)
    const square = this.squares[coordinates[1]][coordinates[0]]
    square.piece = piece
  }

  setLastMove(index1: number, index2: number) {
    // sets previous set of square to false
    if (this.lastMove[0] >= 0 && this.lastMove[0] < 64) {
      const coordinates1 = this.getCoordinatesFromIndex(this.lastMove[0])
      this.squares[coordinates1[1]][coordinates1[0]].last = false
      const coordinates2 = this.getCoordinatesFromIndex(this.lastMove[1])
      this.squares[coordinates2[1]][coordinates2[0]].last = false
    }

    // sets current set of square to true
    const coordinates3 = this.getCoordinatesFromIndex(index1)
    this.squares[coordinates3[1]][coordinates3[0]].last = true
    this.lastMove[0] = index1
    const coordinates4 = this.getCoordinatesFromIndex(index2)
    this.squares[coordinates4[1]][coordinates4[0]].last = true
    this.lastMove[1] = index2
  }

  setSafeSquare(index: number): void {
    const coordinates = this.getCoordinatesFromIndex(index)
    const square = this.squares[coordinates[1]][coordinates[0]]
    square.safe = true
  }

  // isActive() {
  //   const index = this.x * this.y
  //   return index === board.activeIndex
  // }
}
