<script setup lang="ts">
const props = defineProps<{
  color: String
}>()
</script>

<template>
  <div
    class="cell"
    :class="[
      { cell_color_white: props.color === 'white' },
      { cell_color_black: props.color === 'black' }
    ]"></div>
</template>

<style>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
}

.cell_color_white {
  background-color: bisque;
}

.cell_color_black {
  background-color: burlywood;
}
</style>
