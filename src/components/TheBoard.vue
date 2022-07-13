<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '../stores/board'
import MySquare from './MySquare.vue'

const store = useStore()

function getKey(x: number, y: number): string {
  return store.getPiece(x + y * 8) + String(x + y * 8)
}

onMounted(() => {
  store.init()
})
</script>

<template>
  <div class="info"></div>
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
.board {
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 800px;
  background-color: hsl(30, 100%, 50%);
  user-select: none;
}

.board__row {
  display: flex;
}
</style>
