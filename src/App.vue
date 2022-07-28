<script setup lang="ts">
import { computed, ref } from '@vue/reactivity'
import { useBoardStore } from './modules/Board/store/board'
import BaseButton from './components/BaseButton.vue';
import TheNotation from './modules/Notation/components/TheNotation.vue';
import TheBoard from './modules/Board/components/TheBoard.vue';

const board = useBoardStore()
const key = ref(0)

/* THE MOUSE MOVE EVENT */
function mouseMove(e: MouseEvent): void {
  board.mouseMoveHandler(e)
}

/* THE MOUSE UP EVENT */
function mouseUp(): void {
  board.mouseUpHandler()
}

function mouseLeave(): void {
  if (board.pieceHadBeenMoved && board.dragIndex < 64) board.placePiece()
}

function newGame(): void {
  if (localStorage.board) localStorage.removeItem('board')
  if (localStorage.notation) localStorage.removeItem('notation')
  board.restart()
  update()
}

const turn = computed<string>(() => {
  if (board.underWhiteAttack[0] === undefined) {
    return ''
  } else {
    return board.turn
  }
})

const update = () => key.value++
</script>

<template>
  <div @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave">
    <TheBoard />
  </div>

  <div class="notation__container">
    <!-- <BaseButton @click="newGame">Новая игра</BaseButton> -->

    <!-- <TheNotation
      :key="key"
      :arrangement="board.arrangement"
      :turn="turn"
      :move="board.lastMove"
      :had-captured="board.hadCaptured"
      :auto-scroll="true" /> -->
  </div>
</template>

<style lang="scss">
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
  background-size: cover;
  background-color: hsl(240, 25%, 25%);
  /* overflow: hidden; */
}

.notation__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;

  button {
    margin-bottom: 15px;
  }
}
</style>
