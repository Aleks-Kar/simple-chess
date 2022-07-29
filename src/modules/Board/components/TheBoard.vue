<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { Board } from '../models/Board'
import { Square } from '../models/Square'
import { useBoardStore } from '../store/board'
import MySquare from './MySquare.vue'
import { Rook } from '../models/pieces/Rook'
import { Piece } from '../models/pieces/Piece'

const store = useBoardStore()

store.chessBoard = new Board()
// console.warn(store.chessBoard.squares[0][0])
const rk = store.chessBoard.squares[0][0].piece

// function getKey(x: number, y: number): string {
//   return board.getPiece(x + y * 8) + String(x + y * 8)
// }

const key = ref(0)

const fn = function () {
  store.chessBoard.setLastMove(24, 25)
  console.warn(store.chessBoard.turn)
}

// onBeforeMount(() => {
//   store.chessBoard = new Board()
// })
</script>

<template>
  <button @click="fn">ДЕЙСТВИЕ</button>

  <div class="board">
    <div class="board_notation_vertical">
      <div v-for="number in '87654321'">{{ number }}</div>
    </div>
    
    <div>
      <div class="board__field">
        <div v-for="(_, y) in 8" class="board__row">
          <MySquare
            v-for="(square, x) in store.chessBoard.squares[y]"
            :key="x + y * 8 + key"
            :id="square.index"
            :square="square" />
        </div>
      </div>

      <div class="board_notation_horizontal">
        <div v-for="char in 'abcdefgh'">{{ char }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$width: 800px;
$height: 800px;
$color_safe: hsl(240, 70%, 50%);
$color_unsafe: hsl(330, 75%, 50%);

button {
  width: 200px;
  height: 70px;
  font-size: 30px;
}

.board {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: hsl(29, 34%, 55%);
  border-radius: 20px;
  user-select: none;

  &__field {
    display: flex;
    flex-direction: column-reverse;
    height: $height;
    margin-top: 40px;
    margin-right: 40px;
    border: 4px solid black;
  }

  &__row {
    display: flex;
    width: $width;
    height: $height;
  }
}

.board_notation_horizontal {
  display: flex;
  font-size: 30px;
  font-weight: bold;

  div {
    text-align: center;
    width: 20px;
    height: 40px;
  }

  div:first-child {
    margin-left: 40px;
  }

  div + div {
    margin-left: 80px;
  }
}

.board_notation_vertical {
  height: $height;
  font-size: 30px;
  font-weight: bold;

  div {
    text-align: center;
    width: 40px;
    height: 40px;
  }

  div:first-child {
    margin-top: 30px;
  }

  div + div {
    margin-top: 60px;
  }
}
</style>
