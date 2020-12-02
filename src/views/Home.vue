<template>
  <div class="home">
    <finder
      v-if="files"
      :files="files"
    />
    <p v-else>
      Lädt...
    </p>
  </div>
</template>

<script>
import Finder from '@/components/Finder'
import mock from '@/assets/mock.json'

const CATEGORIES = ['strafrecht', 'oeffentlichesrecht', 'zivilrecht']

export default {
  name: 'Home',
  components: { Finder },
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
        this.files = data.children
        console.debug('Data was loaded from API', this.files)
      } catch (e) {
        console.error('Wasn\'t able to load data')
      }
      // TODO: remove before release
      // is type string if request is empty or still initial
      if (this.files === '' || this.files === null || this.files === undefined) {
        console.debug('Data from API is empty or initial, using mock data.')
        this.files = mock.children
      }
    }
  }
}
</script>
