import { defineStore } from 'pinia'

function fromPosToIndex(position: Array<number>): number {
  const [x, y] = position
  return x + y * 8
}

export const useStore = defineStore('board', {
  state: () => {
    return {
      pieces: Array<string>(64),
      side: 'white',
      indexActiveSquare: 64,
      squaresForMove: Array<boolean>(64),
      lmbIsPressed: false,
      isReactivated: false,
      isMoved: false,

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
      const blackStr: string = 'rnbqkbnrpppppppp'
      const whiteStr: string = 'RNBQKBNRPPPPPPPP'
      for (let i = 0; i < 16; i++) this.pieces[i] = blackStr[i]
      for (let i = 63; i > 47; i--) this.pieces[i] = whiteStr[63 - i]
    },

    activateSquare(index: number): void {
      this.indexActiveSquare = index
    },

    deactivateSquare(): void {
      this.indexActiveSquare = 64
    },

    setPieceOnHover(piece: string): void {
      if (this.hoverSquareIndex === 64) {
      } else {
        this.pieces[this.hoverSquareIndex] = piece
        this.pieces[this.dragIndex] = ''
      }
    },

    delDraggedPiece(): void {
      if (this.hoverSquareIndex === 64) return
      this.pieces[this.dragIndex] = ''
    },

    toggleSide(): void {
      this.side = this.side === 'white' ? 'black' : 'white'
    },

    setMoveableSquares(moveableSquares: Array<boolean>): void {
      for (let i = 0; i < 64; i++) {
        if (moveableSquares) {
          this.squaresForMove[i] = moveableSquares[i]
        } else {
          this.squaresForMove[i] = false
        }
      }
    }
  },

  getters: {
    getPieceFromPos:
      state =>
      (x: number, y: number): string => {
        const index = fromPosToIndex([x, y])
        return String(state.pieces[index])
      },

    getDraggedPiece: state => (): string => {
      return String(state.pieces[state.dragIndex])
    },

    isAct: state => (): boolean => state.indexActiveSquare === 64,

    isActive:
      state =>
      (x: number, y: number): boolean => {
        const index = fromPosToIndex([x, y])
        return index === state.indexActiveSquare
      },

    // getActiveIndex: state => (): number => {
    //   const index = state.active.indexOf(true)
    //   return index
    // },

    isMoveable:
      state =>
      (x: number, y: number): boolean => {
        const index = fromPosToIndex([x, y])
        return Boolean(state.squaresForMove[index])
      }
  }
})
