<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from './stores/board'
import { getHoverIndex } from './services/helpers'
import TheBoard from './components/TheBoard.vue'
import TheNotation from './components/TheNotation.vue'

const store = useStore()
const key = ref(0)

/* THE MOUSE MOVE EVENT */
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
  false
}

/* THE MOUSE UP EVENT */
function mouseUp(): void {
  store.lmbIsPressed = false
  const isReactivated = store.isReactivated
  const pieceHadBeenMoved = store.pieceHadBeenMoved
  const dragIndex = store.dragIndex
  const hoverIndex = store.hoverIndex
  const turn = store.turn

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
  if (store.pieceHadBeenMoved && store.dragIndex < 64) store.placePiece()
}

function newGame(): void {
  // clears board local storage
  if (localStorage.board) localStorage.removeItem('board')
  if (localStorage.turn) localStorage.removeItem('turn')

  // clears notation local storage
  if (localStorage.notation) localStorage.removeItem('notation')
  // if (localStorage.notationWhite) localStorage.removeItem('notationWhite')
  // if (localStorage.notationBlack) localStorage.removeItem('notationBlack')

  store.restart()
  update()
}

const update = () => key.value++
</script>

<template>
  <div @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave">
    <button @click="newGame" class="button">Новая игра</button>
    <TheBoard />
  </div>

  <div class="notation_margin-left">
    <TheNotation
      :key="key"
      :arrangement="store.arrangement"
      :turn="store.turn"
      :move="store.lastMove"
      :had-captured="store.hadCaptured"
      :auto-scroll="true" />
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
  background-size: cover;
  color: hsl(210, 29%, 24%);
  overflow: hidden;
  background-color: rgb(105, 172, 141);
}

/* .wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
} */

.notation_margin-left {
  margin-left: 40px;
}

.button {
  width: 200px;
  height: 125px;
  font-size: 35px;
  user-select: none;
}
</style>
