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
      <router-link
        to="/"
        alt="jura.education"
      >
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
  bottom: .5rem
  left: .5rem
  right: .5rem
  background: $color-primary
  color: $color-light
  border: 2px solid $color-primary
  padding: 1rem
  @media screen and (max-width: $breakpoint-mobile)
    position: relative
    bottom: 0
    left: 0
    right: 0
    margin: 1rem 0 0 0
    padding: .5rem 1rem
.list
  display: flex
  flex-direction: row
  list-style: none
  padding: 0
  width: 100%
  font-size: 1rem
  li
    margin: 0 1rem 0 0
    &:last-of-type
      margin: 0
    a
      color: $color-light
      text-decoration: none
      &:hover
        text-decoration: underline
.logo
  width: 6rem
  height: 6rem
  margin: -5rem 0 0 0
  transition: $animation
  @media screen and (max-width: $breakpoint-mobile)
    width: 4rem
    height: 4rem
    margin: -3rem 0 0 0
  &:hover
    transform: scale(1.1)
</style>
