<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { useBoardStore } from '../stores/board'

const props = defineProps<{
  piece: string
  index: number
  color: 'white' | 'black'
  attacked?: boolean
  defended?: boolean
}>()

const board = useBoardStore()

function getUrl(name: string): string {
  return new URL(`/src/assets/${name}.svg`, import.meta.url).href
}

function getUrlWhite(): string {
  return new URL(`/src/assets/pieces/w${props.piece}.svg`, import.meta.url).href
}

function getUrlBlack(): string {
  const str = props.piece.toUpperCase()
  return new URL(`/src/assets/pieces/b${str}.svg`, import.meta.url).href
}

const urlWhitePiece = computed<string>(() => `url(${getUrlWhite()})`)
const urlBlackPiece = computed<string>(() => `url(${getUrlBlack()})`)

const urlSvgAttack = computed<string>(() => {
  if (
    props.attacked &&
    props.color !== board.turn &&
    board.squaresForMove[props.index] &&
    props.piece.toUpperCase() !== 'K'
  ) {
    return `url(${getUrl('swords')})`
  } else {
    return 'none'
  }
})

const urlSvgDefend = computed<string>(() => {
  if (
    props.attacked &&
    props.defended &&
    props.color !== board.turn &&
    board.squaresForMove[props.index] &&
    props.piece.toUpperCase() !== 'K'
  ) {
    return `url(${getUrl('shield')})`
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
      :class="{ 'piece_under-attack': isKingUnderAttack }"></svg>
    <svg
      v-else-if="props.color === 'black'"
      class="piece_color_black"
      :class="{ 'piece_under-attack': isKingUnderAttack }"></svg>
  </div>
</template>

<style lang="scss">
.piece {
  width: 90px;
  height: 90px;
  pointer-events: stroke;
  user-select: none;

  &::before,
  &::after {
    position: absolute;
    content: '';
    background-size: cover;
  }

  &::before {
    width: 18px;
    height: 18px;
    top: -3px;
    left: -3px;
    background-image: v-bind(urlSvgAttack);
  }

  &::after {
    width: 24px;
    height: 24px;
    top: -5px;
    right: -5px;
    background-image: v-bind(urlSvgDefend);
  }

  &_color_white,
  &_color_black {
    width: 90px;
    height: 90px;
    background-size: cover;
  }

  &_color_white {
    background-image: v-bind(urlWhitePiece);
  }

  &_color_black {
    background-image: v-bind(urlBlackPiece);
  }

  &_under-attack {
    color: red;
    filter: drop-shadow(0 0 10px) drop-shadow(0 0 10px) drop-shadow(0 0 10px);
  }
}
</style>
