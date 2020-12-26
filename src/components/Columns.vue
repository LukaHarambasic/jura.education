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
      // last selected ID is active
      // every ID which is selected is in the path
      selectedIds: []
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
    document.onkeydown = this.onkeydown
  },
  computed: {
    columns () {
      return this.selectedIds.map(_id => {
        const item = getItemById(this.tree, _id)
        return hasChildren(item) ? item.children : null
      })
    }
  },
  methods: {
    selectItem (item, itemId, columnIndex) {
      if (!this.hasChildren(item)) return
      const selectedIdsLength = this.selectedIds.length
      const isInitial = selectedIdsLength <= 1
      if (isInitial) {
        // TODO: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
        this.selectedIds.length = 0
        this.initializeColumns()
      } else {
        // crop items, e.g. 5 columns exist and user clicks on item in second column
        // -> only the first two columns are still there and a new one will be added
        // TODO: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
        this.selectedIds.length = columnIndex + 1
      }
      this.selectedIds.push(itemId)
      this.scrollToRight()
    },
    onkeydown: function (event) {
      const SELECTABLE_KEYS = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
      const key = event.key
      // TODO extract to own function
      const selectedIdsLength = this.selectedIds.length
      const isInitial = selectedIdsLength <= 1
      if (isInitial && SELECTABLE_KEYS.includes(key)) {
        const firstChildId = this.tree.children[0].id
        this.selectedIds.push(firstChildId)
      }
      if (!isInitial && SELECTABLE_KEYS.includes(key)) {
        const columnsLength = this.columns.length
        // get previous column, as the second last column contains the selected item
        const parentColumn = this.columns[columnsLength - 2]
        // TODO: rename - maybe second last column?
        const selectedItemIndex = parentColumn.findIndex(_item => isSelected(this.selectedIds, _item.id))
        // TODO rename
        const currentSelectedItemId = parentColumn[selectedItemIndex].id
        // TODO rename
        const currentSelectedIdsIndex = this.selectedIds.findIndex(_id => currentSelectedItemId === _id)
        // TODO out of bounce in both directions
        const nextSelectedItemId = selectedItemIndex + 1 < parentColumn.length ? parentColumn[selectedItemIndex + 1].id : parentColumn[0].id
        // TODO make nice
        const previousSelectedItemId = selectedItemIndex > 0 ? parentColumn[selectedItemIndex - 1].id : parentColumn[parentColumn.length - 1].id
        switch (key) {
          case 'ArrowDown':
            console.log('ArrowDown')
            // The following is equal to: this.selectedIds[selectedItemIndex + 1] = nextSelectedItemId
            // And is needed to fix this problem: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
            this.$set(this.selectedIds, currentSelectedIdsIndex, nextSelectedItemId)
            break
          case 'ArrowUp':
            console.log('ArrowUp')
            // The following is equal to: this.selectedIds[selectedItemIndex + 1] = nextSelectedItemId
            // And is needed to fix this problem: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
            this.$set(this.selectedIds, currentSelectedIdsIndex, previousSelectedItemId)
            break
          case 'ArrowRight':
            console.log('ArrowRight')
            break
          case 'ArrowLeft':
            console.log('ArrowLeft')
            break
        }
      }
    },
    // HELPERS
    scrollToRight () {
      const columnsNode = this.$refs.columns
      this.$nextTick(() => {
        const columnWidth = (columnsNode.clientWidth / 3) // based on 3 columns which are visible
        columnsNode.scrollLeft = columnsNode.scrollWidth + columnWidth
      })
    },
    initializeColumns () {
      const firstId = this.tree.id
      this.selectedIds.push(firstId)
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
      background: rgba($color-surface, 0.5)
    &[data-has-children]
      &:after
        content: '>'
        font-weight: bold
        margin: 0 0 0 .5rem
        transition: $animation
        text-decoration: none
      &:hover
        background: rgba($color-surface, 0.3)
        cursor: pointer
        text-decoration: underline
</style>
