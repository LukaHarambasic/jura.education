<template>
  <div class="home">
    <columns
      v-if="files"
      :tree="files"
    />
    <p v-else>
      Lädt...
    </p>
  </div>
</template>

<script>
import Columns from '@/components/Columns'
import mock from '@/assets/mock.json'

export default {
  name: 'Home',
  components: { Columns },
  data () {
    return {
      files: null
    }
  },
  created () {
    this.load()
  },
  methods: {
    async load () {
      try {
        const ENDPOINT = 'api/all'
        console.debug(`Loading data from ${ENDPOINT}.`)
        const { data } = await this.$axios.get(ENDPOINT)
        this.files = data.children
        console.debug('Data was loaded from API.')
      } catch (e) {
        console.error('Wasn\'t able to load data.')
      }
      // TODO: remove before release
      // is type string if request is empty or still initial
      if (this.files === '' || this.files === null || this.files === undefined) {
        console.debug('Data from API is empty or initial, using mock data.')
        this.files = mock
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.home
  height: 100%
</style>
