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
  store.$reset()
  // store.pieces = []
  store.init()
}

function mouseMove(e: any): any {
  if (!store.draggedItem) return
  console.warn(e.clientX - store.cx - 45, e.clientY - store.cy - 45)
  if (e.clientX - store.cx - 45 < -200) {
    store.pieces[store.draggedIdentifier] = '' // delete the dragged piece
    return
  }
  console.warn(store.draggedIdentifier)

  store.draggedItem.style.left = `${e.clientX - store.cx - 45}px`
  store.draggedItem.style.top = `${e.clientY - store.cy - 45}px`
}

function mouseOut(): void {
  // store.pieces[Number(props.identifier.slice(1))] = '' // delete the dragged piece
  console.warn('out')

  // store.pieces[Number(store.draggedIdentifier.slice(1))] = '' // delete the dragged piece
  // store.draggedItem = document.body.querySelector('.board')
}

function getId(x: number, y: number): string {
  return store.getPiece(x, y) + String(x + y * 8)
}
</script>

<template>
  <button @click="fn">проверка</button>
  <div class="board" @mousemove="mouseMove">
    <div v-for="(row, y) in 8" class="board__row">
      <MySquare
        v-for="(square, x) in 8"
        :key="getId(x, y)"
        :id="getId(x, y)"
        :identifier="x + y * 8"
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
