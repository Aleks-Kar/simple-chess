<script setup lang="ts">
import TheBoard from './components/TheBoard.vue'
import { useStore } from './stores/board'

const store = useStore()

function mouseMove(e: MouseEvent): void {
  if (!store.draggedItem) return
  store.draggedItem.style.left = `${e.clientX - store.cx}px`
  store.draggedItem.style.top = `${e.clientY - store.cy}px`
}
function mouseUp(): void {
  store.pieces[store.draggedIdentifier] = '' // delete the dragged piece
  store.draggedItem = document.body.querySelector('.board')
}
function mouseLeave(): void {
  // console.warn('leave!')

  store.pieces[store.draggedIdentifier] = '' // delete the dragged piece
  store.draggedItem = document.body.querySelector('.board')
}
</script>

<template>
  <div
    class="wrapper"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    @mouseleave="mouseLeave">
    <TheBoard />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: hsl(210, 29%, 24%);
  overflow: hidden;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(105, 172, 141);
}
</style>
