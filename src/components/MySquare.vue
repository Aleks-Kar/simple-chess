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
  squareIndex: number
  squareColor: 'white' | 'black'
  pos: Array<number>
  isActive: boolean
  isMoveable: boolean
}>()

const store = useStore()

// const isWhite = computed(() => props.squareIndex > 47)
// const pieceUC = computed(() =>
//   String(store.pieces[props.pos[0] + props.pos[1] * 8]).toUpperCase()
// )

const isWhite =
  store.pieces[props.squareIndex] ===
  String(store.pieces[props.squareIndex]).toUpperCase()

const pieceUC = String(
  store.pieces[props.pos[0] + props.pos[1] * 8]
).toUpperCase()

// const isDraggable = computed<boolean>(() => {
//   return (
//     (props.squareIndex < 16 && store.side === 'black') ||
//     (props.squareIndex > 47 && store.side === 'white')
//   )
// })

// const isActive = computed<boolean>(() => {
//   return (
//     // props.isActive && store.getPieceFromPos(props.pos[0], props.pos[1]) !== ''
//     props.isActive
//   )
// })

const isMoveable = computed<boolean>(() => {
  return (
    props.isMoveable &&
    store.getPieceFromPos(props.pos[0], props.pos[1]) === '' &&
    props.squareIndex !== store.hoverSquareIndex
  )
})

const isImmoveable = computed<boolean>(() => {
  return (
    !props.isMoveable &&
    props.squareIndex === store.hoverSquareIndex &&
    props.squareIndex !== store.dragIndex
  )
})

const isHover = computed<boolean>(() => {
  return props.squareIndex === store.hoverSquareIndex
})

const isAttacked = computed<boolean>(() => {
  return (
    props.isMoveable &&
    store.getPieceFromPos(props.pos[0], props.pos[1]) !== '' &&
    props.squareIndex !== store.hoverSquareIndex
  )
})

function mouseDown(e: MouseEvent): void {
  if (
    store.indexActiveSquares[0] !== 64 &&
    props.squareIndex === store.indexActiveSquares[0]
  )
    store.isReactivated = true

  store.lmbIsPressed = true
  store.dragIndex = props.squareIndex

  if (!store.isReactivated) {
    // activate the square
    if (store.side === 'white') {
      store.indexActiveSquares[0] = props.squareIndex
    } else {
      store.indexActiveSquares[2] = props.squareIndex
    }

    // showing moveable squares
    store.setMoveableSquares(
      getMoveableSquares(
        store.pieces,
        store.pieces[props.squareIndex],
        props.pos[0],
        props.pos[1]
      )
    )
  }

  // preparing for the dragging
  const boardPos: any = document.body
    .querySelector('.board')
    ?.getBoundingClientRect()
  store.boardLeft = Math.round(boardPos.left)
  store.boardTop = Math.round(boardPos.top)

  const svgElement: SVGSVGElement | null = document.body.querySelector(
    `#square${props.squareIndex} svg`
  )

  store.draggedItem = svgElement
  if (svgElement) svgElement.style.position = 'relative'

  store.cx = e.clientX - (e.offsetX - 45)
  store.cy = e.clientY - (e.offsetY - 45)
}
</script>

<template>
  <div
    class="square"
    @click=""
    @mousedown="mouseDown($event)"
    :class="[
      { square_color_white: props.squareColor === 'white' },
      { square_color_black: props.squareColor === 'black' },
      { square_color_active: props.isActive && !isAttacked },
      { square_color_moveable: isMoveable },
      // { square_color_immoveable: isImmoveable },
      { square_color_hover: isHover && !isImmoveable },
      { square_color_attacked: isAttacked }
    ]">
    <MyRook v-if="pieceUC === 'R'" :color="isWhite ? 'white' : 'black'" />
    <MyKnight v-if="pieceUC === 'N'" :color="isWhite ? 'white' : 'black'" />
    <MyBishop v-if="pieceUC === 'B'" :color="isWhite ? 'white' : 'black'" />
    <MyQueen v-if="pieceUC === 'Q'" :color="isWhite ? 'white' : 'black'" />
    <MyKing v-if="pieceUC === 'K'" :color="isWhite ? 'white' : 'black'" />
    <MyPawn v-if="pieceUC === 'P'" :color="isWhite ? 'white' : 'black'" />
    {{ props.pos[0] + props.pos[1] * 8 }}
  </div>
</template>

<style>
/* .move {
  background-color: green;
} */

.square {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  border: 5px solid transparent;
  cursor: pointer;
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
  background-color: hsl(120, 45%, 60%);
}

/* .square_color_moveable {
  background-color: green;
} */

.square_color_moveable::after {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: hsl(120, 45%, 60%);
}

.square_color_immoveable {
  background-color: hsl(0, 100%, 60%);
}

.square_color_hover {
  border: 5px solid hsl(120, 45%, 60%);
}

.square_color_attacked {
  border: 5px solid transparent;
  border-radius: 50%;
}
</style>
