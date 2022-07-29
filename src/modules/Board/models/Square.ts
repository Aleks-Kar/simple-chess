// import { Board } from './Board'
import { Piece } from './pieces/Piece'
import { Bishop } from './pieces/Bishop'
import { Pawn } from './pieces/Pawn'
import { Knight } from './pieces/Knight'
import { Rook } from './pieces/Rook'

export class Square {
  readonly x: number
  readonly y: number
  piece: Piece | null
  index: string

  available: boolean = true
  last: boolean 
  active: boolean = false
  safe: boolean = true

  constructor(x: number, y: number, piece: Piece | null = null) {
    this.x = x
    this.y = y
    this.piece = piece
    this.index = String(x + y * 8)
    this.last = false
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
