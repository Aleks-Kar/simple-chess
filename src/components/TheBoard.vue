<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '../stores/board'
import MySquare from './MySquare.vue'
import { getMoveableSquares } from '../services/helpers'
import { callExpression } from '@babel/types'

const store = useStore()

function fn(): void {
  store.$reset()
  store.init()
}

function getKey(x: number, y: number): string {
  return store.getPieceFromPos(x, y) + String(x + y * 8)
}

onMounted(() => {
  store.init()
})
</script>

<template>
  <button @click="fn">проверка</button>
  <div class="board">
    <div v-for="(row, y) in 8" class="board__row">
      <MySquare
        v-for="(square, x) in 8"
        :key="getKey(x, y)"
        :id="`square${x + y * 8}`"
        :square-index="x + y * 8"
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
  width: 800px;
  height: 800px;
  background-color: hsl(120, 50%, 60%);
}

.board__row {
  display: flex;
}
</style>
