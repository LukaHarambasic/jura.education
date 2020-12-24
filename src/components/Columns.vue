<template>
  <div
    class="columns"
    ref="columns"
  >
    <ul
      class="column"
      :key="columnIndex"
      v-for="(column, columnIndex) in columns"
    >
      <li
        class="item"
        :key="itemIndex"
        v-for="(item, itemIndex) in column"
        @click="selectItem(item, item.id, columnIndex)"
        v-text="item.name"
        :data-is-selected="isSelected(selectedIds, item.id)"
        :data-is-in-path="isInPath(selectedIds, item.id)"
        :data-has-children="hasChildren(item)"
      />
    </ul>
  </div>
</template>

<script>
import { getItemById, hasChildren, isInPath, isSelected } from '@/assets/js/util'

export default {
  name: 'Columns',
  data () {
    return {
      selectedIds: [] // last selected ID is active
    }
  },
  props: {
    tree: {
      type: Object,
      required: true
    }
  },
  created () {
    this.initializeColumns()
  },
  computed: {
    columns () {
      return this.selectedIds.map(_id => {
        const item = getItemById(this.tree, _id)
        return item.children
      })
    }
  },
  methods: {
    selectItem (item, itemId, columnIndex) {
      // console.log(itemId)
      if (!this.hasChildren(item)) return
      // TODO out of bounce to left side
      // if it's set to null initialise column again
      // use this.initializeColumns()
      const selectedIdsLength = this.selectedIds.length
      const isInitial = selectedIdsLength <= 1
      if (isInitial) {
        this.selectedIds.length = 0
        this.initializeColumns()
      } else {
        this.selectedIds.length = columnIndex + 1
      }
      this.selectedIds.push(itemId)
    },
    // HELPERS
    scrollToRight () {
      const columnsNode = this.$refs.columns
      this.$nextTick(() => {
        const columnWidth = (columnsNode.clientWidth / 3)
        columnsNode.scrollLeft = columnsNode.scrollWidth + columnWidth
      })
    },
    initializeColumns () {
      return this.selectedIds.push(1)
    },
    hasChildren,
    isSelected,
    isInPath
  }
}
</script>

<style lang="sass" scoped>
.columns
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-start
  align-content: stretch
  align-items: stretch
  min-width: 25rem
  height: calc(100% + 1px) // fixes cropped bottom border
  width: 100%
  overflow-x: scroll
  overflow-y: auto
  border: 2px solid $color-accent
  background: rgba($color-accent, 0.05)
.column
  border-right: 2px solid $color-accent
  background: #fff
  min-width: calc((100% / 3) - (2 * 2px) - 1rem)
  li
    padding: 1rem 2rem
    border-bottom: 1px solid rgba($color-accent, 0.5)
    display: block
    &[data-is-selected]
      text-decoration: underline
      color: $color-light
      background: $color-primary !important
      &[data-has-children]
        &:hover
          background: rgba($color-primary, 0.95) !important
    &[data-is-in-path]
      background: rgba($color-accent, 0.1)
    &[data-has-children]
      &:after
        content: '>'
        font-weight: bold
        margin: 0 0 0 .5rem
        transition: $animation
        text-decoration: none
      &:hover
        background: rgba($color-accent, 0.05)
        cursor: pointer
</style>
