<template>
  <div class="finder">
    <div
      class="column"
      :key="i"
      v-for="(column, i) in columns"
    >
      <ul>
        <li
          :key="j"
          v-for="(child, j) in column"
          @click="selectChild(child, i)"
          v-text="child.name"
        />
      </ul>
    </div>
  </div>
</template>

<script>
const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item)

export default {
  name: 'Finder',
  data () {
    return {
      columns: []
    }
  },
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  created () {
    this.columns = [this.files]
    // TODO read query params
  },
  methods: {
    selectChild (child, index) {
      console.debug('Select child')
      // deep clone to make self comparison
      const children = clone(child.children)
      console.log(children)
      // remove all other children after this a click
      // add children as new entry to columns
      const hasChildren = children.length > 0
      // dieser dumme vergleich muss passen
      const childrenAreNotAlreadyAdded = this.columns.length === index + 1 ? true : children !== this.columns[index + 1].children
      console.debug(`hasChildren: ${hasChildren}`)
      console.debug(`childrenAreNotIdentical: ${childrenAreNotAlreadyAdded}`)
      if (hasChildren && childrenAreNotAlreadyAdded) {
        this.columns.push(children)
        // TODO: change query params
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.finder
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-start
  align-content: stretch
  min-width: 25rem
  height: 100%
  width: 100%
  overflow-x: auto
  overflow-y: hidden
.column
  height: 50rem
  border: 2px solid $color-accent
ul
  li
    padding: 1rem 2rem
    border-bottom: 1px solid rgba($color-accent, 0.5)
    &:hover
      background: rgba($color-accent, 0.05)
      cursor: pointer
</style>
