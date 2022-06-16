<script setup lang="ts">
import MyCell from './MyCell.vue'
</script>
<template>
  <div class="board">
    <div v-for="r in 8" class="board__row">
      <MyCell v-for="c in 8" :color="(r + c) % 2 === 0 ? 'white' : 'black'" />
    </div>
  </div>
</template>

<style>
.board {
  display: flex;
  flex-wrap: wrap;
  width: 720px;
  height: 720px;
}

.board__row {
  display: flex;
}
</style>
