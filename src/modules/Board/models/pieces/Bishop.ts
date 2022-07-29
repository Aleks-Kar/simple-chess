import { Colors } from '../Constants'
import { Piece } from '../Piece'

export class Bishop extends Piece {
  iconUrl: string

  constructor(color: Colors) {
    super(color)
    if (this.color === 'white') {
      this.iconUrl = 'url(/src/assets/pieces/wB.svg)'
    } else {
      this.iconUrl = 'url(/src/assets/pieces/bB.svg)'
    }
  }
}
