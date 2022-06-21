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

// function mouseDown(e: any): any {
//   store.draggedItem = e.target

//   store.draggedItem.style.position = 'relative'
//   store.draggedItem.style.zIndex = '100'

//   store.cx = e.clientX - 45
//   store.cy = e.clientY - 45
//   // store.ox = e.offsetX - 45
//   // store.ox = e.offsetY - 45
// }

// function mouseMove(e: any): any {
//   if (store.draggedItem) {
//     store.draggedItem.style.zIndex = '10'
//     store.draggedItem.style.left = e.clientX - store.cx - 45
//     store.draggedItem.style.top = e.clientY - store.cy - 45
//   }
// }

// function mouseUp(e: any): any {
//   store.draggedItem.style.position = 'static'
//   store.cx = 0
//   store.cy = 0
// }
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
