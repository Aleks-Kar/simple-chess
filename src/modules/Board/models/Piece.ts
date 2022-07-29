import { Colors } from './Constants'

export class Piece {
  color: Colors = Colors.WHITE

  constructor(color: Colors) {
    this.color = color
  }

  // setColor(color: string): void {
  //   if (color === 'white') {
  //     this.color = Colors.WHITE
  //   } else {
  //     this.color = Colors.BLACK
  //   }
  // }
}
