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
  watch: {
    '$route.query.category': function (category) {
      console.debug(`Watching $route.query.category which is ${category}`)
      this.load(category)
    }
  },
  created () {
    const category = this.$route.query.category
    this.load(category)
  },
  methods: {
    async load (queryCategory) {
      console.debug(`The query category is ${queryCategory}`)
      const category = CATEGORIES.includes(queryCategory) ? queryCategory : 'all'
      console.debug(`The category for request is ${category}`)
      const { data } = await this.$axios.get(`api/${category}`)
      this.files = data
    }
  }
}
</script>
