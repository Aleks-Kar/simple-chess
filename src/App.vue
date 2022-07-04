<script setup lang="ts">
import TheBoard from './components/TheBoard.vue'
import { getAttackedSquares, getHoverSquareIndex } from './services/helpers'
import { useStore } from './stores/board'

const store = useStore()

// THE MOUSE MOVE EVENT
function mouseMove(e: MouseEvent): void {
  if (!store.draggedItem || !store.lmbIsPressed) return

  store.hoverSquareIndex = getHoverSquareIndex(
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
  if (!store.draggedItem) return
  if (store.isReactivated && !store.pieceHadBeenMoved) {
    store.isReactivated = false
    // store.deactivateSquare()
    store.indexActiveSquare = 64
    store.clearMoveableSquares()
    return
  } else if (store.isReactivated) {
    store.isReactivated = false
  }

  if (store.squaresForMove[store.hoverSquareIndex]) {
    if (
      store.indexActiveSquare !== store.hoverSquareIndex &&
      store.hoverSquareIndex !== 64
    ) {
      // store.removeAttackedSquares(
      //   getAttackedSquares(
      //     store.pieces,
      //     store.pieces[store.dragIndex],
      //     store.dragIndex
      //   )
      // )

      // marking last moves
      store.lastMoves[0] = store.indexActiveSquare
      store.lastMoves[1] = store.hoverSquareIndex
    }

    if (!store.pieceHadBeenMoved) return

    // store.addAttackedSquares(
    //   getAttackedSquares(
    //     store.pieces,
    //     store.pieces[store.dragIndex],
    //     store.hoverSquareIndex
    //   )
    // )
  }

  store.placePieceOnHover()
  store.pieceHadBeenMoved = false
  store.indexActiveSquare = 64
}

function mouseLeave(): void {
  // const dragIndex = store.dragIndex
  // store.pieces[store.dragIndex] = '' // delete the dragged piece
  // store.pieces[60] = store.pieces[dragIndex]
  // store.draggedItem = document.body.querySelector('.board')
  // store.squaresForMove.fill(false)
  // store.boardLeft = 0
  // store.boardTop = 0
  // store.hoverSquareIndex = 64
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
