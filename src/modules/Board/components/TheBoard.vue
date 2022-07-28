<script setup lang="ts">
import { onMounted } from 'vue'
import { Board } from '../models/Board'
import { Square } from '../models/Square'
import { useBoardStore } from '../store/board'
import MySquare from './MySquare.vue'

// const chessBoard = useBoardStore()

// function getKey(x: number, y: number): string {
//   return board.getPiece(x + y * 8) + String(x + y * 8)
// }

const chessBoard: Board = new Board()
chessBoard.initSquares()
const squares: Square[][] = chessBoard.squares
console.warn(squares[0])
</script>

<template>
  <div class="board">
    <div class="board_notation_vertical">
      <div v-for="number in '87654321'">{{ number }}</div>
    </div>
    <div>
      <div class="board__field">
        <!-- <div v-for="(_, y) in 8" class="board__row">
          <MySquare
            v-for="(_, x) in 8"
            :key="x + y * 8"
            :id="`square${x + y * 8}`"
            :index="x + y * 8" />
        </div> -->
        <!-- <div v-for="(_, y) in 8" class="board__row">
          <div v-for="square in chessBoard.squares[y]">{{ square }}</div> -->
        <div v-for="(_, y) in 8" class="board__row">
          <div v-for="square in squares[y]" class="square">{{ square.y }}</div>
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
