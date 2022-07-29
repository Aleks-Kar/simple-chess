import { Piece } from './Piece'
import { Color } from './PieceColors'

export class Rook extends Piece {
  iconUrl: string

  constructor(color: Color) {
    super(color)
    if (this.color === 'white') {
      this.iconUrl = 'url(/src/assets/pieces/wR.svg)'
    } else {
      this.iconUrl = 'url(/src/assets/pieces/bR.svg)'
    }
  }
}
