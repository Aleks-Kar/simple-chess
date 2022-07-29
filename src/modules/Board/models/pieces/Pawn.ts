import { Colors } from '../Constants'
import { Piece } from './Piece'

export class Pawn extends Piece {
  iconUrl: string

  constructor(color: Colors) {
    super(color)
    if (this.color === 'white') {
      this.iconUrl = 'url(/src/assets/pieces/wP.svg)'
    } else {
      this.iconUrl = 'url(/src/assets/pieces/bP.svg)'
    }
  }
}
