import { Colors } from './Color'
import { Square } from './Square'

export class Board {
  squares: Square[][] = []
  lastMove: number[] = [64, 64]
  activeIndex: number = 64

  initSquares() {
    // const whitePieces: string = 'RNBQKBNRPPPPPPPP'
    // const blackPieces: string = 'pppppppprnbqkbnr'
    // for (let i = 0; i < 16; i++) this.squares[i] = whitePieces[i]
    // for (let i = 16; i < 48; i++) this.squares[i] = ''
    // for (let i = 48; i < 64; i++) this.squares[i] = blackPieces[i - 48]

    for (let y = 0; y < 8; y++) {
      const row: Square[] = []
      for (let x = 0; x < 8; x++) {
        row.push(new Square(x, y, null))
      }

      this.squares.push(row)
    }
  }

  setSquare(index: string): void {}

  // isActive() {
  //   const index = this.x * this.y
  //   return index === board.activeIndex
  // }
}
