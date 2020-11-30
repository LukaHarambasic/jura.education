<template>
  <div class="home">
    <h1>jura.education</h1>
    <tree v-if="files" :treeData="files" />
    <p v-else>Lädt...</p>
  </div>
</template>

<script>
import Tree from '@/components/Tree'

export default {
  name: 'Home',
  components: { Tree },
  data () {
    return {
      files: null
    }
  },
  async created () {
    const { data } = await this.$axios.get('api/all')
    this.files = data
  }
}
</script>
