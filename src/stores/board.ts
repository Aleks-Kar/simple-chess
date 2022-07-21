import { defineStore } from 'pinia'
import { getAttackedSquares, getPawnMoves } from '../services/helpers'

export const useStore = defineStore('board', {
  state: () => {
    return {
      arrangement: Array<string>(64),
      turn: 'white',
      lastMove: Array<number>(2),

      lWhiteRookHadBeenMoved: false,
      whiteKingHadBeenMoved: false,
      rWhiteRookHadBeenMoved: false,
      lBlackRookHadBeenMoved: false,
      blackKingHadBeenMoved: false,
      rBlackRookHadBeenMoved: false,

      underWhiteAttack: Array<boolean>(64),
      underBlackAttack: Array<boolean>(64),
      activeIndex: 64,
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
      hadCaptured: ''
    }
  },

  actions: {
    // setting up board
    init(): void {
      this.arrangement.fill('')
      this.underWhiteAttack.fill(false)
      this.underBlackAttack.fill(false)

      this.clearMoveableSquares()
      const whitePieces: string = 'RNBQKBNRPPPPPPPP'
      const blackPieces: string = 'pppppppprnbqkbnr'
      for (let i = 0; i < 16; i++) this.arrangement[i] = whitePieces[i]
      for (let i = 48; i < 64; i++) this.arrangement[i] = blackPieces[i - 48]

      // calculates attacked squares by black board
      for (let i = 0; i < 16; i++) {
        const attackedSquares = getAttackedSquares(
          this.arrangement,
          this.arrangement[i],
          i
        )

        for (let j = 0; j < 64; j++) {
          if (attackedSquares[j]) this.underWhiteAttack[j] = true
        }
      }

      // calculates attacked squares by white board
      for (let i = 48; i < 64; i++) {
        const attackedSquares = getAttackedSquares(
          this.arrangement,
          this.arrangement[i],
          i
        )

        for (let j = 0; j < 64; j++) {
          if (attackedSquares[j]) this.underBlackAttack[j] = true
        }
      }
    },

    restart(): void {
      this.init()
      this.turn = 'white'
      this.lastMove = [64, 64]
      this.activeIndex = 64
    },

    setPieceOnHover(piece: string): void {
      if (this.hoverIndex === 64) {
      } else {
        this.arrangement[this.hoverIndex] = piece
        this.arrangement[this.dragIndex] = ''
      }
    },

    calculateAttacks(): void {
      for (let i = 0; i < 64; i++) {
        const piece = this.getPiece(i)
        const color = this.getPieceColor(i)
        if (piece !== '') {
          const attackedSquares = getAttackedSquares(this.arrangement, piece, i)
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
        this.hadCaptured = this.getPiece(this.hoverIndex)

        // saves the dragged piece and "moves" it
        this.arrangement[this.hoverIndex] = this.arrangement[this.dragIndex]
        this.arrangement[this.dragIndex] = ''

        this.underWhiteAttack.fill(false)
        this.underBlackAttack.fill(false)
        this.calculateAttacks()

        if (this.turn === 'white') {
          this.turn = 'black'
          if (this.dragIndex === 0) this.lWhiteRookHadBeenMoved = true
          if (this.dragIndex === 4) this.whiteKingHadBeenMoved = true
          if (this.dragIndex === 7) this.rWhiteRookHadBeenMoved = true
        } else {
          this.turn = 'white'
          if (this.dragIndex === 63) this.lWhiteRookHadBeenMoved = true
          if (this.dragIndex === 60) this.whiteKingHadBeenMoved = true
          if (this.dragIndex === 56) this.rWhiteRookHadBeenMoved = true
        }

        const board = {
          arrangement: this.arrangement,
          turn: this.turn,
          lastMove: this.lastMove
        }
        localStorage.board = JSON.stringify(board)
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
      this.arrangement[this.dragIndex] = ''
    },

    toggleSide(): void {
      this.turn = this.turn === 'white' ? 'black' : 'white'
    },

    setMoveableSquares(piece: string, index: number): void {
      if (piece.toUpperCase() === 'P') {
        // exclusive moves for a pawn
        this.squaresForMove = [...getPawnMoves(this.arrangement, piece, index)]
      } else if (piece.toUpperCase() === 'K') {
        // exclusive moves for a king
        const attackedSquares = getAttackedSquares(
          this.arrangement,
          piece,
          index
        )

        const color = this.getPieceColor(index)
        for (let i = 0; i < 64; i++) {
          if (attackedSquares[i]) {
            if (color === 'white' && this.underBlackAttack[i]) {
              attackedSquares[i] = false
            } else if (color === 'black' && this.underWhiteAttack[i]) {
              attackedSquares[i] = false
            }
          }
        }

        if (this.turn === 'white') {
          // short castling
          if (
            !this.whiteKingHadBeenMoved &&
            !this.rWhiteRookHadBeenMoved &&
            this.arrangement[5] === '' &&
            this.arrangement[6] === '' &&
            !this.underBlackAttack[4] &&
            !this.underBlackAttack[5] &&
            !this.underBlackAttack[6]
          ) {
            attackedSquares[6] = true
          }

          // long castling
          if (
            !this.whiteKingHadBeenMoved &&
            !this.lWhiteRookHadBeenMoved &&
            this.arrangement[1] === '' &&
            this.arrangement[2] === '' &&
            this.arrangement[3] === '' &&
            !this.underBlackAttack[2] &&
            !this.underBlackAttack[3] &&
            !this.underBlackAttack[4]
          ) {
            attackedSquares[2] = true
          }
        } else if (this.turn === 'black') {
          // short castling
          if (
            !this.blackKingHadBeenMoved &&
            !this.rBlackRookHadBeenMoved &&
            this.arrangement[61] === '' &&
            this.arrangement[62] === '' &&
            !this.underWhiteAttack[60] &&
            !this.underWhiteAttack[61] &&
            !this.underWhiteAttack[62]
          ) {
            attackedSquares[62] = true
          }

          // long castling
          if (
            !this.blackKingHadBeenMoved &&
            !this.lBlackRookHadBeenMoved &&
            this.arrangement[57] === '' &&
            this.arrangement[58] === '' &&
            this.arrangement[59] === '' &&
            !this.underWhiteAttack[58] &&
            !this.underWhiteAttack[59] &&
            !this.underWhiteAttack[60]
          ) {
            attackedSquares[58] = true
          }
        }

        this.squaresForMove = [...attackedSquares]
      } else {
        // moves for other pieces
        this.squaresForMove = [
          ...getAttackedSquares(this.arrangement, piece, index)
        ]
      }
    },

    prepareForDragging(e: MouseEvent, index: number): void {
      const boardPos: DOMRect | undefined = document.body
        .querySelector('.board__field')
        ?.getBoundingClientRect()
      // saves the board position parameters
      if (boardPos) this.boardLeft = Math.round(boardPos.left)
      if (boardPos) this.boardTop = Math.round(boardPos.top)

      const svgElement: SVGSVGElement | null = document.body.querySelector(
        `#square${index} svg`
      )

      this.draggedItem = svgElement
      if (svgElement) svgElement.style.position = 'relative'

      this.cx = e.clientX - (e.offsetX - 45)
      this.cy = e.clientY - (e.offsetY - 45)
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
        return state.arrangement[index]
      },

    getDraggedPiece: state => (): string => {
      return String(state.arrangement[state.dragIndex])
    },

    getPieceColor:
      state =>
      (index: number): string => {
        if (
          state.arrangement[index] ===
          String(state.arrangement[index]).toUpperCase()
        ) {
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
        const piece = state.arrangement[index]
        return piece === piece.toUpperCase()
      }
  }
})
