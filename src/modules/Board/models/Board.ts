export class Board {
  squares: string[] = []

  init() {
    const whitePieces: string = 'RNBQKBNRPPPPPPPP'
    const blackPieces: string = 'pppppppprnbqkbnr'
    for (let i = 0; i < 16; i++) this.squares[i] = whitePieces[i]
    for (let i = 16; i < 48; i++) this.squares[i] = ''
    for (let i = 48; i < 64; i++) this.squares[i] = blackPieces[i - 48]
  }
}
