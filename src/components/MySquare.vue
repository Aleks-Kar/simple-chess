<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useStore } from '../stores/board'
import MyPiece from '/src/components/MyPiece.vue'
import { getAttackedSquares, getPawnMoves } from '../services/helpers'

const props = defineProps<{ index: number }>()
const store = useStore()

const piece = store.getPiece(props.index)
const hasCursor = computed<boolean>(
  () => store.turn === store.getPieceColor(props.index)
)

// THE MOUSE DOWN EVENT
function mouseDown(e: MouseEvent): void {
  if (store.turn !== store.getPieceColor(props.index)) return
  if (store.indexActiveSquare !== 64 && props.index === store.indexActiveSquare)
    store.isReactivated = true

  store.lmbIsPressed = true
  store.dragIndex = props.index

  if (!store.isReactivated) {
    store.indexActiveSquare = props.index

    // showing moveable squares
    if (store.getPiece(props.index).toUpperCase() === 'P') {
      // calculating exclusive moves for a pawn
      store.setMoveableSquares(
        getPawnMoves(store.pieces, store.getPiece(props.index), props.index)
      )
    } else {
      // calculating of moves for other pieces
      store.setMoveableSquares(
        getAttackedSquares(
          store.pieces,
          store.getPiece(props.index),
          props.index
        )
      )
    }
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
    props.index !== store.dragIndex &&
    store.getPieceColor(props.index) === store.turn
  )
})

const isHover = computed<boolean>(() => {
  return props.index === store.hoverSquareIndex
})

// const isAttacked = computed<boolean>(() => {
//   return (
//     store.squaresForMove[props.index] &&
//     store.getPiece(props.index) !== '' &&
//     store.getPieceColor(props.index) !== store.turn
//   )
// })

const attacked = computed<boolean>(() => {
  const i = props.index
  return (
    (store.underWhiteAttack[i].size > 0 && !store.isWhitePiece(i)) ||
    (store.underBlackAttack[i].size > 0 && store.isWhitePiece(i))
  )
})

const defended = computed<boolean>(() => {
  const i = props.index
  return (
    (store.underWhiteAttack[i].size > 0 && store.isWhitePiece(i)) ||
    (store.underBlackAttack[i].size > 0 && !store.isWhitePiece(i))
  )
})
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
      // { for_move: store.squaresForMove[props.index] },
      { square_immoveable: isImmoveable },
      { square_hover: isHover && !isImmoveable },
      { square_cursor_pointer: hasCursor }
    ]">
    {{ props.index }}
    <MyPiece
      v-if="store.getPiece(props.index)"
      :piece="piece"
      :set="store.set"
      :color="store.getPieceColor(props.index)"
      :attacked="attacked"
      :defended="defended" />
  </div>
</template>

<style>
.for_move {
  background-color: green;
}

.square {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  border: 5px solid transparent;
  pointer-events: none;
}

.square:active {
  z-index: 10;
}

.square_cursor_pointer {
  cursor: pointer;
}

.square_background_white {
  background-color: hsl(40, 63%, 82%);
}

.square_background_black {
  background-color: hsl(29, 34%, 55%);
}

.square_active {
  border: 5px solid hsl(120, 70%, 40%);
}

.square_last-moves_for-white {
  background-color: hsl(65, 50%, 60%);
}

.square_last-moves_for-black {
  background-color: hsl(55, 50%, 40%);
}

.square_moveable::after {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: hsl(120, 70%, 40%);
}

.square_immoveable {
  background-color: hsl(0, 100%, 60%);
}

.square_hover {
  border: 5px solid hsl(120, 70%, 40%);
}

.square_attacked {
  border: 5px solid transparent;
  border-radius: 50%;
}

.square_attacked_white {
  background-color: hsl(0, 0%, 100%);
}
.square_attacked_black {
  background-color: hsl(0, 0%, 20%);
}
</style>
