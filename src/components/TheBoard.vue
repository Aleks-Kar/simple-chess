<script setup lang="ts">
import { isRef, onMounted, reactive } from 'vue'
import MySquare from './MySquare.vue'

interface Board {
  arrState: Array<string>
}

const board: Board = reactive({ arrState: new Array<string>(64) })

function boardInit(): void {
  board.arrState.fill('')
  const blackStr: string = 'rnbqkbnrpppppppp'
  const whiteStr: string = 'RNBQKBNRPPPPPPPP'
  for (let i = 0; i < 16; i++) board.arrState[i] = blackStr[i]
  for (let i = 63; i > 47; i--) board.arrState[i] = whiteStr[63 - i]
}

onMounted(() => {
  boardInit()
})
</script>

<template>
  <div class="board">
    <div v-for="(row, y) in 8" class="board__row">
      <MySquare
        v-for="(square, x) in 8"
        :piece="String(board.arrState[x + y * 8])"
        :square-color="(row + square) % 2 === 0 ? 'white' : 'black'" />
    </div>
  </div>
</template>

<style>
.board {
  display: flex;
  flex-wrap: wrap;
  width: 720px;
  height: 720px;
}

.board__row {
  display: flex;
}
</style>
