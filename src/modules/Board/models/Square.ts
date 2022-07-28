import { Piece } from './Piece'

export class Square {
  piece: string | null

  constructor(piece: string | null) {
    this.piece = piece
  }

  // setPiece(piece: Piece | null) {
  //   this.piece = piece
  // }

  // removePiece() {
  //   const removedPiece = this.piece
  //   this.piece = null
  //   return removedPiece
  // }

  getPiece() {
    return this.piece
  }

  // getMove(toSquare: Square) {
  //   return this.piece?.legalMoves.get(toSquare)
  // }
}
