<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '../stores/board'
import MySquare from '@/components/MySquare.vue'

const store = useStore()

function getKey(x: number, y: number): string {
  return store.getPiece(x + y * 8) + String(x + y * 8)
}

onMounted(() => {
  if (localStorage.board) {
    const obj = JSON.parse(localStorage.board)
    store.arrangement = obj.arrangement
    store.turn = obj.turn
    store.lastMove = obj.lastMove
    store.lWhiteRookHadBeenMoved = obj.lWhiteRookHadBeenMoved
    store.whiteKingHadBeenMoved = obj.whiteKingHadBeenMoved
    store.rWhiteRookHadBeenMoved = obj.rWhiteRookHadBeenMoved
    store.lBlackRookHadBeenMoved = obj.lBlackRookHadBeenMoved
    store.blackKingHadBeenMoved = obj.blackKingHadBeenMoved
    store.rBlackRookHadBeenMoved = obj.rBlackRookHadBeenMoved
    store.calculateAttacks()
  } else {
    store.init()
  }
})
</script>

<template>
  <div class="board">
    <div class="board_naming_vertical">
      <div v-for="number in '87654321'">{{ number }}</div>
    </div>
    <div>
      <div class="board__field">
        <div v-for="(_, y) in 8" class="board__row">
          <MySquare
            v-for="(_, x) in 8"
            :key="getKey(x, y)"
            :id="`square${x + y * 8}`"
            :index="x + y * 8" />
        </div>
      </div>
      <div class="board_naming_horizontal">
        <div v-for="char in 'ABCDEFGH'">{{ char }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.board {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: hsl(29, 34%, 55%);
  user-select: none;
}

.board__field {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 800px;
  margin-top: 40px;
  margin-right: 40px;
  border: 4px solid black;
}

.board__row {
  display: flex;
  width: 800px;
  height: 100px;
}

.board_naming_horizontal {
  display: flex;
  justify-content: flex-start;
  width: 800px;
  color: black;
}

.board_naming_horizontal > div {
  text-align: center;
  width: 20px;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  font-weight: bold;
}

.board_naming_horizontal > div:first-child {
  margin-left: 40px;
}

.board_naming_horizontal > div + div {
  margin-left: 80px;
}

.board_naming_vertical {
  height: 800px;
  color: black;
}

.board_naming_vertical > div {
  text-align: center;
  width: 40px;
  height: 40px;
  font-size: 30px;
  font-weight: bold;
}

.board_naming_vertical > div:first-child {
  margin-top: 30px;
}

.board_naming_vertical > div + div {
  margin-top: 60px;
}
</style>
