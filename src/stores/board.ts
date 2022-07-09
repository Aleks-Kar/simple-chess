import { defineStore } from 'pinia'
import { getAttackedSquares } from '../services/helpers'

function fromPosToIndex(position: Array<number>): number {
  const [x, y] = position
  return x + y * 8
}

export const useStore = defineStore('board', {
  state: () => {
    return {
      pieces: Array<string>(64),
      set: 'dubrovny',
      underWhiteAttack: Array<number>(64),
      underBlackAttack: Array<number>(64),
      turn: 'white',
      activeIndex: 64,
      lastMove: Array<number>(2),
      squaresForMove: Array<boolean>(64),
      lmbIsPressed: false,
      isReactivated: false,
      pieceHadBeenMoved: false,

      cx: 0,
      cy: 0,
      // draggedItem: document.body.querySelector('.board'),
      draggedItem: document.body.querySelector('.square'),
      dragIndex: 64,
      hoverIndex: 64,
      boardLeft: 0,
      boardTop: 0
    }
  },

  actions: {
    // setting up pieces
    init(): void {
      this.pieces.fill('')

      // for (let i = 0; i < 64; i++) this.underWhiteAttack[i] = new Set()
      // for (let i = 0; i < 64; i++) this.underBlackAttack[i] = new Set()

      this.underWhiteAttack.fill(0)
      this.underBlackAttack.fill(0)

      // for (let i = 0; i < 16; i++) {
      //   if (this.turn === 'white') {
      //     this.underWhiteAttack[i]++
      //   } else {
      //     this.underBlackAttack[i]++
      //   }

      //   const attackedSq = getAttackedSquares(this.pieces, this.pieces[i], i)
      //   console.warn(attackedSq)
      // }

      this.squaresForMove.fill(false)
      const blackStr: string = 'rnbqkbnrpppppppp'
      const whiteStr: string = 'RNBKQBNRPPPPPPPP'
      for (let i = 0; i < 16; i++) this.pieces[i] = blackStr[i]
      for (let i = 63; i > 47; i--) this.pieces[i] = whiteStr[63 - i]

      // defended markers for the black pieces
      for (let i = 0; i < 16; i++) {
        const attackedSquares = getAttackedSquares(
          this.pieces,
          this.pieces[i],
          i
        )

        for (let j = 0; j < 64; j++) {
          if (attackedSquares[j]) {
            this.underBlackAttack[j]++
          }
        }
      }

      // defended markers for the white pieces
      for (let i = 48; i < 64; i++) {
        const attackedSquares = getAttackedSquares(
          this.pieces,
          this.pieces[i],
          i
        )

        for (let j = 0; j < 64; j++) {
          if (attackedSquares[j]) {
            this.underWhiteAttack[j]++
          }
        }
      }
    },

    // activateSquare(index: number): void {
    //   this.activeIndex = index
    // },

    // deactivateSquare(): void {
    //   this.activeIndex = 64
    // },

    setPieceOnHover(piece: string): void {
      if (this.hoverIndex === 64) {
      } else {
        this.pieces[this.hoverIndex] = piece
        this.pieces[this.dragIndex] = ''
      }
    },

    placePiece(): void {
      // console.warn(this.dragIndex)
      // console.warn(this.hoverIndex)

      const y = Math.trunc(this.hoverIndex / 8)
      const x = this.hoverIndex - y * 8

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
        this.draggedItem.style.cursor = 'pointer'
        console.warn('2')
      } else {
        console.warn('3')
        /* places the piece, recalculates and sets the attack squares */
        // clears squares attacked by the mov piece
        this.removeAttackedSquares(
          getAttackedSquares(
            this.pieces,
            this.pieces[this.dragIndex],
            this.dragIndex
          )
        )

        const draggedPiece = this.pieces[this.dragIndex]
        this.pieces[this.dragIndex] = ''

        // calculates and sets of the attack squares of the moving piece
        this.addAttackedSquares(
          getAttackedSquares(this.pieces, draggedPiece, this.hoverIndex)
        )

        // mounts the piece
        this.pieces[this.hoverIndex] = draggedPiece

        if (this.turn === 'white') {
          this.turn = 'black'
        } else {
          this.turn = 'white'
        }
      }

      // clearing
      this.dragIndex = 64
      this.draggedItem = null
      this.squaresForMove.fill(false)
      this.boardLeft = 0
      this.boardTop = 0
      this.hoverIndex = 64

      this.pieceHadBeenMoved = false
      this.activeIndex = 64
    },

    delDraggedPiece(): void {
      if (this.hoverIndex === 64) return
      this.pieces[this.dragIndex] = ''
    },

    toggleSide(): void {
      this.turn = this.turn === 'white' ? 'black' : 'white'
    },

    setMoveableSquares(moveableSquares: Array<boolean>): void {
      this.squaresForMove = [...moveableSquares]
    },

    addAttackedSquares(attackedSquares: Array<boolean>): void {
      for (let i = 0; i < 64; i++) {
        if (attackedSquares[i]) {
          if (this.turn === 'white') {
            this.underWhiteAttack[i]++
            // console.warn(i, this.underWhiteAttack[i])
          } else {
            this.underBlackAttack[i]++
          }
        }
      }
    },

    removeAttackedSquares(attackedSquares: Array<boolean>): void {
      for (let i = 0; i < 64; i++) {
        if (attackedSquares[i]) {
          if (this.turn === 'white') {
            if (this.underWhiteAttack[i] > 0) this.underWhiteAttack[i]--
          } else {
            if (this.underBlackAttack[i] > 0) this.underBlackAttack[i]--
          }
          // console.warn(this.underWhiteAttack[i], this.underBlackAttack[i], i)
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
    //       state.activeIndexs[0] === index ||
    //       state.activeIndexs[1] === index
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
    //       state.activeIndexs[2] === index ||
    //       state.activeIndexs[3] === index
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
      },

    isWhitePiece:
      state =>
      (index: number): boolean => {
        const piece = state.pieces[index]
        return piece === piece.toUpperCase()
      }

    // isMoveable:
    //   state =>
    //   (x: number, y: number): boolean => {
    //     const index = fromPosToIndex([x, y])
    //     return Boolean(state.squaresForMove[index])
    //   }
  }
})
