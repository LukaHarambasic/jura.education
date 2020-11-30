<template>
  <div class="tree">
    <ul class="tree-list">
      <tree-node :node="treeData" />
    </ul>
  </div>
</template>

<script>
import TreeNode from '@/components/TreeNode'

export default {
  name: 'Tree',
  props: {
    treeData: Object
  },
  components: {
    TreeNode
  }
}
</script>

<style lang="sass" scoped>
.tree-list ul
  padding-left: 16px
  margin: 6px 0
</style>
