import { Board } from './Board'
import { Colors } from './Color'
import { Piece } from './pieces/Piece'

export class Square {
  readonly x: number
  readonly y: number
  readonly color: Colors
  piece: Piece | null
  available: boolean
  id: number

  constructor(
    x: number,
    y: number,
    color: Colors,
    piece: Piece | null
  ) {
    this.x = x
    this.y = y
    this.color = color
    this.piece = piece
    this.available = false
    this.id = x + y * 8
  }
}
