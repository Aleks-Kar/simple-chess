<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useStore } from '../stores/board'

const props = defineProps<{
  piece: string
  set: string
  color: 'white' | 'black'
  attacked: boolean
  defended: boolean
}>()

const store = useStore()

const urlWhitePiece = computed<string>(() => {
  return `url("/src/assets/pieces/${props.set}/w${props.piece}.svg")`
})

const urlBlackPiece = computed<string>(() => {
  return `url("/src/assets/pieces/${props.set}/b${props.piece}.svg")`
})

const urlSvgAttack = computed<string>(() => {
  if (
    props.attacked &&
    props.color !== store.turn &&
    props.piece.toUpperCase() !== 'K'
  ) {
    return 'url("/src/assets/swords.svg")'
  } else {
    return 'none'
  }
})

const urlSvgDefend = computed<string>(() => {
  if (
    props.attacked &&
    props.color !== store.turn &&
    props.defended &&
    props.piece.toUpperCase() !== 'K'
  ) {
    return 'url("/src/assets/shield.svg")'
  } else {
    return 'none'
  }
})
</script>

<template>
  <div class="piece">
    <svg
      :class="[
        { piece_color_white: props.color === 'white' },
        { piece_color_black: props.color === 'black' },
        {
          'piece_king-under-attack':
            props.attacked && props.piece.toUpperCase() === 'K'
        }
      ]"></svg>
  </div>
</template>

<style scoped>
.piece {
  width: 90px;
  height: 90px;
  pointer-events: stroke;
  user-select: none;
}

.piece::before {
  position: absolute;
  width: 18px;
  height: 18px;
  top: -3px;
  left: -3px;
  content: '';
  background-size: cover;
  background-image: v-bind(urlSvgAttack);
}

.piece::after {
  position: absolute;
  width: 24px;
  height: 24px;
  top: -5px;
  right: -5px;
  content: '';
  background-size: cover;
  background-image: v-bind(urlSvgDefend);
}

.piece_color_white {
  width: 90px;
  height: 90px;
  background-size: cover;
  background-image: v-bind(urlWhitePiece);
}

.piece_color_black {
  width: 90px;
  height: 90px;
  background-size: cover;
  background-image: v-bind(urlBlackPiece);
}

.piece_king-under-attack {
  color: red;
  filter: drop-shadow(0 0 10px) drop-shadow(0 0 10px) drop-shadow(0 0 10px);
}
</style>
