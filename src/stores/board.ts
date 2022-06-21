import { prototype } from 'events'
import { defineStore } from 'pinia'

function fromPosToIndex(position: Array<number>): number {
  const [x, y] = position
  return x + y * 8
}

export const useStore = defineStore('board', {
  state: () => {
    return {
      pieces: Array<string>(64),
      indexActiveSquare: 64,
      side: 'white',
      squaresForMove: Array<boolean>(64),
      squaresForAttack: Array<boolean>(64),

      cx: 0,
      cy: 0,
      draggedItem: document.body.querySelector('.board')
    }
  },

  actions: {
    init(): void {
      this.pieces.fill('')
      const blackStr: string = 'rnbqkbnrpppppppp'
      const whiteStr: string = 'RNBQKBNRPPPPPPPP'
      for (let i = 0; i < 16; i++) this.pieces[i] = blackStr[i]
      for (let i = 63; i > 47; i--) this.pieces[i] = whiteStr[63 - i]
    },

    toggleActiveSquare(position: Array<number>): void {
      if (position.length !== 2)
        throw new Error(
          `unexpected array length (${position.length} instead of 2)`
        )

      const index = fromPosToIndex(position)
      if (this.indexActiveSquare === index) {
        this.indexActiveSquare = 64
      } else {
        this.indexActiveSquare = index
      }
    },

    clearActiveSquare(): void {
      this.indexActiveSquare = 64
    },

    setPiece(index: number, char: string): void {
      if (char.length > 1)
        throw new Error(
          `unexpected character amount (${char.length} instead of 1)`
        )
      this.pieces[index] = char
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
    getPiece:
      state =>
      (x: number, y: number): string => {
        const index = fromPosToIndex([x, y])
        return String(state.pieces[index])
      },

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
