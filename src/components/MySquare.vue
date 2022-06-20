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

function markActive(pos: Array<number>): void {
  if (
    (props.piece.toLowerCase() === props.piece && store.side === 'white') ||
    (props.piece.toUpperCase() === props.piece && store.side === 'black')
  )
    return

  if (store.isActive(pos[0], pos[1])) {
    store.squaresForMove.fill(false)
  } else {
    // setting all the moveable squares
    store.setMoveableSquares(
      getMoveableSquares(store.pieces, props.piece, pos[0], pos[1])
    )
  }
  store.toggleActiveSquare(pos)
}

function onDragStart(
  event: DragEvent,
  piece: string,
  pos: Array<number>
): void {
  // block movement of the white or black pieces
  if (piece.toLowerCase() === piece && store.side === 'white') return
  if (piece.toUpperCase() === piece && store.side === 'black') return

  if (piece === '') return // the square is empty

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('piece', piece)
    store.toggleActiveSquare(pos)
    store.setMoveableSquares(
      getMoveableSquares(store.pieces, piece, pos[0], pos[1])
    )
  }
}

function onDrop(event: DragEvent, pos: Array<number>): void {
  if (event.dataTransfer) {
    if (!store.isMoveable(pos[0], pos[1])) {
      // the square isn't moveable
      store.clearActiveSquare()
      store.squaresForMove = []
      return
    }

    const piece: string = event.dataTransfer.getData('piece')
    // if (piece === '') return // the square is empty
    const targetIndex: number = pos[0] + pos[1] * 8 // index of the target square
    console.warn('targetIndex', targetIndex)

    store.setPiece(store.indexActiveSquare, '') // cleaning the init square
    console.warn('indexActiveSquare', store.indexActiveSquare)

    store.setPiece(targetIndex, piece) // setting piece in the target square
    store.squaresForMove = [] // clear moveable squares
    store.toggleSide()
  }

  store.squaresForMove = []
}
</script>

<template>
  <!-- <div>{{ props.pos[0] + props.pos[1] * 8 }}</div> -->
  <div
    @click="markActive(props.pos)"
    class="square"
    :class="[
      { square_color_white: props.squareColor === 'white' },
      { square_color_black: props.squareColor === 'black' },
      { square_color_active: isActive },
      { square_color_moveable: isMoveable }
    ]"
    @drop="onDrop($event, props.pos)"
    @dragenter.prevent
    @dragover.prevent>
    <MyRook
      v-if="toUpperCase(props.piece) === 'R'"
      draggable="true"
      @dragstart="onDragStart($event, props.piece, props.pos)"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyKnight
      v-if="toUpperCase(props.piece) === 'N'"
      draggable="true"
      @dragstart="onDragStart($event, props.piece, props.pos)"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyBishop
      v-if="toUpperCase(props.piece) === 'B'"
      draggable="true"
      @dragstart="onDragStart($event, props.piece, props.pos)"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyQueen
      v-if="toUpperCase(props.piece) === 'Q'"
      draggable="true"
      @dragstart="onDragStart($event, props.piece, props.pos)"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyKing
      v-if="toUpperCase(props.piece) === 'K'"
      draggable="true"
      @dragstart="onDragStart($event, props.piece, props.pos)"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyPawn
      v-if="toUpperCase(props.piece) === 'P'"
      class="pawn"
      :draggable="true"
      @dragstart="onDragStart($event, props.piece, props.pos)"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
  </div>
</template>

<style>
.square {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
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
