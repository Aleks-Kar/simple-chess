<script setup lang="ts">
import TheBoard from './components/TheBoard.vue'
import { getHoverIndex } from './services/helpers'
import { useStore } from './stores/board'

const store = useStore()

// THE MOUSE MOVE EVENT
function mouseMove(e: MouseEvent): void {
  if (!store.draggedItem || !store.lmbIsPressed) return

  store.hoverIndex = getHoverIndex(
    store.boardLeft,
    store.boardTop,
    e.clientX,
    e.clientY
  )

  if (!store.pieceHadBeenMoved) {
    store.pieceHadBeenMoved = true
    store.draggedItem.style.cursor = 'grabbing'
  }

  store.draggedItem.style.left = `${e.clientX - store.cx}px`
  store.draggedItem.style.top = `${e.clientY - store.cy}px`
}

// THE MOUSE UP EVENT
function mouseUp(): void {
  store.lmbIsPressed = false
  // if (!store.draggedItem) return

  if (store.isReactivated && !store.pieceHadBeenMoved) {
    store.isReactivated = false
    // store.deactivateSquare()
    store.activeIndex = 64
    store.clearMoveableSquares()
    return
  } else if (store.isReactivated) {
    store.isReactivated = false
  }

  if (store.squaresForMove[store.hoverIndex]) {
    if (store.activeIndex !== store.hoverIndex && store.hoverIndex !== 64) {
      // marking last moves
      store.lastMove[0] = store.activeIndex
      store.lastMove[1] = store.hoverIndex
    }

    if (!store.pieceHadBeenMoved) return
  }

  if (store.pieceHadBeenMoved) store.placePiece()
  // store.pieceHadBeenMoved = false
  // store.activeIndex = 64
}

function mouseLeave(): void {
  if (store.dragIndex !== 64) store.placePiece()
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
