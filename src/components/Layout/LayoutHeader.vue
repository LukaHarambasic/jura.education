<template>
  <header>
    <base-logo class="logo" />
  </header>
</template>

<script>
import BaseLogo from '@/components/Base/BaseLogo'
export default {
  name: 'LayoutHeader',
  components: { BaseLogo }
}
</script>

<style lang="sass" scoped>
.logo
  width: 8rem
  height: 8rem
</style>
