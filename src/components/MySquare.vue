<script setup lang="ts">
import { computed, reactive } from '@vue/reactivity'
import { useStore } from '../stores/board'
import MyRook from '/src/components/pieces/MyRook.vue'
import MyKnight from '/src/components/pieces/MyKnight.vue'
import MyBishop from '/src/components/pieces/MyBishop.vue'
import MyQueen from '/src/components/pieces/MyQueen.vue'
import MyKing from '/src/components/pieces/MyKing.vue'
import MyPawn from '/src/components/pieces/MyPawn.vue'
import { getMoveableSquares } from '../services/helpers'

const props = defineProps<{
  piece: string
  squareColor: 'white' | 'black'
  pos: Array<number>
  isActive: boolean
  isMoveable: boolean
}>()

const store = useStore()

const toUpperCase = (char: string): string => char.toString().toUpperCase()
const isUpperCase = (char: string): boolean => char === toUpperCase(char)

const isDraggable = computed<boolean>(() => {
  return (
    (props.piece.toLowerCase() === props.piece && store.side === 'black') ||
    (props.piece.toUpperCase() === props.piece && store.side === 'white')
  )
})

const isActive = computed<boolean>(() => {
  return props.isActive && store.getPiece(props.pos[0], props.pos[1]) !== ''
})

const isMoveable = computed<boolean>(() => {
  return props.isMoveable && store.getPiece(props.pos[0], props.pos[1]) === ''
})

// function markActive(pos: Array<number>): void {
function markActive(e: any): void {
  store.draggedItem = e.target
  console.warn(e.target)
}

function mouseDown(e: any): any {
  if (e.target === undefined && e.target === null) return
  // if (e.target.toString() === '[object HTMLDivElement]') return

  store.draggedItem = e.target
  store.draggedItem.style.position = 'relative'

  store.cx = e.clientX - 45
  store.cy = e.clientY - 45

  // store.ox = e.offsetX - 45
  // store.ox = e.offsetY - 45
}

function mouseMove(e: any): any {
  if (store.draggedItem === null) return
  store.draggedItem.style.left = `${e.clientX - store.cx - 45}px`
  store.draggedItem.style.top = `${e.clientY - store.cy - 45}px`
}

function mouseUp(e: any): any {
  store.draggedItem = e.target
  store.draggedItem.style.position = 'static'
  store.cx = 0
  store.cy = 0
}
</script>

<template>
  <div
    class="square"
    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseup="mouseUp($event)"
    :class="[
      { square_color_white: props.squareColor === 'white' },
      { square_color_black: props.squareColor === 'black' },
      { square_color_active: isActive },
      { square_color_moveable: isMoveable }
    ]">
    <MyRook
      v-if="toUpperCase(props.piece) === 'R'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyKnight
      v-if="toUpperCase(props.piece) === 'N'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyBishop
      v-if="toUpperCase(props.piece) === 'B'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyQueen
      v-if="toUpperCase(props.piece) === 'Q'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyKing
      v-if="toUpperCase(props.piece) === 'K'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyPawn
      v-if="toUpperCase(props.piece) === 'P'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
  </div>
</template>

<style>
/* #pawn {
  z-index: 1;
  position: absolute;
  pointer-events: stroke;
  cursor: pointer;
} */

.move {
  background-color: green;
}
/* .container > svg {
  cursor: grab;
}

body.drag .container > svg {
  cursor: grabbing;
  background-color: aqua;
} */

.square {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  pointer-events: none;
}

.square:active {
  z-index: 10;
}
.square_color_white {
  background-color: hsl(40, 63%, 82%);
}

.square_color_black {
  background-color: hsl(29, 34%, 55%);
}

.square_color_active {
  background-color: hsl(120, 40%, 60%);
}

.square_color_moveable {
  background-color: aqua;
}

/* .square_color_moveable::after {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: hsl(120, 40%, 60%);
} */

.square_color_attacked {
  border: 0 solid transparent;
  border-radius: 50%;
}
</style>
