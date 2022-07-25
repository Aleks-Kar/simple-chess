import { defineStore } from 'pinia'
import {
  getAttackedSquares,
  getHoverIndex,
  getPawnMoves,
  getCoordFromIndex,
  getSquareIndexesInBetween
} from '../services/helpers'

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
      whiteKingUnderAttack: false,
      blackKingUnderAttack: false,
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
    init(): void {
      this.arrangement.fill('')
      this.underWhiteAttack.fill(false)
      this.underBlackAttack.fill(false)

      this.squaresForMove.fill(false)
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
      this.lWhiteRookHadBeenMoved = false
      this.whiteKingHadBeenMoved = false
      this.rWhiteRookHadBeenMoved = false
      this.lBlackRookHadBeenMoved = false
      this.blackKingHadBeenMoved = false
      this.rBlackRookHadBeenMoved = false
      this.activeIndex = 64
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
        // this.checkWhiteKing()
        // this.checkBlackKing()
        this.hadCaptured = this.getPiece(this.hoverIndex)

        /* handle special cases */
        // castling
        if (this.getPiece(this.dragIndex).toUpperCase() === 'K') {
          if (this.turn === 'white') {
            if (this.dragIndex === 4 && this.hoverIndex === 6) {
              this.arrangement[7] = ''
              this.arrangement[5] = 'R'
            } else if (this.dragIndex === 4 && this.hoverIndex === 2) {
              this.arrangement[0] = ''
              this.arrangement[3] = 'R'
            }
          } else if (this.turn === 'black') {
            if (this.dragIndex === 60 && this.hoverIndex === 62) {
              this.arrangement[63] = ''
              this.arrangement[61] = 'r'
            } else if (this.dragIndex === 60 && this.hoverIndex === 58) {
              this.arrangement[56] = ''
              this.arrangement[59] = 'r'
            }
          }
        }

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
          if (this.dragIndex === 63) this.lBlackRookHadBeenMoved = true
          if (this.dragIndex === 60) this.blackKingHadBeenMoved = true
          if (this.dragIndex === 56) this.rBlackRookHadBeenMoved = true
        }

        const board = {
          arrangement: this.arrangement,
          turn: this.turn,
          lastMove: this.lastMove,
          lWhiteRookHadBeenMoved: this.lWhiteRookHadBeenMoved,
          whiteKingHadBeenMoved: this.whiteKingHadBeenMoved,
          rWhiteRookHadBeenMoved: this.rWhiteRookHadBeenMoved,
          lBlackRookHadBeenMoved: this.lBlackRookHadBeenMoved,
          blackKingHadBeenMoved: this.blackKingHadBeenMoved,
          rBlackRookHadBeenMoved: this.rBlackRookHadBeenMoved
        }
        localStorage.board = JSON.stringify(board)
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

    setMoveableSquares(index: number): void {
      if (this.turn !== this.getPieceColor(index)) return
      if (this.activeIndex !== 64 && index === this.activeIndex)
        this.isReactivated = true
      this.lmbIsPressed = true
      this.dragIndex = index

      if (this.isReactivated) return

      this.activeIndex = index
      // calculates the attacks once again if the page had been reloaded
      if (this.underWhiteAttack[0] === undefined) this.calculateAttacks()

      const piece = this.getPiece(index)
      let movesOfKing = Array<boolean>(64)
      movesOfKing.fill(false)

      if (piece.toUpperCase() === 'P') {
        // exclusive moves for a pawn
        this.squaresForMove = getPawnMoves(this.arrangement, piece, index)
      } else if (piece.toUpperCase() === 'K') {
        // exclusive moves for a king
        // movesOfKing = [...getAttackedSquares(this.arrangement, 'K', index)]

        // const color = this.getPieceColor(index)
        // for (let i = 0; i < 64; i++) {
        //   if (movesOfKing[i]) {
        //     if (color === 'white' && this.underBlackAttack[i]) {
        //       movesOfKing[i] = false
        //     } else if (color === 'black' && this.underWhiteAttack[i]) {
        //       movesOfKing[i] = false
        //     }
        //   }
        // }

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
            movesOfKing[6] = true
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
            movesOfKing[2] = true
          }
        } else if (this.turn === 'black') {
          // short castling
          if (
            !this.blackKingHadBeenMoved &&
            !this.lBlackRookHadBeenMoved &&
            this.arrangement[61] === '' &&
            this.arrangement[62] === '' &&
            !this.underWhiteAttack[60] &&
            !this.underWhiteAttack[61] &&
            !this.underWhiteAttack[62]
          ) {
            movesOfKing[62] = true
          }

          // long castling
          if (
            !this.blackKingHadBeenMoved &&
            !this.rBlackRookHadBeenMoved &&
            this.arrangement[57] === '' &&
            this.arrangement[58] === '' &&
            this.arrangement[59] === '' &&
            !this.underWhiteAttack[58] &&
            !this.underWhiteAttack[59] &&
            !this.underWhiteAttack[60]
          ) {
            movesOfKing[58] = true
          }
        }

        this.squaresForMove = [...movesOfKing]
      } else {
        // moves for other pieces
        this.squaresForMove = getAttackedSquares(this.arrangement, piece, index)
      }

      this.checkWhiteKing()
      this.checkBlackKing()

      if (this.whiteKingUnderAttack || this.blackKingUnderAttack) {
        // looks for which square the threat is coming from
        let kingIndex = 0
        if (this.whiteKingUnderAttack) {
          kingIndex = this.arrangement.indexOf('K')
        } else {
          kingIndex = this.arrangement.indexOf('k')
        }

        const attackedSquares = getAttackedSquares(
          this.arrangement,
          'Q',
          kingIndex
        )

        for (let i = 0; i < 64; i++) {
          // looks for attacked pieces
          if (attackedSquares[i] && this.getPiece(i) !== '') {
            // looks for enemy pieces
            if (!this.isWhitePiece(i) && this.turn === 'white') {
              // checks if enemy piece has attack the king
              const squaresAttackedByEnemyPiece = getAttackedSquares(
                this.arrangement,
                this.getPiece(i),
                i
              )

              const enemyPieceIndex = i

              let flag = false
              for (let i = 0; i < 64; i++) {
                if (squaresAttackedByEnemyPiece[i]) {
                  if (i === kingIndex) {
                    flag = true
                    break
                  }
                }
              }

              if (flag) {
                /* searches the indexes of squares between
                   the king and the enemy piece */

                const indexesInBetween = getSquareIndexesInBetween(
                  kingIndex,
                  enemyPieceIndex
                )

                // console.warn('indexes', indexesInBetween)

                const kingMoves = getAttackedSquares(
                  this.arrangement,
                  'K',
                  index
                )

                /* exclusion of moves of allied pieces
                  that are not aimed at protecting the king */
                for (let i = 0; i < 64; i++) {
                  // if (piece === 'K' && kingMoves[i]) continue
                  if (i === enemyPieceIndex) continue

                  if (this.squaresForMove[i]) {
                    if (!indexesInBetween.includes(i)) {
                      this.squaresForMove[i] = false
                    }
                  }
                }

                break
              }
            }
          }
        }
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

    mouseDownHandler(e: MouseEvent, index: number): void {
      this.setMoveableSquares(index)
      this.prepareForDragging(e, index)
    },

    mouseMoveHandler(e: MouseEvent): void {
      if (!this.draggedItem || !this.lmbIsPressed) return

      this.hoverIndex = getHoverIndex(
        this.boardLeft,
        this.boardTop,
        e.clientX,
        e.clientY
      )

      if (!this.pieceHadBeenMoved) {
        this.pieceHadBeenMoved = true
        this.draggedItem.style.cursor = 'grabbing'
      }

      this.draggedItem.style.left = `${e.clientX - this.cx}px`
      this.draggedItem.style.top = `${e.clientY - this.cy}px`
    },

    mouseUpHandler(): void {
      this.lmbIsPressed = false
      const isReactivated = this.isReactivated
      const pieceHadBeenMoved = this.pieceHadBeenMoved
      const dragIndex = this.dragIndex
      const hoverIndex = this.hoverIndex
      const turn = this.turn

      if (isReactivated && !pieceHadBeenMoved) {
        this.isReactivated = false
        this.activeIndex = 64
        this.squaresForMove.fill(false)
        return
      } else if (isReactivated) {
        this.isReactivated = false
      }

      if (
        this.squaresForMove[hoverIndex] &&
        (this.getPiece(hoverIndex) === '' ||
          (!this.isWhitePiece(hoverIndex) && turn === 'white') ||
          (this.isWhitePiece(hoverIndex) && turn === 'black'))
      ) {
        this.lastMove[0] = dragIndex
        this.lastMove[1] = hoverIndex
      }

      if (pieceHadBeenMoved) this.placePiece()
    },

    checkWhiteKing(): void {
      const whiteKingIndex = this.arrangement.indexOf('K')
      this.whiteKingUnderAttack = this.underBlackAttack[whiteKingIndex]
    },

    checkBlackKing(): void {
      const blackKingIndex = this.arrangement.indexOf('k')
      this.blackKingUnderAttack = this.underWhiteAttack[blackKingIndex]
    }
  },

  getters: {
    getPiece:
      state =>
      (index: number): string => {
        // return String(state.board[index])
        return state.arrangement[index]
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
