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
  if (props.attacked && props.piece.toUpperCase() !== 'K') {
    return 'url("/src/assets/swords.svg")'
  } else {
    return 'none'
  }
})

const urlSvgDefend = computed<string>(() => {
  if (props.defended && props.piece.toUpperCase() !== 'K') {
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

@keyframes glow {
  from {
    color: red;
    filter: drop-shadow(0 0 12px) drop-shadow(0 0 12px) drop-shadow(0 0 12px);
  }

  to {
    color: red;
    filter: drop-shadow(0 0 3px) drop-shadow(0 0 3px) drop-shadow(0 0 3px);
  }
}

.piece_king-under-attack {
  animation-duration: 5s;
  animation-name: glow;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
