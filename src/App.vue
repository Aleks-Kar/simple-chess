<script setup lang="ts">
import TheBoard from './components/TheBoard.vue'
</script>

<template>
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
  background-color: rgb(105, 172, 141);
  overflow: hidden;
}
</style>
