<script setup lang="ts">
const props = defineProps<{
  turn: string
  lastMove?: Array<number>
}>()
</script>

<template>
  <div class="notation">
    <div class="notation__title">
      <div>{{ props.turn === 'black' ? 'Ход чёрных' : 'Ход белых' }}</div>
    </div>
    <div class="notation__table">
      <div class="notation__table_first-column">№ хода</div>
      <div class="notation__table_second-column">белые</div>
      <div class="notation__table_third-column">чёрные</div>
    </div>
  </div>
  <div></div>
</template>

<style>
.notation {
  /* width: 345px; */
  /* height: 500px; */
  margin-left: 50px;
  font-size: 25px;
  /* border: 3px solid black; */
}

.notation__title {
  text-align: center;
  height: 50px;
  line-height: 50px;
  background-color: pink;
  border: 3px solid black;
}

.notation__table {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.notation__table_first-column,
.notation__table_second-column,
.notation__table_third-column {
  width: 120px;
  height: auto;

  border-bottom: 3px solid black;
}

.notation__table_first-column {
  border-left: 3px solid black;
}

.notation__table_first-column,
.notation__table_second-column,
.notation__table_third-column {
  border-right: 3px solid black;
}
</style>
