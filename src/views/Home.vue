<template>
  <div class="home">
    <h1>jura.education</h1>
    <tree v-if="files" :treeData="files" />
    <p v-else>Lädt...</p>
  </div>
</template>

<script>
import Tree from '@/components/Tree'

const CATEGORIES = ['strafrecht', 'oeffentlichesrecht', 'zivilrecht']

export default {
  name: 'Home',
  components: { Tree },
  data () {
    return {
      files: null
    }
  },
  async created () {
    const query = this.$route.query
    const category = CATEGORIES.includes(query.category) ? query.category : 'all'
    const { data } = await this.$axios.get(`api/${category}`)
    this.files = data
  }
}
</script>
