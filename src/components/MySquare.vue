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
  identifier: number
  squareColor: 'white' | 'black'
  pos: Array<number>
  isActive: boolean
  isMoveable: boolean
}>()

const store = useStore()

const isWhite = (): boolean => props.identifier > 47
const pieceUC = String(
  store.pieces[props.pos[0] + props.pos[1] * 8]
).toUpperCase()

const isDraggable = computed<boolean>(() => {
  return (
    (props.identifier < 16 && store.side === 'black') ||
    (props.identifier > 47 && store.side === 'white')
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

function mouseDown(e: MouseEvent): void {
  const svgElement: SVGSVGElement | null = document.body.querySelector(
    `#square${props.identifier} svg`
  )

  store.draggedItem = svgElement
  store.draggedIdentifier = props.identifier

  if (svgElement) svgElement.style.position = 'relative'

  store.cx = e.clientX - (e.offsetX - 45)
  store.cy = e.clientY - (e.offsetY - 45)
}

// function mouseUp(e: MouseEvent): void {
//   store.pieces[store.draggedIdentifier] = '' // delete the dragged piece
//   store.draggedItem = document.body.querySelector('.board')
//   store.cx = 0
//   store.cy = 0
// }
</script>

<template>
  <div
    class="square"
    @mousedown="mouseDown($event)"
    :class="[
      { square_color_white: props.squareColor === 'white' },
      { square_color_black: props.squareColor === 'black' },
      { square_color_active: isActive },
      { square_color_moveable: isMoveable }
    ]">
    <MyRook v-if="pieceUC === 'R'" :color="isWhite() ? 'white' : 'black'" />
    <MyKnight v-if="pieceUC === 'N'" :color="isWhite() ? 'white' : 'black'" />
    <MyBishop v-if="pieceUC === 'B'" :color="isWhite() ? 'white' : 'black'" />
    <MyQueen v-if="pieceUC === 'Q'" :color="isWhite() ? 'white' : 'black'" />
    <MyKing v-if="pieceUC === 'K'" :color="isWhite() ? 'white' : 'black'" />
    <MyPawn v-if="pieceUC === 'P'" :color="isWhite() ? 'white' : 'black'" />
  </div>
</template>

<style>
.move {
  background-color: green;
}

.square {
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  cursor: grab;
  pointer-events: none;
}

.square:active {
  cursor: grabbing;
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
