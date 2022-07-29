import { Colors } from '../Constants'
import { Piece } from './Piece'

export class Queen extends Piece {
  iconUrl: string

  constructor(color: Colors) {
    super(color)
    if (this.color === 'white') {
      this.iconUrl = 'url(/src/assets/pieces/wQ.svg)'
    } else {
      this.iconUrl = 'url(/src/assets/pieces/bQ.svg)'
    }
  }
}
