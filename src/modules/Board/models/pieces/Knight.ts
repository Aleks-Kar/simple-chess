import { Colors } from '../Constants'
import { Piece } from './Piece'

export class Knight extends Piece {
  iconUrl: string

  constructor(color: Colors) {
    super(color)
    if (this.color === 'white') {
      this.iconUrl = 'url(/src/assets/pieces/wN.svg)'
    } else {
      this.iconUrl = 'url(/src/assets/pieces/bN.svg)'
    }
  }
}