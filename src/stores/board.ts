import { defineStore } from 'pinia'
import { getAttackedSquares } from '../services/helpers'

export const useStore = defineStore('board', {
  state: () => {
    return {
      board: Array<string>(64),
      underWhiteAttack: Array<boolean>(64),
      underBlackAttack: Array<boolean>(64),
      turn: 'white',
      activeIndex: 64,
      lastMove: Array<number>(2),
      squaresForMove: Array<boolean>(64),
      lmbIsPressed: false,
      isReactivated: false,
      pieceHadBeenMoved: false,

      cx: 0,
      cy: 0,
      boardLeft: 0,
      boardTop: 0,
      draggedItem: document.body.querySelector('.square'),
      dragIndex: 64,
      hoverIndex: 64,
      targetPiece: ''
    }
  },

  actions: {
    // setting up board
    init(): void {
      this.board.fill('')
      this.underWhiteAttack.fill(false)
      this.underBlackAttack.fill(false)

      this.clearMoveableSquares()
      const blackStr: string = 'rnbqkbnrpppppppp'
      const whiteStr: string = 'RNBKQBNRPPPPPPPP'
      for (let i = 0; i < 16; i++) this.board[i] = blackStr[i]
      for (let i = 63; i > 47; i--) this.board[i] = whiteStr[63 - i]

      // calculates attacked squares by black board
      for (let i = 0; i < 16; i++) {
        const attackedSquares = getAttackedSquares(this.board, this.board[i], i)

        for (let j = 0; j < 64; j++) {
          if (attackedSquares[j]) this.underBlackAttack[j] = true
        }
      }

      // calculates attacked squares by white board
      for (let i = 48; i < 64; i++) {
        const attackedSquares = getAttackedSquares(this.board, this.board[i], i)

        for (let j = 0; j < 64; j++) {
          if (attackedSquares[j]) this.underWhiteAttack[j] = true
        }
      }
    },

    setPieceOnHover(piece: string): void {
      if (this.hoverIndex === 64) {
      } else {
        this.board[this.hoverIndex] = piece
        this.board[this.dragIndex] = ''
      }
    },

    placePiece(): void {
      if (
        this.hoverIndex === 64 ||
        this.hoverIndex === this.dragIndex ||
        !this.squaresForMove[this.hoverIndex] ||
        (this.turn === this.getPieceColor(this.hoverIndex) &&
          this.getPiece(this.hoverIndex) !== '')
      ) {
        if (!this.draggedItem) return
        // returns the piece to its initial place
        this.draggedItem.style.left = 0
        this.draggedItem.style.top = 0
        this.draggedItem.style.cursor = ''
      } else {
        this.targetPiece = this.getPiece(this.hoverIndex)

        // saves the dragged piece and "moves" it
        this.board[this.hoverIndex] = this.board[this.dragIndex]
        this.board[this.dragIndex] = ''

        this.underWhiteAttack.fill(false)
        this.underBlackAttack.fill(false)

        // recalculate the attack squares
        for (let i = 0; i < 64; i++) {
          const piece = this.getPiece(i)
          const color = this.getPieceColor(i)
          if (piece !== '') {
            const attackedSquares = getAttackedSquares(this.board, piece, i)
            for (let j = 0; j < 64; j++) {
              if (attackedSquares[j]) {
                if (color === 'white') {
                  this.underWhiteAttack[j] = true
                } else {
                  this.underBlackAttack[j] = true
                }
              }
            }
          }
        }

        if (this.turn === 'white') {
          this.turn = 'black'
        } else {
          this.turn = 'white'
        }
      }

      // clearing
      this.dragIndex = 64
      this.draggedItem = null
      this.clearMoveableSquares()
      this.boardLeft = 0
      this.boardTop = 0
      this.hoverIndex = 64

      this.pieceHadBeenMoved = false
      this.activeIndex = 64
    },

    delDraggedPiece(): void {
      if (this.hoverIndex === 64) return
      this.board[this.dragIndex] = ''
    },

    toggleSide(): void {
      this.turn = this.turn === 'white' ? 'black' : 'white'
    },

    setMoveableSquares(moveableSquares: Array<boolean>): void {
      this.squaresForMove = [...moveableSquares]
    },

    clearMoveableSquares(): void {
      this.squaresForMove.fill(false)
    }
  },

  getters: {
    getPiece:
      state =>
      (index: number): string => {
        // return String(state.board[index])
        return state.board[index]
      },

    getDraggedPiece: state => (): string => {
      return String(state.board[state.dragIndex])
    },

    getPieceColor:
      state =>
      (index: number): string => {
        if (state.board[index] === String(state.board[index]).toUpperCase()) {
          return 'white'
        } else {
          return 'black'
        }
      },

    isWhiteSquare:
      () =>
      (index: number): boolean => {
        const y = Math.trunc(index / 8)
        const x = index - y * 8
        return (x + y) % 2 === 0
      },

    isWhitePiece:
      state =>
      (index: number): boolean => {
        const piece = state.board[index]
        return piece === piece.toUpperCase()
      }
  }
})
