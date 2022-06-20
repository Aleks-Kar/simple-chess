<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '../stores/board'
import MySquare from './MySquare.vue'
import { getMoveableSquares } from '../services/helpers'

const store = useStore()

onMounted(() => {
  store.init()
})

function fn(): void {
  // getMoveableSquares(store.pieces, store.getPiece(0, 6), 0, 6)
  // console.warn(store.squaresForMove[42])
}
</script>

<template>
  <button @click="fn">проверка</button>
  <div class="board">
    <div v-for="(row, y) in 8" class="board__row">
      <MySquare
        v-for="(square, x) in 8"
        :key="x + y * 8"
        :piece="store.getPiece(x, y)"
        :pos="[x, y]"
        :is-active="store.isActive(x, y)"
        :is-moveable="store.isMoveable(x, y)"
        :square-color="(row + square) % 2 === 0 ? 'white' : 'black'" />
    </div>
  </div>
</template>

<style>
button {
  width: 100px;
  height: 100px;
}

.board {
  display: flex;
  flex-wrap: wrap;
  width: 720px;
  height: 720px;
  background-color: red;
}

.board__row {
  display: flex;
}
</style>
