<script setup lang="ts">
import { useStore } from '../stores/board'

const store = useStore()

function dragStart(event: any): void {
  if (event.target) {
    const trg: HTMLElement = event.target
    store.draggedItem = event.target
    store.dx = event.clientX - trg.getBoundingClientRect().x
    store.dy = event.clientY - trg.getBoundingClientRect().y
    trg.style.position = 'absolute'
  }
}

function drag(event: any): void {
  store.draggedItem.style.left = event.clientX - store.dx
  store.draggedItem.style.top = event.clientY - store.dy
  // store.draggedItem.style.left = event.clientX - store.dx
  // store.draggedItem.style.top = event.clientY - store.dy
}

function dragEnd(event: DragEvent): void {
  store.draggedItem.style.position = 'static'
  store.draggedItem.style.left = 100
  store.draggedItem.style.top = 100
  // if (document.body.querySelector('.test')) {

  // 	document.body.querySelector('.test').
  // }
}

function test(): void {
  document.body.querySelector('#test')
}
</script>

<template>
  <button @click="test">test</button>
  <div
    class="test"
    id="test"
    draggable="true"
    @dragstart="dragStart($event)"
    @drag="drag($event)"
    @dragend="dragEnd($event)"></div>
</template>

<style>
button {
  width: 100px;
  height: 100px;
}

.test {
  position: absolute;
  top: 100px;
  width: 200px;
  height: 200px;
  background-color: aquamarine;
}
</style>
