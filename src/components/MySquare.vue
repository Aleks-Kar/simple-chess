<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useStore } from '../stores/board'
import { getAttackedSquares, getPawnMoves } from '../services/helpers'
import MyPiece from '/src/components/MyPiece.vue'

const props = defineProps<{ index: number }>()
const store = useStore()

const piece = store.getPiece(props.index)
const index = props.index

/* THE MOUSE DOWN EVENT */
function mouseDown(e: MouseEvent): void {
  if (store.turn !== store.getPieceColor(index)) return
  if (store.activeIndex !== 64 && index === store.activeIndex)
    store.isReactivated = true

  store.lmbIsPressed = true
  store.dragIndex = index

  if (!store.isReactivated) {
    store.activeIndex = index

    // showing moveable squares
    if (piece.toUpperCase() === 'P') {
      // calculating exclusive moves for a pawn
      store.setMoveableSquares(getPawnMoves(store.board, piece, index))
    } else if (piece.toUpperCase() === 'K') {
      // calculating exclusive moves for a king
      const attackedSquares = getAttackedSquares(store.board, piece, index)
      const color = store.getPieceColor(index)

      for (let i = 0; i < 64; i++) {
        if (attackedSquares[i]) {
          if (color === 'white' && store.underBlackAttack[i]) {
            attackedSquares[i] = false
          } else if (color === 'black' && store.underWhiteAttack[i]) {
            attackedSquares[i] = false
          }
        }
      }

      store.setMoveableSquares(attackedSquares)
    } else {
      // calculating of moves for other board
      store.setMoveableSquares(getAttackedSquares(store.board, piece, index))
    }
  }

  // preparing for the dragging
  const boardPos: DOMRect | undefined = document.body
    .querySelector('.board__field')
    ?.getBoundingClientRect()

  if (boardPos) store.boardLeft = Math.round(boardPos.left)
  if (boardPos) store.boardTop = Math.round(boardPos.top)

  const svgElement: SVGSVGElement | null = document.body.querySelector(
    `#square${index} svg`
  )

  store.draggedItem = svgElement
  if (svgElement) svgElement.style.position = 'relative'

  store.cx = e.clientX - (e.offsetX - 45)
  store.cy = e.clientY - (e.offsetY - 45)
}

/* UI VARIABLES */
const isWhiteSquare = computed<boolean>(() => store.isWhiteSquare(index))
const isLastMove = computed<boolean>(() => store.lastMove.includes(index))
const isActive = computed<boolean>(() => index === store.activeIndex)
const hasCursor = computed<boolean>(
  () => store.turn === store.getPieceColor(index)
)

const isHover = computed<boolean>(() => {
  return index !== store.activeIndex && index === store.hoverIndex
})

const isAlly = computed<boolean>(() => {
  return piece !== '' && store.getPieceColor(index) === store.turn
})

const isSafe = computed<boolean>(() => {
  return (
    (!store.underWhiteAttack[index] && store.turn === 'black') ||
    (!store.underBlackAttack[index] && store.turn === 'white')
  )
})

const isMoveable = computed<boolean>(() => {
  return store.squaresForMove[index] && index !== store.activeIndex
})

const isAttacked = computed<boolean>(() => {
  return (
    (store.underWhiteAttack[index] && !store.isWhitePiece(index)) ||
    (store.underBlackAttack[index] && store.isWhitePiece(index))
  )
})

const isDefended = computed<boolean>(() => {
  return (
    (store.underWhiteAttack[index] && store.isWhitePiece(index)) ||
    (store.underBlackAttack[index] && !store.isWhitePiece(index))
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
      v-if="piece"
      :piece="piece"
      :index="index"
      :color="store.getPieceColor(index)"
      :attacked="isAttacked"
      :defended="isDefended" />
  </div>
</template>

<style>
:root {
  --color_safe: hsl(240, 70%, 50%);
  --color_unsafe: hsl(330, 75%, 50%);
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
  background-color: hsl(0, 100%, 58%);
}

.square_hover_safe {
  border: 5px solid var(--color_safe);
}

.square_hover_unsafe {
  border: 5px solid var(--color_unsafe);
}
</style>
