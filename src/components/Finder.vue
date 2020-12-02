<template>
  <div
    class="finder"
    ref="finder"
  >
    <div
      class="column"
      :key="i"
      v-for="(column, i) in columns"
      :ref="`column-${i}`"
      :class="`column-${i}`"
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

const FINDER_SELECTOR = '.finder'
const SELECTED = 'isSelected'
const SELECTED_SELECTOR = `.${SELECTED}`
const COLUMN_SELECTOR = '.column'
const COLUMN_INDEX_SELECTOR = (columnIndex) => `${COLUMN_SELECTOR}-${columnIndex}`

const selectCurrent = (element) => element.classList.add(SELECTED)
const selectNext = (element) => element.nextElementSibling.classList.add(SELECTED)
const selectPrevious = (element) => element.previousElementSibling.classList.add(SELECTED)
const removeSelect = (element) => element.classList.remove(SELECTED)
const removeAllSelects = () => {
  Array.from(document.querySelectorAll(`${COLUMN_SELECTOR} ul`)).forEach(column => {
    column.childNodes.forEach(item => item.classList.remove(SELECTED))
  })
}

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

    document.addEventListener('keydown', (event) => {
      const hasOneElementSelected = document.querySelector(FINDER_SELECTOR).querySelectorAll(SELECTED_SELECTOR).length > 0
      const columnIndex = this.columns.length - 1
      const columnElements = document.querySelector(`${COLUMN_INDEX_SELECTOR(columnIndex)} ul`)
      const columnElementsArray = Array.from(columnElements.childNodes)
      const itemIndex = columnElementsArray.findIndex(item => item.classList.contains(SELECTED))
      // nothing else is selected - set starting point
      if (!hasOneElementSelected) {
        const listElement = columnElements.childNodes[0]
        selectCurrent(listElement)
      }
      const selected = document.querySelector(SELECTED_SELECTOR)
      // TODO: could be a switch?
      if (event.key === 'ArrowRight') {
        console.log('ArrowRight')
        const child = this.columns[columnIndex][itemIndex]
        this.selectChild(child, columnIndex)
        // remove all .isSelected classes
        removeAllSelects()
        // add .isSelected to newest column at first li
        selectCurrent(columnElements.childNodes[0])
      }
      if (event.key === 'ArrowLeft') {
        console.log('ArrowLeft')
        // remove latest column if not first column
        this.columns.pop()
        removeAllSelects()
        selectCurrent(columnElements.childNodes[0])
      }
      if (event.key === 'ArrowUp') {
        console.log('ArrowDown')
        if (selected.previousElementSibling !== null) {
          selectPrevious(selected)
        } else {
          const listElements = selected.parentElement.childNodes
          const lastListElement = listElements[listElements.length - 1]
          selectCurrent(lastListElement)
        }
        removeSelect(selected)
      }
      if (event.key === 'ArrowDown') {
        console.log('ArrowDown')
        if (selected.nextElementSibling !== null) {
          selectNext(selected)
        } else {
          const firstListElement = selected.parentElement.childNodes[0]
          selectCurrent(firstListElement)
        }
        removeSelect(selected)
      }
    })
    // TODO read query params
  },
  methods: {
    hasChildren: (child) => child.children.length > 0,
    selectChild (child, index) {
      if (child === undefined) return
      // deep clone to make self comparison
      const children = child.children
      // deletes all columns after the clicked column
      this.columns.length = index + 1
      // add children as new entry to columns
      const hasChildren = this.hasChildren(child)
      if (hasChildren) {
        this.columns.push(children)
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
      background: rgba($color-primary, 0.2)
</style>
