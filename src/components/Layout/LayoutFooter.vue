<template>
  <footer>
    <ul class="list">
      <li>
        <router-link to="/">
          Start
        </router-link>
      </li>
      <li><a href="https://github.com/LukaHarambasic/jura.education">GitHub</a></li>
      <li>
        <router-link to="/impressum">
          Impressum
        </router-link>
      </li>
      <li>
        <router-link to="/datenschutz">
          Datenschutz
        </router-link>
      </li>
    </ul>
    <div class="logo">
      <router-link to="/">
        <base-logo />
      </router-link>
    </div>
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
    margin: 0 1rem 0 0
    &:last-of-type
      margin: 0
    a
      color: $color-light
      &:hover
        text-decoration: none
.logo
  width: 6rem
  height: 6rem
  margin: -5rem 0 0 0
  transition: $animation
  &:hover
    transform: scale(1.1)
</style>
