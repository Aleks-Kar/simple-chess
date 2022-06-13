<script setup lang="ts">
import TheKing from './components/Pieces/TheKing.vue'
import TheQueen from './components/Pieces/TheQueen.vue'
import TheRook from './components/Pieces/TheRook.vue'
import TheBishop from './components/Pieces/TheBishop.vue'
import TheKnight from './components/Pieces/TheKnight.vue'
import ThePawn from './components/Pieces/ThePawn.vue'
</script>

<template>
  <!-- <TheKing color="black" /> -->
  <!-- <TheQueen color="black" /> -->
  <!-- <TheRook color="white" /> -->
  <!-- <TheBishop color="white" /> -->
  <TheKnight color="white" />
  <!-- <ThePawn color="white" /> -->
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(210, 29%, 24%);
  margin-top: 60px;
}
</style>
