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

// function mouseDown(e: any, id: any): any {
//   console.warn(id)

//   // if (e.target === undefined && e.target === null) return
//   // if (e.target.toString() === '[object HTMLDivElement]') return

//   // store.draggedItem = e.target
//   // store.draggedItem.style.position = 'relative'
//   const svg: any = document.body.querySelector(`#${id} svg`)
//   console.warn(svg)

//   // if (svg === null) return

//   svg.style.position = 'relative'
//   store.draggedItem = svg

//   store.cx = e.clientX - 45
//   store.cy = e.clientY - 45

//   // store.ox = e.offsetX - 45
//   // store.ox = e.offsetY - 45
// }

// function mouseMove(e: any): any {
//   if (!store.draggedItem) return
//   store.draggedItem.style.left = `${e.clientX - store.cx - 45}px`
//   store.draggedItem.style.top = `${e.clientY - store.cy - 45}px`
// }

// function mouseUp(e: any, index: any): any {
//   store.pieces[index] = ''
//   store.draggedItem = e.target
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
        :id="`${store.getPiece(x, y)}${x}`"
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
