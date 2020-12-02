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
  height: calc(100vh - (2 * 2rem))
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-content: stretch
  align-items: stretch
  > main
    flex: 1 1 auto
  > .footer
</style>
