import { Colors } from './Color'
import { Square } from './Square'

export class Board {
  squares: Square[][] = []
  lastMove: number[] = [64, 64]
  activeIndex: number = 64

  private getCoordinatesFromIndex(index: number): number[] {
    const y = Math.trunc(index / 8)
    const x = index - y * 8
    console.warn([x, y])
    return [x, y]
  }

  initSquares() {
    const whitePieces: string = 'RNBQKBNRPPPPPPPP'
    const blackPieces: string = 'pppppppprnbqkbnr'
    // for (let i = 0; i < 16; i++) this.squares[i] = whitePieces[i]
    // for (let i = 16; i < 48; i++) this.squares[i] = ''
    // for (let i = 48; i < 64; i++) this.squares[i] = blackPieces[i - 48]

    // for (let y = 0; y < 8; y++) {
    //   const row: Square[] = []
    //   for (let x = 0; x < 8; x++) row.push(new Square(x, y, null))
    //   this.squares.push(row)
    // }

    for (let y = 0; y < 2; y++) {
      const row: Square[] = []
      for (let x = 0; x < 8; x++) {
        row.push(new Square(x, y, whitePieces[x + y * 8]))
      }
      this.squares.push(row)
    }

    for (let y = 2; y < 6; y++) {
      const row: Square[] = []
      for (let x = 0; x < 8; x++) {
        row.push(new Square(x, y, null))
      }
      this.squares.push(row)
    }

    for (let y = 6; y < 8; y++) {
      const row: Square[] = []
      for (let x = 0; x < 8; x++) {
        row.push(new Square(x, y, blackPieces[x + y * 8 - 48]))
      }
      this.squares.push(row)
    }
  }

  setSquare(index: number, piece: string): void {
    const coordinates = this.getCoordinatesFromIndex(index)
    const square = this.squares[coordinates[0]][coordinates[1]]
    square.piece = piece
  }

  // isActive() {
  //   const index = this.x * this.y
  //   return index === board.activeIndex
  // }
}
