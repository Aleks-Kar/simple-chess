<script setup lang="ts">
import { useStore } from '../stores/board'

const store = useStore()

function dragStart(e: any): void {
  // store.draggedItem = e.target
}

function update(event: any): void {
  console.warn(event.pageX)
}

function drag(e: any): void {
  // store.draggedItem.style.left = `${e.screenX}px`
  // e.preventDefault()
  // e.dataTransfer.effectAllowed = 'move'
  // e.dataTransfer.dropEffect = 'move'
  const img: any = new Image()
  img.src = '/src/assets/'
  e.dataTransfer.setDragImage(new Image(), 0, 0)
  // store.draggedItem.style.left = `${e.pageX}px`
  // store.draggedItem.style.top = `${e.pageY}px`
  // store.dx = e.pageX
  // if (e.pageY !== 0) store.dy = e.pageY
}

function mouseUp(e: any): void {
  console.warn(e)

  // store.draggedItem.style.left = `${store.dx}px`
  // store.draggedItem.style.top = `${store.dy}px`
}

function test(): void {}
</script>

<template>
  <!-- <button @click="test">test</button> -->
  <div
    class="test"
    draggable="true"
    @mousedown="dragStart($event)"
    @drag="drag($event)"
    @mousemove="mouseUp($event)"
    @durationchange="mouseUp($event)"></div>
</template>

<style>
button {
  width: 100px;
  height: 100px;
}

.test {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: aquamarine;
}

.test:active {
  /* pointer-events: none; */
  cursor: pointer;
}
</style>
