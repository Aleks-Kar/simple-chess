import { defineStore } from 'pinia'
import { useBoardStore } from '../../store/board'

export const useKingStore = defineStore('king', {
  state: () => {
    return {}
  },

  actions: {
    setMoveableSquares() {

    },


    place() {
      const board = useBoardStore()

      if (board.turn === 'white') {
        if (board.dragIndex === 4 && board.hoverIndex === 6) {
          board.arrangement[7] = ''
          board.arrangement[5] = 'R'
        } else if (board.dragIndex === 4 && board.hoverIndex === 2) {
          board.arrangement[0] = ''
          board.arrangement[3] = 'R'
        }
      } else if (board.turn === 'black') {
        if (board.dragIndex === 60 && board.hoverIndex === 62) {
          board.arrangement[63] = ''
          board.arrangement[61] = 'r'
        } else if (board.dragIndex === 60 && board.hoverIndex === 58) {
          board.arrangement[56] = ''
          board.arrangement[59] = 'r'
        }
      }
    }
  },

  getters: {
    summary(state) {}
  }
})
