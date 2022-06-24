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
      indexActiveSquares: Array<number>(4),
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
      const blackStr: string = 'rnbqkbnrpppppppp'
      const whiteStr: string = 'RNBQKBNRPPPPPPPP'
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
      if (this.hoverSquareIndex === 64) {
      } else if (this.hoverSquareIndex === this.dragIndex) {
        this.draggedItem.style.left = 0
        this.draggedItem.style.top = 0
        this.draggedItem.style.cursor = 'pointer'
        // this.indexActiveSquare = 64
        console.warn('1')
      } else {
        console.warn('2')

        // this.setPieceOnHover(this.getDraggedPiece())
        this.pieces[this.hoverSquareIndex] = String(this.pieces[this.dragIndex])
        this.pieces[this.dragIndex] = ''

        if (this.side === 'white') {
          this.indexActiveSquares[1] = this.hoverSquareIndex
        } else {
          this.indexActiveSquares[3] = this.hoverSquareIndex
        }
        // this.delDraggedPiece()
      }

      if (this.side === 'white' && !this.pieceHadBeenMoved) {
        this.side = 'black'
        this.indexActiveSquares[2] = 64
        this.indexActiveSquares[3] = 64
      } else if (this.side === 'black' && !this.pieceHadBeenMoved) {
        this.side = 'white'
        this.indexActiveSquares[0] = 64
        this.indexActiveSquares[1] = 64
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
    },

    clearMoveableSquares(): void {
      this.squaresForMove.fill(false)
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

    isActive:
      state =>
      (x: number, y: number): boolean => {
        const index = fromPosToIndex([x, y])
        return state.indexActiveSquares.includes(index)
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
