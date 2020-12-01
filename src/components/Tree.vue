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
.tree-list
  width: 100%
  height: 100%
  overflow-x: auto
  overflow-y: hidden
</style>
