import { defineStore } from 'pinia'

export const useStore = defineStore('board', {
  state: () => {
    return { pieces: Array<string>(64) }
  },

  actions: {
    init(): void {
      this.pieces.fill('')
      const blackStr: string = 'rnbqkbnrpppppppp'
      const whiteStr: string = 'RNBQKBNRPPPPPPPP'
      for (let i = 0; i < 16; i++) this.pieces[i] = blackStr[i]
      for (let i = 63; i > 47; i--) this.pieces[i] = whiteStr[63 - i]
    },

    set(index: number, char: string): void {
      if (char.length !== 1)
        throw new Error('exceeded the character limit in the second parameter')
      this.pieces[index] = char
    }
  },

  getters: {
    getSquare:
      state =>
      (index: number): string =>
        String(state.pieces[index])
  }
})
