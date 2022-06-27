<script setup lang="ts">
import { computed } from '@vue/reactivity'

const props = defineProps<{
  piece: string
  set: string
  color: 'white' | 'black'
  attacked: boolean
  defended: boolean
}>()

const urlWhitePiece = computed<string>(() => {
  return `url("/src/assets/pieces/${props.set}/w${props.piece}.svg")`
})

const urlBlackPiece = computed<string>(() => {
  return `url("/src/assets/pieces/${props.set}/b${props.piece}.svg")`
})

const urlSvgAttack = computed<string>(() => {
  if (props.attacked) {
    return 'url("/src/assets/swords.svg")'
  } else {
    return 'none'
  }
})

const urlSvgDefend = computed<string>(() => {
  if (props.defended) {
    return 'url("/src/assets/shield.svg")'
  } else {
    return 'none'
  }
})
</script>

<template>
  <div class="container">
    <svg
      :class="[
        { piece_white: props.color === 'white' },
        { piece_black: props.color === 'black' }
      ]"></svg>
  </div>
</template>

<style scoped>
.container {
  width: 90px;
  height: 90px;
  pointer-events: stroke;
}

.container::before {
  position: absolute;
  width: 18px;
  height: 18px;
  top: -3px;
  left: -3px;
  content: '';
  background-size: cover;
  background-image: v-bind(urlSvgAttack);
}

.container::after {
  position: absolute;
  width: 24px;
  height: 24px;
  top: -5px;
  right: -5px;
  content: '';
  background-size: cover;
  background-image: v-bind(urlSvgDefend);
}

.piece_white {
  width: 90px;
  height: 90px;
  background-size: cover;
  background-image: v-bind(urlWhitePiece);
}

.piece_black {
  width: 90px;
  height: 90px;
  background-size: cover;
  background-image: v-bind(urlBlackPiece);
}
</style>
