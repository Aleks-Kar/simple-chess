<script setup lang="ts">
import { useStore } from '../stores/board'

const store = useStore()
</script>

<template>
  <div class="notation">
    {{ store.turn === 'black' ? 'ход чёрных' : 'ход белых' }}
    {{store.activeIndex}}
  </div>
</template>

<style>
.notation {
  width: 400px;
  height: 300px;
  margin-left: 50px;
  border: 1px solid black;
}
</style>
