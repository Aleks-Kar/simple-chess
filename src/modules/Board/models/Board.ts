import { Colors } from './Color'
import { Square } from './Square'

export class Board {
  // squares: string[] = []
  squares: Square[][] = []

  public initSquares() {
    // const whitePieces: string = 'RNBQKBNRPPPPPPPP'
    // const blackPieces: string = 'pppppppprnbqkbnr'
    // for (let i = 0; i < 16; i++) this.squares[i] = whitePieces[i]
    // for (let i = 16; i < 48; i++) this.squares[i] = ''
    // for (let i = 48; i < 64; i++) this.squares[i] = blackPieces[i - 48]

    for (let i = 0; i < 8; i++) {
      const row: Square[] = []
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Square(this, j, i, Colors.BLACK, null)) // black square
        } else {
          row.push(new Square(this, j, i, Colors.WHITE, null)) // white square
        }
      }

      this.squares.push(row)
    }
  }
}
