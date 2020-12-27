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
import { getItemById, hasChildren, isInPath, isSelected, isInitial, isAllowedKey } from '@/assets/js/util'

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
  watch: {
    selectedIds: function (value) {
      if (this.$route.query.selected !== value.toString()) {
        this.$router.push({ path: '/', query: { selected: value.toString() } })
      }
    }
  },
  created () {
    this.loadQuery(this.$route.query)
    if (isInitial(this.selectedIds)) {
      this.initializeColumns()
    }
    document.onkeydown = this.onkeydown
  },
  computed: {
    columns () {
      return this.selectedIds.map(_id => {
        const item = getItemById(this.tree, _id)
        return hasChildren(item) ? item.children : null
      }).filter(_item => _item !== null)
      // item with no children return null, this would add a new column with the value null which isn't nice in ui
      // & also causes crashes when accessing columns via index
    }
  },
  methods: {
    selectItem (item, itemId, columnIndex) {
      if (!this.hasChildren(item)) return
      if (isInitial(this.selectedIds)) {
        // see: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
        this.selectedIds.splice(0)
        this.initializeColumns()
      } else {
        // crop items, e.g. 5 columns exist and user clicks on item in second column
        // -> only the first two columns are still there and a new one will be added
        // see: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
        this.selectedIds.splice(columnIndex + 1)
      }
      this.selectedIds.push(itemId)
      this.scrollToRight()
    },
    onkeydown: function (event) {
      const key = event.key
      if (isAllowedKey(key)) {
        if (isInitial(this.selectedIds)) {
          const firstChildId = this.tree.children[0].id
          this.selectedIds.push(firstChildId)
        } else {
          const columnsLength = this.columns.length
          const selectedItem = getItemById(this.tree, this.selectedIds[this.selectedIds.length - 1])
          const selectedColumn = hasChildren(selectedItem) ? this.columns[columnsLength - 2] : this.columns[columnsLength - 1]
          const selectedIdsIndexToReplace = hasChildren(selectedItem) ? columnsLength - 1 : columnsLength
          const selectedItemIndex = selectedColumn.findIndex(_item => isSelected(this.selectedIds, _item.id))
          const nextSelectedItemId = selectedItemIndex + 1 < selectedColumn.length
            ? selectedColumn[selectedItemIndex + 1].id
            : selectedColumn[0].id
          const previousSelectedItemId = selectedItemIndex > 0
            ? selectedColumn[selectedItemIndex - 1].id
            : selectedColumn[selectedColumn.length - 1].id
          const nextColumnFirstItemId = this.columns[columnsLength - 1][0].id
          switch (key) {
            case 'ArrowDown':
              // The following is equal to: this.selectedIds[selectedIdsIndexToReplace] = nextSelectedItemId
              // see: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
              this.$set(this.selectedIds, selectedIdsIndexToReplace, nextSelectedItemId)
              break
            case 'ArrowUp':
              // see: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
              this.$set(this.selectedIds, selectedIdsIndexToReplace, previousSelectedItemId)
              break
            case 'ArrowRight':
              if (hasChildren(selectedItem)) {
                this.selectedIds.push(nextColumnFirstItemId)
              }
              break
            case 'ArrowLeft':
              // see: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
              this.selectedIds.splice(this.selectedIds.length - 1)
              break
          }
          this.scrollToRight()
        }
      }
    },
    loadQuery (query) {
      const querySelected = query.selected
      if (querySelected !== undefined && querySelected !== '') {
        const regex = new RegExp('^[0-9]*$')
        const querySelectedIds = querySelected.split(',')
          .filter(_number => regex.test(_number))
          .map(_number => parseInt(_number))
        // make the ids unique by using a Set
        this.selectedIds = [...new Set(querySelectedIds)]
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
  height: 100%
  width: 100%
  overflow-x: scroll
  overflow-y: auto
  border: 2px solid $color-accent
  background: rgba($color-accent, 0.05)
.column
  border-right: 2px solid $color-accent
  background: $color-light
  min-width: calc((100% / 3) - (2 * 2px) - 1rem)
  @media screen and (max-width: $breakpoint-mobile)
    min-width: 40%
    width: auto
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
