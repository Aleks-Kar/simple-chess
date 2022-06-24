<script setup lang="ts">
import TheBoard from './components/TheBoard.vue'
import { getHoverSquareIndex } from './services/helpers'
import { useStore } from './stores/board'

const store = useStore()

function mouseMove(e: MouseEvent): void {
  if (!store.draggedItem || !store.lmbIsPressed) return

  store.hoverSquareIndex = getHoverSquareIndex(
    store.boardLeft,
    store.boardTop,
    e.clientX,
    e.clientY
  )

  if (!store.isMoved) {
    store.isMoved = true
    store.draggedItem.style.cursor = 'grabbing'
  }

  store.draggedItem.style.left = `${e.clientX - store.cx}px`
  store.draggedItem.style.top = `${e.clientY - store.cy}px`
}

function mouseUp(): void {
  store.lmbIsPressed = false

  if (store.isReactivated && !store.isMoved) {
    console.warn('up reactivated')

    store.isReactivated = false
    store.deactivateSquare()
    store.squaresForMove.fill(false)
    return
  }

  // if (store.hoverSquareIndex === 64) return
  if (!store.isMoved) return
  store.isMoved = false

  if (store.hoverSquareIndex === store.dragIndex) {
    store.draggedItem.style.left = 0
    store.draggedItem.style.top = 0
    store.draggedItem.style.cursor = 'pointer'
    store.indexActiveSquare = 64
  } else {
    store.setPieceOnHover(store.getDraggedPiece())
    // store.delDraggedPiece()
  }

  //clearing
  store.draggedItem = document.body.querySelector('.board')
  store.squaresForMove.fill(false)
  store.boardLeft = 0
  store.boardTop = 0
  store.hoverSquareIndex = 64
}

function mouseLeave(): void {
  console.warn('mouseLeave')

  const dragIndex = store.dragIndex
  store.pieces[store.dragIndex] = '' // delete the dragged piece
  store.pieces[60] = store.pieces[dragIndex]

  store.draggedItem = document.body.querySelector('.board')
  store.squaresForMove.fill(false)
  store.boardLeft = 0
  store.boardTop = 0
  store.hoverSquareIndex = 64
}

function mouseEnter(e: any): void {
  // console.warn(e)
}
</script>

<template>
  <div
    class="wrapper"
    @mouseenter="mouseEnter($event)"
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
