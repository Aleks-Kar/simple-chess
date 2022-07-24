<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useStore } from '../stores/board'
import MyPiece from '@/components/MyPiece.vue'

const props = defineProps<{ index: number }>()
const store = useStore()

const piece = store.getPiece(props.index)
const index = props.index

/* THE MOUSE DOWN EVENT */
function mouseDown(e: MouseEvent): void {
  store.mouseDownHandler(e, index)
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
    <!-- {{ props.index }} -->
    <MyPiece
      v-if="piece"
      :piece="piece"
      :index="index"
      :color="store.getPieceColor(index)"
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
  border: 5px solid $color_safe;
}

.square_active_unsafe {
  border: 5px solid $color_unsafe;
}

.square_last-moves_for-white {
  background-color: hsl(65, 50%, 60%);
}

.square_last-moves_for-black {
  background-color: hsl(55, 50%, 40%);
}

.square_moveable_safe::after,
.square_moveable_unsafe::after {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.square_moveable_safe::after {
  background-color: $color_safe;
}

.square_moveable_unsafe::after {
  background-color: $color_unsafe;
}

.square_immoveable {
  background-color: hsl(0, 100%, 58%);
}

.square_hover_safe {
  border: 5px solid $color_safe;
}

.square_hover_unsafe {
  border: 5px solid $color_unsafe;
}
</style>
