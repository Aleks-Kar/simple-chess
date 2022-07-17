<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  turn: string
  board: Array<string>
  move?: Array<number>
  // moveFrom?: number
  // moveTo?: number
}>()

let whiteMoves: string[] = []
let blackMoves: string[] = []

function getCoord(index: number): string {
  const y = Math.trunc(index / 8)
  const x = index - y * 8
  return 'ABCDEFG'[x] + (y + 1)
}

const getMoveNotation = function (): string {
  if (!props.move) return ''

  const initialPos = props.move[0]
  const targetPos = props.move[1]
  const piece = props.board[props.move[1]].toUpperCase()

  if (piece === 'R') {
    return `♖${getCoord(initialPos)}-${getCoord(targetPos)}`
  } else if (piece === 'N') {
    return `♘${getCoord(initialPos)}-${getCoord(targetPos)}`
  } else if (piece === 'B') {
    return `♗${getCoord(initialPos)}-${getCoord(targetPos)}`
  } else if (piece === 'Q') {
    return `♕${getCoord(initialPos)}-${getCoord(targetPos)}`
  } else if (piece === 'K') {
    return `♔${getCoord(initialPos)}-${getCoord(targetPos)}`
  } else {
    return ''
  }
}

// watch(
//   () => props.turn,
//   (newValue, oldValue) => {
//     if (props.turn === 'black') {
//       if (newValue) whiteMoves.push(convertToIcon(props.board[newValue]))
//     } else if (props.turn === 'white') {
//       if (newValue) blackMoves.push(convertToIcon(props.board[newValue]))
//     }
//   }
// )
watch(
  () => props.turn,
  () => {
    if (props.turn === 'black') {
      if (props.move) whiteMoves.push(getMoveNotation())
    } else if (props.turn === 'white') {
      if (props.move) blackMoves.push(getMoveNotation())
    }
  }
)
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
        <div v-for="move in whiteMoves">{{ move }}</div>
      </div>
      <div class="notation__table_column_third">
        <div>чёрные</div>
        <div v-for="move in blackMoves">{{ move }}</div>
      </div>
    </div>
  </div>
  <div></div>
</template>

<style>
.notation {
  font-size: 30px;
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
