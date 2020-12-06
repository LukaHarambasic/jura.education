<template>
  <div
    class="finder"
    ref="finder"
  >
    <div
      class="column"
      :key="columnIndex"
      v-for="(column, columnIndex) in columns"
    >
      <ul>
        <li
          :key="itemIndex"
          v-for="(item, itemIndex) in column"
          @click="selectItem(item, columnIndex, itemIndex)"
          v-text="item.name"
          :class="{
            'hasChildren': item.state.hasChildren,
            'isSelected': item.state.isSelected,
            'wasSelected': item.state.wasSelected
          }"
        />
      </ul>
    </div>
  </div>
</template>

<script>

import { setup, addColumn } from '@/utils/logic'
import {
  downArrowPressed,
  leftArrowPressed,
  rightArrowPressed,
  setupArrows,
  upArrowPressed
} from '@/utils/finderArrowNavigation'

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
    this.columns = setup(this.files)
    // keyboard event listener
    document.addEventListener('keydown', (event) => {
      setupArrows(event, this.columns)
      switch (event.key) {
        case 'ArrowRight':
          rightArrowPressed()
          break
        case 'ArrowLeft':
          leftArrowPressed()
          break
        case 'ArrowUp':
          upArrowPressed()
          break
        case 'ArrowDown':
          downArrowPressed()
          break
      }
    })
    // TODO read query params
  },
  methods: {
    states (item) {
      return item.states ? item.states : {}
    },
    selectItem (item, columnIndex, itemIndex) {
      if (item === undefined) return
      // deletes all columns after the clicked column
      this.columns.length = columnIndex + 1
      if (item.state.hasChildren) {
        // TODO reset all wasSelected
        item.state.wasSelected = true
        this.columns = addColumn(this.columns, item.children)
        console.log('this.columns')
        console.log(this.columns)
        const finder = this.$refs.finder
        this.$nextTick(() => {
          const columnWidth = (finder.clientWidth / 3)
          finder.scrollLeft = finder.scrollWidth + columnWidth
        })
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
  align-items: stretch
  min-width: 25rem
  height: 100%
  width: 100%
  overflow-x: scroll
  overflow-y: auto
  border: 2px solid $color-accent
  background: rgba($color-accent, 0.05)
.column
  border-right: 2px solid $color-accent
  background: #fff
  min-width: calc((100% / 3) - (2 * 2px) - 1rem)
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
    &.isSelected
      background: deeppink
    &.wasSelected
      background: greenyellow
</style>
