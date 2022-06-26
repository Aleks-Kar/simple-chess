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
  index: number
}>()

const store = useStore()

const colorOfTurn = computed<string>(() => {
  if (store.turn === 'white') {
    return 'hsl(300, 50%, 55%)'
  } else {
    return 'hsl(240, 60%, 55%)'
  }
})

const piece = String(store.pieces[props.index]).toUpperCase()

// const isDraggable = computed<boolean>(() => {
//   return (
//     (props.squareIndex < 16 && store.side === 'black') ||
//     (props.squareIndex > 47 && store.side === 'white')
//   )
// })

const isMoveable = computed<boolean>(() => {
  return (
    store.squaresForMove[props.index] &&
    store.getPiece(props.index) === '' &&
    props.index !== store.hoverSquareIndex
  )
})

const isImmoveable = computed<boolean>(() => {
  return (
    !store.squaresForMove[props.index] &&
    props.index === store.hoverSquareIndex &&
    props.index !== store.dragIndex
  )
})

const isHover = computed<boolean>(() => {
  return props.index === store.hoverSquareIndex
})

const isAttacked = computed<boolean>(() => {
  return store.squaresForMove[props.index] && store.getPiece(props.index) !== ''
})

function mouseDown(e: MouseEvent): void {
  if (store.indexActiveSquare !== 64 && props.index === store.indexActiveSquare)
    store.isReactivated = true

  store.lmbIsPressed = true
  store.dragIndex = props.index

  if (!store.isReactivated) {
    // activate the square
    store.indexActiveSquare = props.index
    // if (store.turn === 'white') {
    //   store.indexActiveSquares[0] = props.index
    // } else {
    //   store.indexActiveSquares[2] = props.index
    // }

    // console.warn(store.indexActiveSquares)

    // showing moveable squares
    store.setMoveableSquares(
      getMoveableSquares(store.pieces, store.pieces[props.index], props.index)
    )
  }

  // preparing for the dragging
  const boardPos: any = document.body
    .querySelector('.board')
    ?.getBoundingClientRect()
  store.boardLeft = Math.round(boardPos.left)
  store.boardTop = Math.round(boardPos.top)

  const svgElement: SVGSVGElement | null = document.body.querySelector(
    `#square${props.index} svg`
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
    @mousedown="mouseDown($event)"
    :class="[
      { square_background_white: store.isWhiteSquare(props.index) },
      { square_background_black: !store.isWhiteSquare(props.index) },
      { square_active: store.indexActiveSquare === props.index },
      {
        'square_last-moves_for-white':
          store.lastMoves.includes(props.index) &&
          store.isWhiteSquare(props.index)
      },
      {
        'square_last-moves_for-black':
          store.lastMoves.includes(props.index) &&
          !store.isWhiteSquare(props.index)
      },
      { square_moveable: isMoveable },
      // { square_immoveable: isImmoveable },
      { square_hover: isHover && !isImmoveable }
      // { square_attacked: isAttacked }
    ]">
    <MyRook
      v-if="piece === 'R'"
      :color="store.getPieceColor(props.index)"
      :attacked="isAttacked" />
    <MyKnight
      v-if="piece === 'N'"
      :color="store.getPieceColor(props.index)"
      :attacked="isAttacked" />
    <MyBishop
      v-if="piece === 'B'"
      :color="store.getPieceColor(props.index)"
      :attacked="isAttacked" />
    <MyQueen
      v-if="piece === 'Q'"
      :color="store.getPieceColor(props.index)"
      :attacked="isAttacked" />
    <MyKing
      v-if="piece === 'K'"
      :color="store.getPieceColor(props.index)"
      :attacked="isAttacked" />
    <MyPawn
      v-if="piece === 'P'"
      :color="store.getPieceColor(props.index)"
      :attacked="isAttacked" />
    <!-- {{ props.index }} -->
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

.square_background_white {
  background-color: hsl(40, 63%, 82%);
}

.square_background_black {
  background-color: hsl(29, 34%, 55%);
}

.square_active {
  /* border: 5px solid hsl(180, 70%, 55%); */
  border: 5px solid hsl(120, 70%, 40%);
}

.square_last-moves_for-white {
  /* border: 5px solid hsl(240, 75%, 55%); */
  background-color: hsl(63, 53%, 63%);
}

.square_last-moves_for-black {
  /* border: 5px solid hsl(240, 75%, 55%); */
  background-color: hsl(56, 48%, 45%);
}
/* .square_moveable {
  background-color: green;
} */

.square_moveable::after {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: hsl(120, 70%, 40%);
}

.square_color_immoveable {
  background-color: hsl(0, 100%, 60%);
}

.square_hover {
  border: 5px solid hsl(120, 70%, 40%);
}

.square_attacked {
  border: 5px solid transparent;
  border-radius: 50%;
}
</style>
