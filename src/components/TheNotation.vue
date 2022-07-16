<script setup lang="ts">
import { toRef, watch } from 'vue'

const props = defineProps<{
  turn: string
  moveFrom?: number
  moveTo?: number
  targetPiece: string
}>()

// watch(
//   () => props.board,
//   (newValue, oldValue) => {
//     console.warn(newValue, oldValue)
//   }
// )

watch(
  () => props.moveFrom,
  (newValue, oldValue) => {
    console.warn(newValue, oldValue)
  }
)

const whiteMoves: string[] = []
</script>

<template>
  <div class="notation">
    <div class="notation__title">
      <div>
        {{ props.turn === 'black' ? 'Ход чёрных' : 'Ход белых' }},
        <!-- {{ props.pieceCapture ? 'взятие фигуры' : 'пустая клетка' }} -->
      </div>
    </div>
    <div class="notation__table">
      <div class="notation__table_column_first">
        <div>№</div>
        <div v-for="number in 20">{{ number }}</div>
      </div>
      <div class="notation__table_column_second">
        <div>белые</div>
        <div v-for="move in 20">{{ move }}</div>
      </div>
      <div class="notation__table_column_third">
        <div>чёрные</div>
        <div></div>
      </div>
    </div>
  </div>
  <div></div>
</template>

<style>
.notation {
  font-size: 25px;
  color: black;
  text-align: center;
}

.notation__title {
  height: 35px;
  width: 286px;
  line-height: 35px;
  background-color: pink;
  border: 3px solid black;
  overflow: hidden;
}

.notation__table {
  display: flex;
  background-color: hsl(74, 50%, 70%);
}

.notation__table_column_first {
  width: 40px;
  border-left: 3px solid black;
  border-bottom: 3px solid black;
}

.notation__table_column_second,
.notation__table_column_third {
  width: 120px;
  border-bottom: 3px solid black;
}

.notation__table_column_first,
.notation__table_column_second,
.notation__table_column_third {
  border-right: 3px solid black;
}

.notation__table_column_first > div:first-child,
.notation__table_column_second > div:first-child,
.notation__table_column_third > div:first-child {
  height: 35px;
  line-height: 35px;
  border-bottom: 3px solid black;
}
</style>
