import { Colors } from '../Constants'
import { Piece } from './Piece'

export class King extends Piece {
  iconUrl: string

  constructor(color: Colors) {
    super(color)
    if (this.color === 'white') {
      this.iconUrl = 'url(/src/assets/pieces/wK.svg)'
    } else {
      this.iconUrl = 'url(/src/assets/pieces/bK.svg)'
    }
  }
}
