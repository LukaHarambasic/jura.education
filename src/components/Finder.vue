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
          :class="{'hasChildren': hasChildren(child)}"
        />
      </ul>
    </div>
  </div>
</template>

<script>
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
    hasChildren: (child) => child.children.length > 0,
    selectChild (child, index) {
      console.debug('Select child')
      // deep clone to make self comparison
      const children = child.children
      // deletes all columns after the clicked column
      this.columns.length = index + 1
      // add children as new entry to columns
      const hasChildren = this.hasChildren(child)
      console.debug(`hasChildren: ${hasChildren}`)
      if (hasChildren) {
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
  border: 2px solid $color-accent
  background: rgba($color-accent, 0.05)
.column
  height: 50rem
  border-right: 2px solid $color-accent
  background: #fff
  &:last-of-type
    margin: 0 1rem 0 0 // to never toiuch the border
ul
  li
    padding: 1rem 2rem
    border-bottom: 1px solid rgba($color-accent, 0.5)
    display: block
    &.hasChildren
      &:after
        content: '>'
        font-weight: bold
        margin: 0 0 0 .5rem
      &:hover
        background: rgba($color-accent, 0.05)
        cursor: pointer
</style>
