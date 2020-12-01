<template>
  <div class="home">
    <tree v-if="files" :treeData="files" />
    <p v-else>Lädt...</p>
  </div>
</template>

<script>
import Tree from '@/components/Tree'
import mock from '@/assets/mock.json'

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
      try {
        const ENDPOINT = `api/${category}`
        console.debug(`Loading data from ${ENDPOINT}`)
        const { data } = await this.$axios.get(ENDPOINT)
        this.files = data
        console.debug('Data was loaded from API')
      } catch (e) {
        console.error('Wasn\'t able to load data')
      }
      // TODO: remove before release
      // is type string if request is empty
      if (this.files === '') {
        console.debug('Data from API is empty, using mock data.')
        this.files = mock
      }
    }
  }
}
</script>
