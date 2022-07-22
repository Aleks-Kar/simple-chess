<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useStore } from '../stores/board'

const props = defineProps<{
  piece: string
  index: number
  color: 'white' | 'black'
  attacked?: boolean
  defended?: boolean
}>()

const store = useStore()

function getUrl(name: string): string {
  return new URL(`/src/assets/${name}.svg`, import.meta.url).href
}

const urlWhitePiece = computed<string>(() => {
  // return `url("/src/assets/pieces/w${props.piece}.svg")`
  const str = `pieces/w${props.piece}`
  return `url(${getUrl(str)})`
})

const urlBlackPiece = computed<string>(() => {
  // return `url("/src/assets/pieces/b${props.piece}.svg")`
  const str = `pieces/b${props.piece}`
  return `url(${getUrl(str)})`
})

const urlSvgAttack = computed<string>(() => {
  if (
    props.attacked &&
    props.color !== store.turn &&
    store.squaresForMove[props.index] &&
    props.piece.toUpperCase() !== 'K'
  ) {
    // return new URL('url("/src/assets/swords.svg")
    return `url(${getUrl('swords')})`
  } else {
    return 'none'
  }
})

const urlSvgDefend = computed<string>(() => {
  if (
    props.attacked &&
    props.defended &&
    props.color !== store.turn &&
    store.squaresForMove[props.index] &&
    props.piece.toUpperCase() !== 'K'
  ) {
    return `url(${getUrl('shield')})`
    // return 'url("/src/assets/shield.svg")'
  } else {
    return 'none'
  }
})

const isKingUnderAttack = computed<boolean>(() => {
  if (!props.attacked) return false
  return props.attacked && props.piece.toUpperCase() === 'K'
})
</script>

<template>
  <div class="piece">
    <svg
      v-if="props.color === 'white'"
      class="piece_color_white"
      :class="{ 'piece_king-under-attack': isKingUnderAttack }"></svg>
    <svg
      v-else-if="props.color === 'black'"
      class="piece_color_black"
      :class="{ 'piece_king-under-attack': isKingUnderAttack }"></svg>
  </div>
</template>

<style>
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
