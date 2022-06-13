<script setup lang="ts">
import TheKing from './components/Pieces/TheKing.vue'
import TheQueen from './components/Pieces/TheQueen.vue'
import TheRook from './components/Pieces/TheRook.vue'
import TheBishop from './components/Pieces/TheBishop.vue'
import TheKnight from './components/Pieces/TheKnight.vue'
import ThePawn from './components/Pieces/ThePawn.vue'
import TheBoard from './components/TheBoard.vue'
</script>

<template>
  <!-- <TheKing color="black" /> -->
  <!-- <TheQueen color="black" /> -->
  <!-- <TheRook color="white" /> -->
  <!-- <TheBishop color="white" /> -->
  <!-- <TheKnight color="white" /> -->
  <!-- <ThePawn color="white" /> -->
  <TheBoard />
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: hsl(210, 29%, 24%);
}
</style>
