<script setup lang="ts">
import { computed, ref } from '@vue/reactivity'
import { useStore } from './stores/board'
import TheBoard from './components/TheBoard.vue'
import TheNotation from './components/TheNotation.vue'
import BaseButton from './components/ui/BaseButton.vue'

const store = useStore()
const key = ref(0)

/* THE MOUSE MOVE EVENT */
function mouseMove(e: MouseEvent): void {
  store.mouseMoveHandler(e)
}

/* THE MOUSE UP EVENT */
function mouseUp(): void {
  store.mouseUpHandler()
}

function mouseLeave(): void {
  if (store.pieceHadBeenMoved && store.dragIndex < 64) store.placePiece()
}

function newGame(): void {
  if (localStorage.board) localStorage.removeItem('board')
  if (localStorage.notation) localStorage.removeItem('notation')
  store.restart()
  update()
}

const turn = computed<string>(() => {
  if (store.underWhiteAttack[0] === undefined) {
    return ''
  } else {
    return store.turn
  }
})

const update = () => key.value++
</script>

<template>
  <div @mousemove="mouseMove" @mouseup="mouseUp" @mouseleave="mouseLeave">
    <TheBoard />
  </div>

  <div class="notation__container">
    <BaseButton @click="newGame">Новая игра</BaseButton>

    <TheNotation
      :key="key"
      :arrangement="store.arrangement"
      :turn="turn"
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
  background-size: cover;
  background-color: hsl(0, 30%, 75%);
  /* overflow: hidden; */
}

.notation__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
}

.notation__container button {
  margin-bottom: 15px;
}
</style>
