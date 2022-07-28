import { Board } from './Board'
import { Colors } from './Color'
import { Piece } from './pieces/Piece'

export class Square {
  // piece: string | null

  // constructor(piece: string | null) {
  //   this.piece = piece
  // }

  // setPiece(piece: Piece | null) {
  //   this.piece = piece
  // }

  // removePiece() {
  //   const removedPiece = this.piece
  //   this.piece = null
  //   return removedPiece
  // }

  // getPiece() {
  //   return this.piece
  // }

  // getMove(toSquare: Square) {
  //   return this.piece?.legalMoves.get(toSquare)
  // }

  readonly x: number
  readonly y: number
  readonly color: Colors
  piece: Piece | null
  board: Board
  available: boolean
  id: number

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    piece: Piece | null
  ) {
    this.x = x
    this.y = y
    this.color = color
    this.piece = piece
    this.board = board
    this.available = false
    this.id = x + y * 8
  }
}
