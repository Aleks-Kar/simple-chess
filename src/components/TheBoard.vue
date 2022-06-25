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
  return store.getPiece(x + y * 8) + String(x + y * 8)
}

onMounted(() => {
  store.init()
})
</script>

<template>
  <button @click="fn">проверка</button>
  <div class="info">{{ store.turn }}</div>
  <div class="board">
    <div v-for="(_, y) in 8" class="board__row">
      <MySquare
        v-for="(_, x) in 8"
        :key="getKey(x, y)"
        :id="`square${x + y * 8}`"
        :index="x + y * 8" />
    </div>
  </div>
</template>

<style>
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;

  width: 100px;
  height: 100px;
}

button {
  width: 100px;
  height: 100px;
}

.board {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 800px;
  background-color: hsl(30, 100%, 50%);
}

.board__row {
  display: flex;
}
</style>
