<template>
  <li class="tree-node" v-if="node">
    <strong class="label" @click="toggleSelect()">{{ node.name }}</strong>
    <p v-if="node.extension === '.md'">{{ node.markdown }}</p>
    <ul v-if="node.children && node.children.length" class="child" :class="{ visible: isParentSelected }">
      <tree-node v-for="child in node.children" :node="child" :key="child.name" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    node: Object
  },
  data () {
    return {
      isParentSelected: false
    }
  },
  methods: {
    toggleSelect () {
      console.debug('Toggle selection, to display children')
      this.isParentSelected = !this.isParentSelected
    }
  }
}
</script>

<style lang="sass" scoped>
.tree-node
  background: mediumaquamarine
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-start
  align-content: stretch
  min-width: 10rem
  max-width: 20rem
  border: 2px solid tomato
  &:hover
    cursor: pointer
// all children are per default invisble
.child
  display: none
.visible
  display: block
</style>
