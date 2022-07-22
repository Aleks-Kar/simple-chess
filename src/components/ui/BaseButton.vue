<script setup lang="ts"></script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style>
.button {
  width: 220px;
  height: 70px;
  font-size: 35px;
  background-color: hsl(84, 70%, 90%);
  border: 3px solid black;
  border-radius: 20px;
  user-select: none;
}

.button:active {
  background-color: hsl(84, 70%, 60%);
}
</style>
