import { Colors } from '../Constants'
import { Piece } from '../Piece'

export class Rook extends Piece {
  iconUrl: string

  constructor(color: Colors) {
    super(color)
    if (this.color === 'white') {
      this.iconUrl = 'url(/src/assets/pieces/wR.svg)'
    } else {
      this.iconUrl = 'url(/src/assets/pieces/bR.svg)'
    }
  }
}
