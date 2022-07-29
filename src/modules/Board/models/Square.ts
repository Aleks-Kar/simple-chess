// import { Board } from './Board'
import { Piece } from './Piece'
import { Bishop } from './pieces/Bishop'
import { Rook } from './pieces/Rook'

export class Square {
  readonly x: number
  readonly y: number
  piece: Rook | Bishop | null
  index: string

  available: boolean = true
  last: boolean = false
  active: boolean = false
  safe: boolean = true

  constructor(x: number, y: number, piece: Rook | Bishop | null) {
    this.x = x
    this.y = y
    this.piece = piece
    this.index = String(x + y * 8)
  }

  isWhiteSquare() {
    return (this.x + this.y) % 2 !== 0
  }

  isAvailable() {
    return this.available
  }

  isLast() {
    return this.last
  }

  isActive() {
    return this.active
  }

  isSafe() {
    return this.safe
  }
}
