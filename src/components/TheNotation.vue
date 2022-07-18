<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  turn: string
  board: Array<string>
  move?: Array<number>
  hadCaptured?: string
  autoScroll: boolean
}>()

let whiteMoves: string[] = []
let blackMoves: string[] = []

const key = ref(0)
const lowBound = ref(0)
const blackMovesLen = ref(0)

function getCoord(index: number): string {
  const y = Math.trunc(index / 8)
  const x = index - y * 8
  return 'abcdefgh'[x] + (y + 1)
}

const getMoveNotation = function (): string {
  if (!props.move || props.move[0] === 64) return ''

  const initialPos = props.move[0]
  const targetPos = props.move[1]
  const piece = props.board[props.move[1]].toUpperCase()
  const separator = props.hadCaptured?.length === 0 ? '–' : ':'

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

const wheel = function (event: WheelEvent) {
  const range = 10
  if (event.deltaY > 0) {
    if (blackMovesLen.value === 0 || blackMovesLen.value < lowBound.value + 10)
      return
    lowBound.value += range
  } else {
    if (lowBound.value === 0) return
    lowBound.value -= range
  }
}

const cursor = computed<string>(() => {
  if (blackMovesLen.value < 10) {
    return 'auto'
  } else {
    return 'ns-resize'
  }
})

watch(
  () => props.turn,
  () => {
    if (props.move) {
      if (props.turn === 'black') {
        whiteMoves.push(getMoveNotation())
        localStorage.notationWhite = JSON.stringify(whiteMoves)
        console.warn(whiteMoves)
      } else if (props.turn === 'white') {
        blackMovesLen.value++
        blackMoves.push(getMoveNotation())
        localStorage.notationBlack = JSON.stringify(blackMoves)
        if (
          props.autoScroll &&
          blackMovesLen.value !== 0 &&
          blackMovesLen.value % 10 === 0
        ) {
          lowBound.value = blackMovesLen.value
        }
      }
      update()
    }
  }
)

const update = () => key.value++

onMounted(() => {
  // loads local storage values to the notation table
  if (localStorage.notationWhite) {
    const arr = JSON.parse(localStorage.notationWhite)
    whiteMoves.push(...arr)
  }
  if (localStorage.notationBlack) {
    const arr = JSON.parse(localStorage.notationBlack)
    blackMoves.push(...arr)
  }
  update()
})

const fn = function () {
  update()
}
</script>

<template>
  <div class="notation">
    <tr class="notation__row">
      <th class="notation__title">№</th>
      <th class="notation__title">Белые</th>
      <th class="notation__title">Чёрные</th>
    </tr>

    <tr
      v-for="num in 10"
      :key="key"
      class="notation__row"
      :class="[
        { notation__cell_background_green: num % 2 === 0 },
        { 'notation__cell_background_light-green': num % 2 !== 0 }
      ]"
      @wheel.passive="wheel($event)">
      <td class="notation__cell">{{ num + lowBound }}</td>
      <td class="notation__cell">{{ whiteMoves[num + lowBound - 1] }}</td>
      <td class="notation__cell">{{ blackMoves[num + lowBound - 1] }}</td>
    </tr>
  </div>
  <div></div>
</template>

<style>
:root {
  --table-border: 3px solid black;
  --row-height: 50px;
}

.notation {
  font-size: 30px;
  color: black;
  text-align: center;

  vertical-align: middle;
  border-collapse: collapse;
}

.notation__title {
  height: var(--row-height);
  border: var(--table-border);
  background-color: hsl(245, 55%, 75%);
  user-select: none;
}

.notation__row + .notation__row {
  cursor: v-bind(cursor);
}

.notation__row:last-child {
  border-bottom: var(--table-border);
}

.notation__cell {
  height: var(--row-height);
  border-left: var(--table-border);
  border-right: var(--table-border);
}

.notation__cell:first-child {
  width: 60px;
}

.notation__cell + .notation__cell {
  width: 140px;
}

.notation__cell_background_green {
  background-color: hsl(120, 35%, 55%);
}

.notation__cell_background_light-green {
  background-color: hsl(120, 35%, 70%);
}
</style>
