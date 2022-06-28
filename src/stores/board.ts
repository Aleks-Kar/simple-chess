import { defineStore, storeToRefs } from 'pinia'

function fromPosToIndex(position: Array<number>): number {
  const [x, y] = position
  return x + y * 8
}

export const useStore = defineStore('board', {
  state: () => {
    return {
      pieces: Array<string>(64),
      set: 'dubrovny',
      underWhiteAttack: Array<boolean>(64),
      underBlackAttack: Array<boolean>(64),
      turn: 'white',
      indexActiveSquare: 64,
      lastMoves: Array<number>(2),
      squaresForMove: Array<boolean>(64),
      lmbIsPressed: false,
      isReactivated: false,
      pieceHadBeenMoved: false,

      cx: 0,
      cy: 0,
      draggedItem: document.body.querySelector('.board'),
      dragIndex: 64,
      hoverSquareIndex: 64,
      boardLeft: 0,
      boardTop: 0
    }
  },

  actions: {
    // setting up pieces
    init(): void {
      this.pieces.fill('')
      this.underWhiteAttack.fill(false)
      this.underBlackAttack.fill(false)
      this.squaresForMove.fill(false)
      const blackStr: string = 'rnbqkbnrpppppppp'
      const whiteStr: string = 'RNBKQBNRPPPPPPPP'
      for (let i = 0; i < 16; i++) this.pieces[i] = blackStr[i]
      for (let i = 63; i > 47; i--) this.pieces[i] = whiteStr[63 - i]
    },

    // activateSquare(index: number): void {
    //   this.indexActiveSquare = index
    // },

    // deactivateSquare(): void {
    //   this.indexActiveSquare = 64
    // },

    setPieceOnHover(piece: string): void {
      if (this.hoverSquareIndex === 64) {
      } else {
        this.pieces[this.hoverSquareIndex] = piece
        this.pieces[this.dragIndex] = ''
      }
    },

    placePieceOnHover(): void {
      if (
        this.hoverSquareIndex === 64 ||
        !this.squaresForMove[this.dragIndex]
      ) {
        // this.draggedItem.style.left = 0
        // this.draggedItem.style.top = 0
        // this.draggedItem.style.cursor = 'pointer'
        // console.warn('1')
      } else if (this.hoverSquareIndex === this.dragIndex) {
        this.draggedItem.style.left = 0
        this.draggedItem.style.top = 0
        this.draggedItem.style.cursor = 'pointer'
        // console.warn('2')
      } else {
        // console.warn('3')

        this.pieces[this.hoverSquareIndex] = String(this.pieces[this.dragIndex])
        this.pieces[this.dragIndex] = ''

        if (this.turn === 'white') {
          this.turn = 'black'
        } else {
          this.turn = 'white'
        }
      }

      //clearing
      this.draggedItem = document.body.querySelector('.board')
      this.squaresForMove.fill(false)
      this.boardLeft = 0
      this.boardTop = 0
      this.hoverSquareIndex = 64
    },

    delDraggedPiece(): void {
      if (this.hoverSquareIndex === 64) return
      this.pieces[this.dragIndex] = ''
    },

    toggleSide(): void {
      this.turn = this.turn === 'white' ? 'black' : 'white'
    },

    setMoveableSquares(moveableSquares: Array<boolean>): void {
      this.squaresForMove = [...moveableSquares]
    },

    setWhiteAttackedSquares(attackedSquares: Array<boolean>): void {
      for (let i = 0; i < 64; i++) {
        if (attackedSquares[i]) {
          if (this.underWhiteAttack[i]) {
            continue
          } else {
            this.underWhiteAttack[i] = attackedSquares[i]
          }
        }
      }
    },

    setBlackAttackedSquares(attackedSquares: Array<boolean>): void {
      for (let i = 0; i < 64; i++) {
        if (attackedSquares[i]) {
          if (this.underBlackAttack[i]) {
            continue
          } else {
            this.underBlackAttack[i] = attackedSquares[i]
          }
        }
      }
    },

    clearMoveableSquares(): void {
      this.squaresForMove.fill(false)
    }
  },

  getters: {
    getPiece:
      state =>
      (index: number): string => {
        // return String(state.pieces[index])
        return state.pieces[index]
      },

    getDraggedPiece: state => (): string => {
      return String(state.pieces[state.dragIndex])
    },

    getPieceColor:
      state =>
      (index: number): string => {
        if (state.pieces[index] === String(state.pieces[index]).toUpperCase()) {
          return 'white'
        } else {
          return 'black'
        }
      },

    // isWhiteActive:
    //   state =>
    //   (index: number): boolean => {
    //     if (
    //       state.indexActiveSquares[0] === index ||
    //       state.indexActiveSquares[1] === index
    //     ) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },

    // isBlackActive:
    //   state =>
    //   (index: number): boolean => {
    //     if (
    //       state.indexActiveSquares[2] === index ||
    //       state.indexActiveSquares[3] === index
    //     ) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },

    // getActiveIndex: state => (): number => {
    //   const index = state.active.indexOf(true)
    //   return index
    // },

    isWhiteSquare:
      state =>
      (index: number): boolean => {
        const y = Math.trunc(index / 8)
        const x = index - y * 8
        return (x + y) % 2 === 0
      }

    // isMoveable:
    //   state =>
    //   (x: number, y: number): boolean => {
    //     const index = fromPosToIndex([x, y])
    //     return Boolean(state.squaresForMove[index])
    //   }
  }
})
