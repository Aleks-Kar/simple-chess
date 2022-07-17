<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  turn: string
  board: Array<string>
  move?: Array<number>
  hadCaptured?: string
}>()

let whiteMoves: string[] = []
let blackMoves: string[] = []

function getCoord(index: number): string {
  const y = Math.trunc(index / 8)
  const x = index - y * 8
  return 'abcdefgh'[x] + (y + 1)
}

const getMoveNotation = function (): string {
  if (!props.move) return ''

  const initialPos = props.move[0]
  const targetPos = props.move[1]
  const piece = props.board[props.move[1]].toUpperCase()
  const separator = props.hadCaptured?.length === 0 ? '—' : ':'

  if (piece === 'R') {
    return `♖${getCoord(initialPos)}${separator}${getCoord(targetPos)}`
  } else if (piece === 'N') {
    return `♘${getCoord(initialPos)}${separator}${getCoord(targetPos)}`
  } else if (piece === 'B') {
    return `♗${getCoord(initialPos)}${separator}${getCoord(targetPos)}`
  } else if (piece === 'Q') {
    return `♕${getCoord(initialPos)}${separator}${getCoord(targetPos)}`
  } else if (piece === 'K') {
    return `♔${getCoord(initialPos)}${separator}${getCoord(targetPos)}`
  } else {
    return `${getCoord(initialPos)}${separator}${getCoord(targetPos)}`
  }
}

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
    <tr class="notation__row">
      <th class="notation__title">№</th>
      <th class="notation__title">Белые</th>
      <th class="notation__title">Чёрные</th>
    </tr>

    <tr v-for="num in 10" class="notation__row">
      <td class="notation__cell">{{ num }}</td>
      <td class="notation__cell">{{ whiteMoves[num - 1] }}</td>
      <td class="notation__cell">{{ blackMoves[num - 1] }}</td>
    </tr>
  </div>
  <div></div>
</template>

<style>
:root {
  --table-border: 2px solid black;
}

.notation {
  font-size: 25px;
  color: black;
  text-align: center;
  border-collapse: collapse;
}

.notation__title {
  border: var(--table-border);
}

.notation__row:last-child {
  border-bottom: var(--table-border);
}

.notation__cell {
  border-left: var(--table-border);
  border-right: var(--table-border);
}

.notation__cell:first-child {
  width: 50px;
}

.notation__cell + .notation__cell {
  width: 120px;
}
</style>
