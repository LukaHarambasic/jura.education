<template>
  <footer>
    <ul>
      <li>Impressum</li>
      <li>Datenschutz</li>
      <li>GitHub</li>
      <li>Über uns</li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style lang="sass" scoped>
ul
  display: flex
  flex-direction: row
  list-style: none
  padding: 0
  li
    margin: 0 .25rem 0 0
    &:last-of-type
      margin: 0
</style>
