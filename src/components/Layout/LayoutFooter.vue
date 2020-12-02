<template>
  <footer>
    <ul class="list">
      <li>Über uns</li>
      <li>GitHub</li>
      <li>Impressum</li>
      <li>Datenschutz</li>
    </ul>
    <base-logo class="logo" />
  </footer>
</template>

<script>
import BaseLogo from '@/components/Base/BaseLogo'
export default {
  name: 'LayoutFooter',
  components: { BaseLogo }
}
</script>

<style lang="sass" scoped>
footer
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: space-between
  align-content: center
  align-items: center
  position: absolute
  margin: 1rem 4rem
  bottom: 0
  left: 0
  width: calc(100% - ( 2 * 4rem))
  background: $color-primary
  color: $color-light
  border: 2px solid $color-primary
  padding: 1rem
.list
  display: flex
  flex-direction: row
  list-style: none
  padding: 0
  width: 100%
  li
    margin: 0 .25rem 0 0
    &:last-of-type
      margin: 0
.logo
  width: 6rem
  height: 6rem
  margin: -5rem 0 0 0
</style>
