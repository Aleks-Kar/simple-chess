<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useBoardStore } from '../stores/board'
import MyPiece from '@/components/MyPiece.vue'

const props = defineProps<{ index: number }>()
const board = useBoardStore()

const piece = board.getPiece(props.index)
const index = props.index

/* THE MOUSE DOWN EVENT */
function mouseDown(e: MouseEvent): void {
  board.mouseDownHandler(e, index)
}

/* UI VARIABLES */
const isWhiteSquare = computed<boolean>(() => board.isWhiteSquare(index))
const isLastMove = computed<boolean>(() => board.lastMove.includes(index))
const isActive = computed<boolean>(() => index === board.activeIndex)
const hasCursor = computed<boolean>(
  () => board.turn === board.getPieceColor(index)
)

const isHover = computed<boolean>(() => {
  return index !== board.activeIndex && index === board.hoverIndex
})

const isAlly = computed<boolean>(() => {
  return piece !== '' && board.getPieceColor(index) === board.turn
})

const isSafe = computed<boolean>(() => {
  return (
    (!board.underWhiteAttack[index] && board.turn === 'black') ||
    (!board.underBlackAttack[index] && board.turn === 'white')
  )
})

const isMoveable = computed<boolean>(() => {
  return board.squaresForMove[index] && index !== board.activeIndex
})

const isAttacked = computed<boolean>(() => {
  return (
    (board.underWhiteAttack[index] && !board.isWhitePiece(index)) ||
    (board.underBlackAttack[index] && board.isWhitePiece(index))
  )
})

const isDefended = computed<boolean>(() => {
  return (
    (board.underWhiteAttack[index] && board.isWhitePiece(index)) ||
    (board.underBlackAttack[index] && !board.isWhitePiece(index))
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
    <!-- {{ props.index }} -->
    <MyPiece
      v-if="piece"
      :piece="piece"
      :index="index"
      :color="board.getPieceColor(index)"
      :attacked="isAttacked"
      :defended="isDefended" />
  </div>
</template>

<style lang="scss">
$color_safe: hsl(240, 70%, 50%);
$color_unsafe: hsl(330, 75%, 50%);

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

  &:active {
    z-index: 10;
  }

  &_cursor_pointer {
    cursor: pointer;
  }

  &_background_white {
    background-color: hsl(40, 63%, 82%);
  }

  &_background_black {
    background-color: hsl(29, 34%, 55%);
  }

  &_active_safe {
    border: 5px solid $color_safe;
  }

  &_active_unsafe {
    border: 5px solid $color_unsafe;
  }

  &_last-moves_for-white {
    background-color: hsl(65, 50%, 60%);
  }

  &_last-moves_for-black {
    background-color: hsl(55, 50%, 40%);
  }

  &_moveable_safe::after,
  &_moveable_unsafe::after {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &_moveable_safe::after {
    background-color: $color_safe;
  }

  &_moveable_unsafe::after {
    background-color: $color_unsafe;
  }

  &_immoveable {
    background-color: hsl(0, 100%, 58%);
  }

  &_hover_safe {
    border: 5px solid $color_safe;
  }

  &_hover_unsafe {
    border: 5px solid $color_unsafe;
  }
}
</style>
