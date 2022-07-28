import { Board } from './Board'
import { Colors } from './Color'
import { Piece } from './pieces/Piece'

export class Square {
  readonly x: number
  readonly y: number
  // readonly color: Colors
  piece: Piece | null
  available: boolean = true
  id: string
  active: boolean = false

  constructor(x: number, y: number, piece: Piece | null) {
    this.x = x
    this.y = y
    this.piece = piece
    this.id = String(x + y * 8)
  }

  isWhiteSquare() {
    return (this.x + this.y) % 2 !== 0
  }

  isActive() {
    return this.active
  }
}
