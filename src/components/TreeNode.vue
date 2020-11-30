<template>
  <li class="node-tree" v-if="node">
    <strong class="label">{{ node.name }}</strong>
    <p v-if="node.extension === '.md'">{{ node.markdown }}</p>
    <ul v-if="node.children && node.children.length">
      <tree-node v-for="child in node.children" :node="child" :key="child.name" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    node: Object
  }
}
</script>
