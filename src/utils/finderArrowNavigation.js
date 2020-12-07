import { setStates, setIsSelected, addColumn, cropColumns } from '@/utils/logic'

export const setupArrows = (event, columns) => {
  console.debug('setupArrows')
  const POSSIBLE_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']
  let _columns = columns
  if (POSSIBLE_KEYS.includes(event.key) > 0) {
    const { columnIndex, itemIndex } = _findIsSelected(_columns)
    const currentItem = _columns[columnIndex][itemIndex]
    if (_isInitial(_columns)) {
      _columns = setIsSelected(_columns, 0, 0)
      _columns = addColumn(_columns, currentItem.children)
    }
  }
  return _columns
}

export const rightArrowPressed = (columns) => {
  console.debug('rightArrowPressed')
  const _columns = columns
  if (!_isInitial(_columns)) {
    const { columnIndex, itemIndex } = _findIsSelected(_columns)
    const currentItem = _columns[columnIndex][itemIndex]
    // should be in function and should be functional
    currentItem.state.isSelected = false
    const nextItem = _columns[columnIndex + 1][itemIndex]
    nextItem.state.isSelected = true
  }
  return _columns
}

export const leftArrowPressed = (columns) => {
  console.debug('leftArrowPressed')
  return columns
}

export const upArrowPressed = (columns) => {
  console.debug('upArrowPressed')
  return columns
}

export const downArrowPressed = (columns) => {
  console.debug('downArrowPressed')
  let _columns = columns
  if (!_isInitial(_columns)) {
    console.log('isNotInitial')
    const { columnIndex, itemIndex } = _findIsSelected(_columns)
    let nextItemIndex = itemIndex + 1
    const maximumItemIndex = _columns[columnIndex].length - 1
    const isNextItemAvailable = nextItemIndex > maximumItemIndex
    console.log('columnIndex', columnIndex)
    console.log('itemIndex', itemIndex)
    console.log('nextItemIndex', nextItemIndex)
    console.log('isNextItemAvailable', isNextItemAvailable)
    if (isNextItemAvailable) {
      nextItemIndex = 0
    }
    const nextItem = _columns[columnIndex][nextItemIndex]
    _columns = setIsSelected(_columns, columnIndex, nextItemIndex)
    _columns = cropColumns(_columns, _columns.length - 1)
    if (nextItem.state.hasChildren) {
      console.log('hasChildren')
      _columns = addColumn(_columns, nextItem.children)
    }
  }
  return _columns
}

const _findIsSelected = (columns) => {
  const columnIndex = columns.findIndex(_column => {
    return _column.some(_item => _isSelected(_item))
  })
  // if no column is found set the first item as default
  if (columnIndex < 0) {
    return {
      columnIndex: 0,
      itemIndex: 0
    }
  }
  const itemIndex = columns[columnIndex].findIndex(_item => _isSelected(_item))
  return {
    columnIndex: columnIndex,
    itemIndex: itemIndex
  }
}

const _isSelected = (item) => item.state ? item.state.isSelected === true : false

const _isInitial = (columns) => {
  const { columnIndex, itemIndex } = _findIsSelected(columns)
  const currentItem = columns[columnIndex][itemIndex]
  return columnIndex === 0 && itemIndex === 0 && !currentItem.state.isSelected
}

/**
 * Helper functions
 */

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
const removeAllStates = (columns) => {
  console.debug('removeAllStates')
  // TODO: loop over all columns and items and remove their states
  return columns.map(column => {
    return column.map(item => {
      return {
        ...item,
        state: setStates(item)
      }
    })
  })
}
