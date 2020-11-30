<template>
  <div id="app">
    <layout-header />
    <main>
      <router-view/>
    </main>
    <layout-footer />
  </div>
</template>

<script>
import LayoutHeader from '@/components/Layout/LayoutHeader'
import LayoutFooter from '@/components/Layout/LayoutFooter'

export default {
  components: { LayoutFooter, LayoutHeader }
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $color-font
</style>
