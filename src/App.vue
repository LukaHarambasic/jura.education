<template>
  <div id="app">
    <main>
      <router-view />
    </main>
    <layout-footer class="footer" />
  </div>
</template>

<script>
import LayoutFooter from '@/components/Layout/LayoutFooter'

export default {
  components: { LayoutFooter }
}
</script>

<style lang="sass">
#app
  margin: 2rem
  width: calc(100% - ( 2 * 2rem))
  height: 100%
  > .footer
</style>
