<script setup lang="ts">
import { computed, reactive } from '@vue/reactivity'
import { onMounted, watch } from 'vue'

const props = defineProps<{
  arrangement: string[]
  turn: string
  move: number[]
  hadCaptured: string
  autoScroll: boolean
}>()

const notation: any = reactive({
  whiteMoves: [],
  blackMoves: [],
  lowBound: 0
})

function getCoord(index: number): string {
  const y = Math.trunc(index / 8)
  const x = index - y * 8
  return 'abcdefgh'[x] + (y + 1)
}

const getMoveNotation = function (): string {
  if (!props.move || !props.move[1]) return ''

  const initialPos = props.move[0]
  const targetPos = props.move[1]
  const piece = props.arrangement[props.move[1]].toUpperCase()
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
    if (
      notation.blackMoves.length === 0 ||
      notation.blackMoves.length < notation.lowBound + 10
    )
      return
    notation.lowBound += range
  } else {
    if (notation.lowBound === 0) return
    notation.lowBound -= range
  }
}

const cursor = computed<string>(() => {
  if (notation.blackMoves.length < 10) {
    return 'auto'
  } else {
    return 'ns-resize'
  }
})

watch(
  () => props.turn,
  () => {
    if (props.turn !== '') {
      if (props.turn === 'black') {
        notation.whiteMoves.push(getMoveNotation())
      } else if (props.turn === 'white') {
        notation.blackMoves.push(getMoveNotation())
        const blackMovesLen = notation.blackMoves.length
        if (
          props.autoScroll &&
          blackMovesLen !== 0 &&
          blackMovesLen % 10 === 0
        ) {
          notation.lowBound = blackMovesLen
        }
      }

      localStorage.notation = JSON.stringify(notation)

      console.warn('white', notation.whiteMoves[notation.whiteMoves.length - 1])
      console.warn('black', notation.blackMoves[notation.blackMoves.length - 1])
    }
  }
)

onMounted(() => {
  if (localStorage.notation) {
    const obj = JSON.parse(localStorage.notation)
    for (const key in notation) notation[key] = obj[key]
  }
})
</script>

<template>
  <div class="notation">
    <div>_{{ props.turn }}_</div>
    <tr class="notation__row">
      <th class="notation__title">№</th>
      <th class="notation__title">Белые</th>
      <th class="notation__title">Чёрные</th>
    </tr>

    <tr
      v-for="num in 10"
      class="notation__row"
      :class="[
        { notation__cell_background_green: num % 2 === 0 },
        { 'notation__cell_background_light-green': num % 2 !== 0 }
      ]"
      @wheel.passive="wheel($event)">
      <td class="notation__cell">{{ num + notation.lowBound }}</td>
      <td class="notation__cell">
        {{ notation.whiteMoves[num + notation.lowBound - 1] }}
      </td>
      <td class="notation__cell">
        {{ notation.blackMoves[num + notation.lowBound - 1] }}
      </td>
    </tr>
  </div>
  <div></div>
</template>

<style>
.button {
  width: 100px;
  height: 100px;
  font-size: 30px;
}

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
