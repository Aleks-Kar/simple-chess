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
    // castling
    if (props.turn === 'black') {
      if (props.move[0] === 4 && props.move[1] === 6) return '0-0'
      if (props.move[0] === 4 && props.move[1] === 2) return '0-0-0'
    } else if (props.turn === 'white') {
      if (props.move[0] === 60 && props.move[1] === 62) return '0-0'
      if (props.move[0] === 60 && props.move[1] === 58) return '0-0-0'
    }
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
    /* the first condition protects against a false entry
    in the local storage after the page is reloaded */
    if (getMoveNotation() !== '') {
      if (
        props.turn === 'black' &&
        notation.whiteMoves[notation.whiteMoves.length - 1] !==
          getMoveNotation()
      ) {
        notation.whiteMoves.push(getMoveNotation())
      } else if (
        props.turn === 'white' &&
        notation.blackMoves[notation.blackMoves.length - 1] !==
          getMoveNotation()
      ) {
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

<style lang="scss">
$table-border: 3px solid black;
$row-height: 50px;

.notation {
  font-size: 30px;
  color: black;
  text-align: center;
  vertical-align: middle;
  border-collapse: collapse;

  &__title {
    height: $row-height;
    border: $table-border;
    background-color: hsl(245, 55%, 75%);
    user-select: none;
  }
}

.notation__row {
  & + & {
    cursor: v-bind(cursor);
  }

  &:last-child {
    border-bottom: $table-border;
  }
}

.notation__cell {
  height: $row-height;
  border-left: $table-border;
  border-right: $table-border;

  &:first-child {
    width: 60px;
  }

  & + & {
    width: 140px;
  }

  &_background_green {
    background-color: hsl(120, 35%, 55%);
  }

  &_background_light-green {
    background-color: hsl(120, 35%, 70%);
  }
}
</style>
