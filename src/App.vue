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
  const isReactivated = store.isReactivated
  const pieceHadBeenMoved = store.pieceHadBeenMoved
  const dragIndex = store.dragIndex
  const hoverIndex = store.hoverIndex
  const turn = store.turn
  // if (!store.draggedItem) return

  if (isReactivated && !pieceHadBeenMoved) {
    store.isReactivated = false
    // store.deactivateSquare()
    store.activeIndex = 64
    store.clearMoveableSquares()
    return
  } else if (isReactivated) {
    store.isReactivated = false
  }

  if (
    store.squaresForMove[hoverIndex] &&
    (store.getPiece(hoverIndex) === '' ||
      (!store.isWhitePiece(hoverIndex) && turn === 'white') ||
      (store.isWhitePiece(hoverIndex) && turn === 'black'))
  ) {
    store.lastMove[0] = dragIndex
    store.lastMove[1] = hoverIndex
  }

  if (pieceHadBeenMoved) store.placePiece()
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
