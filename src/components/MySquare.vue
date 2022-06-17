<script setup lang="ts">
import MyRook from '/src/components/pieces/MyRook.vue'
import MyKnight from '/src/components/pieces/MyKnight.vue'
import MyBishop from '/src/components/pieces/MyBishop.vue'
import MyQueen from '/src/components/pieces/MyQueen.vue'
import MyKing from '/src/components/pieces/MyKing.vue'
import MyPawn from '/src/components/pieces/MyPawn.vue'

const props = defineProps<{
  piece: string
  squareColor: 'white' | 'black'
}>()

const toUpperCase = (char: string): string => char.toString().toUpperCase()
const isUpperCase = (char: string): boolean => char === toUpperCase(char)
</script>

<template>
  <div
    class="square"
    :class="[
      { square_color_white: props.squareColor === 'white' },
      { square_color_black: props.squareColor === 'black' }
    ]">
    <MyRook
      v-if="toUpperCase(props.piece) === 'R'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyKnight
      v-if="toUpperCase(props.piece) === 'N'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyBishop
      v-if="toUpperCase(props.piece) === 'B'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyQueen
      v-if="toUpperCase(props.piece) === 'Q'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyKing
      v-if="toUpperCase(props.piece) === 'K'"
      :color="isUpperCase(props.piece) ? 'white' : 'black'" />
    <MyPawn
      v-if="toUpperCase(props.piece) === 'P'"
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
  /* background-image: url(/src/assets/pieces/pawn.svg);
  background-size: cover; */
}

.square_color_white {
  background-color: hsl(37, 66%, 83%);
}

.square_color_black {
  background-color: hsl(27, 36%, 55%);
}

.square__text {
  display: flex;
  vertical-align: center;

  font-size: 60px;
}
</style>
