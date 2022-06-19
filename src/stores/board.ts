import { defineStore, storeToRefs } from 'pinia'

function fromPosToIndex(position: Array<number>): number {
  const [x, y] = position
  return x + y * 8
}

export const useStore = defineStore('board', {
  state: () => {
    return {
      pieces: Array<string>(64),
      isActive: Array<boolean>(64)
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

    setActive(position: Array<number>): void {
      if (position.length !== 2)
        throw new Error(
          `exceeded the array length limit (${position.length} instead of 2)`
        )
      const index = fromPosToIndex(position)
      const lastTrueIndex = this.isActive.indexOf(true)
      this.isActive[lastTrueIndex] = false
      this.isActive[index] = true
    },

    setPiece(index: number, char: string): void {
      if (char.length > 1)
        throw new Error(
          `exceeded the character limit (${char.length} characters instead of 1)`
        )
      this.pieces[index] = char
    }
  },

  getters: {
    checkActive:
      state =>
      (x: number, y: number): boolean => {
        const index = x + y * 8
        return Boolean(state.isActive[index])
      },

    getActiveIndex: state => (): number => {
      const index = state.isActive.indexOf(true)
      return index
    },

    getPiece:
      state =>
      (x: number, y: number): string => {
        const index = x + y * 8
        return String(state.pieces[index])
      }
  }
})
