<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useStore } from '../stores/board'
import MyRook from '/src/components/pieces/MyRook.vue'
import MyKnight from '/src/components/pieces/MyKnight.vue'
import MyBishop from '/src/components/pieces/MyBishop.vue'
import MyQueen from '/src/components/pieces/MyQueen.vue'
import MyKing from '/src/components/pieces/MyKing.vue'
import MyPawn from '/src/components/pieces/MyPawn.vue'

const props = defineProps<{
  piece: string
  squareColor: 'white' | 'black'
  pos: Array<number>
  isActive: boolean
}>()

const store = useStore()

const toUpperCase = (char: string): string => char.toString().toUpperCase()
const isUpperCase = (char: string): boolean => char === toUpperCase(char)

const isActive = computed<boolean>(() => {
  return props.isActive && store.getPiece(props.pos[0], props.pos[1]) !== ''
})

function getPos(pos: Array<number>): void {
  store.setActive(pos)
}

function onDragStart(event: DragEvent, piece: string, pos: Array<number>): any {
  if (event.dataTransfer !== null) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('piece', piece)
    store.setActive(pos)
  }
}

function onDrop(event: DragEvent, pos: Array<number>): void {
  if (event.dataTransfer !== null) {
    const piece: string = event.dataTransfer.getData('piece')
    if (piece === '') return
    const targetIndex: number = pos[0] + pos[1] * 8
    store.setPiece(store.getActiveIndex(), '') // cleaning the square
    store.setPiece(targetIndex, piece) // setting piece in the target square
  }
}
</script>

<template>
  <div
    @click="getPos(props.pos)"
    class="square"
    :class="[
      { square_color_white: props.squareColor === 'white' },
      { square_color_black: props.squareColor === 'black' },
      { square_color_active: isActive }
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
      draggable="true"
      @dragstart="onDragStart($event, props.piece, props.pos)"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
  </div>
</template>

<style>
.grabbed {
  cursor: pointer;
}

.square {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
}

.square_color_white {
  background-color: hsl(37, 66%, 83%);
}

.square_color_black {
  background-color: hsl(27, 36%, 55%);
}

.square_color_active {
  background-color: lightgreen;
}
</style>
