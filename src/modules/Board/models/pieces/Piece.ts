import { Color } from './PieceColors'

export abstract class Piece {
  // color: Colors = Colors.WHITE
  color: Color

  constructor(color: Color) {
    this.color = color
  }

  print(): void {
    console.warn('message from a parent class')
  }
  // setColor(color: string): void {
  //   if (color === 'white') {
  //     this.color = Colors.WHITE
  //   } else {
  //     this.color = Colors.BLACK
  //   }
  // }
}
