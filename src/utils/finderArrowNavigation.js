import { defaultState } from '@/utils/logic'

export const setupArrows = (columns) => {
  console.debug('setupArrows')
  // only first column exists
  if (columns.length === 1) {
    const item = columns[0][0]
    setIsSelected(item)
  }
}

export const rightArrowPressed = () => {
  console.debug('rightArrowPressed')
}

export const leftArrowPressed = () => {
  console.debug('leftArrowPressed')
}

export const upArrowPressed = () => {
  console.debug('upArrowPressed')
}

export const downArrowPressed = () => {
  console.debug('downArrowPressed')
}

/**
 * Helper functions
 */

// Index based helpers
// eslint-disable-next-line no-unused-vars
const findItemInColumn = () => {
  console.debug('findItemInColumn')
  // TODO: use findColumn() & findItem()
  return {
    column: 0, // TODO
    item: 0 // TODO
  }
}

// eslint-disable-next-line no-unused-vars
const findColumn = () => {
  console.debug('findColumn')
  return 0 // TODO
}

// eslint-disable-next-line no-unused-vars
const findItem = () => {
  console.debug('findItem')
  return 0 // TODO
}

// eslint-disable-next-line no-unused-vars
const setWasSelected = (item) => {
  console.debug('addStateWasSelected')
  return item.state.wasSelected === true
}

const setIsSelected = (item) => {
  console.debug('addStateIsSelected')
  // TODO: this is a call by reference right?
  return item.state.isSelected === true
}

// eslint-disable-next-line no-unused-vars
const removeAllStates = (columns) => {
  console.debug('removeAllStates')
  // TODO: loop over all columns and items and remove their states
  return columns.map(column => {
    return column.map(item => {
      return {
        ...item,
        state: defaultState(item)
      }
    })
  })
}
