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

/* THE MOUSE DOWN EVENT */
function mouseDown(e: MouseEvent): void {
  if (store.turn !== store.getPieceColor(props.index)) return
  if (store.activeIndex !== 64 && props.index === store.activeIndex)
    store.isReactivated = true

  store.lmbIsPressed = true
  store.dragIndex = props.index

  if (!store.isReactivated) {
    store.activeIndex = props.index

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
  const boardPos: DOMRect | undefined = document.body
    .querySelector('.board')
    ?.getBoundingClientRect()

  if (boardPos) store.boardLeft = Math.round(boardPos.left)
  if (boardPos) store.boardTop = Math.round(boardPos.top)

  const svgElement: SVGSVGElement | null = document.body.querySelector(
    `#square${props.index} svg`
  )

  store.draggedItem = svgElement
  if (svgElement) svgElement.style.position = 'relative'

  store.cx = e.clientX - (e.offsetX - 45)
  store.cy = e.clientY - (e.offsetY - 45)
}

/* UI VARIABLES */
const isWhiteSquare = computed<boolean>(() => store.isWhiteSquare(props.index))
const isLastMove = computed<boolean>(() => store.lastMove.includes(props.index))
const isActive = computed<boolean>(() => props.index === store.activeIndex)

const isHover = computed<boolean>(() => {
  return props.index !== store.activeIndex && props.index === store.hoverIndex
})

const isAlly = computed<boolean>(() => {
  return (
    store.getPiece(props.index) !== '' &&
    store.getPieceColor(props.index) === store.turn
  )
})

const isSafe = computed<boolean>(() => {
  return (
    (store.underWhiteAttack[props.index] === 0 && store.turn === 'black') ||
    (store.underBlackAttack[props.index] === 0 && store.turn === 'white')
  )
})

const isMoveable = computed<boolean>(() => {
  return store.squaresForMove[props.index] && props.index !== store.activeIndex
})

const isAttacked = computed<boolean>(() => {
  const i = props.index
  return (
    (store.underWhiteAttack[i] > 0 && !store.isWhitePiece(i)) ||
    (store.underBlackAttack[i] > 0 && store.isWhitePiece(i))
  )
})

const isDefended = computed<boolean>(() => {
  const i = props.index
  return (
    (store.underWhiteAttack[i] > 0 && store.isWhitePiece(i)) ||
    (store.underBlackAttack[i] > 0 && !store.isWhitePiece(i))
  )
})
</script>

<template>
  <div
    class="square"
    @mousedown="mouseDown($event)"
    :class="[
      { square_background_white: isWhiteSquare },
      { square_background_black: !isWhiteSquare },
      { 'square_last-moves_for-white': isLastMove && isWhiteSquare },
      { 'square_last-moves_for-black': isLastMove && !isWhiteSquare },
      { square_cursor_pointer: hasCursor },
      { square_active_safe: isActive && isSafe },
      { square_active_unsafe: isActive && !isSafe },
      { square_moveable_safe: isMoveable && isSafe && !isHover },
      { square_moveable_unsafe: isMoveable && !isSafe && !isHover },
      { square_immoveable: isHover && (!isMoveable || isAlly) },
      { square_hover_safe: isHover && isSafe && isMoveable && !isAlly },
      { square_hover_unsafe: isHover && !isSafe && isMoveable && !isAlly }
    ]">
    <MyPiece
      v-if="store.getPiece(props.index)"
      :piece="piece"
      :index="props.index"
      :color="store.getPieceColor(props.index)"
      :attacked="isAttacked"
      :defended="isDefended" />
  </div>
</template>

<style>
:root {
  --color_safe: hsl(240, 70%, 50%);
  --color_unsafe: hsl(0, 100%, 60%);
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
  user-select: none;
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

.square_active_safe {
  border: 5px solid var(--color_safe);
}

.square_active_unsafe {
  border: 5px solid var(--color_unsafe);
}

.square_last-moves_for-white {
  background-color: hsl(65, 50%, 60%);
}

.square_last-moves_for-black {
  background-color: hsl(55, 50%, 40%);
}

.square_moveable_safe::after {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color_safe);
}

.square_moveable_unsafe::after {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color_unsafe);
}

.square_immoveable {
  background-color: var(--color_unsafe);
}

.square_hover_safe {
  border: 5px solid var(--color_safe);
}

.square_hover_unsafe {
  border: 5px solid var(--color_unsafe);
}
</style>
