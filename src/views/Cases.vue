<template>
  <div class="cases">
    <h1>Cases</h1>
    <tree v-if="files" :treeData="files" />
    <p v-else>Lädt...</p>
  </div>
</template>

<script>
import Tree from '@/components/Tree'

export default {
  name: 'Cases',
  components: { Tree },
  data () {
    return {
      files: null
    }
  },
  async created () {
    const { data } = await this.$axios.get('api/tree')
    this.files = data
  }
}
</script>
