// TODO: file has to be renamed

/**
 * "columns[]" contains one to n "column[]".
 * One "column[]" contains oen to multiple "item{}",
 * an "item{}" represents a folder or a file name.
 * columns[] -> column[] -> item{}
 */

/**
 * Set's the initial column
 * @param files
 * @returns []
 */
export const setup = (files) => {
  console.debug('setup')
  // files is an object, so it's converted to an array to use map()
  return [files].map(_items => {
    return _items.map(_item => {
      return {
        ..._item,
        state: setStates(_item)
      }
    })
  })
}

/**
 * Add a new column where each item has predfined default states
 * @param columns
 * @param children
 * @returns []
 */
export const addColumn = (columns, children) => {
  console.debug('addColumn')
  return [
    ...columns,
    children.map(_item => {
      return {
        ..._item,
        state: setStates(_item)
      }
    })
  ]
}

/**
 * Set wasSelect for the selected item and reset it for all others. This is relevant if a user navigates back.
 * Otherwise multiple items would have wasSelected = true
 * was selected is true if the itemIndex from the clicked item matches the one in the column, all others are false.
 *
 * @param columns
 * @param columnIndex
 * @param itemIndex
 * @returns []
 */
export const setWasSelected = (columns, columnIndex, itemIndex) => {
  console.debug('setWasSelected')
  return columns.map((_column, _columnIndex) => {
    if (columnIndex === _columnIndex) {
      return _column.map((_item, _itemIndex) => {
        return {
          ..._item,
          state: setStates(_item, false, itemIndex === _itemIndex)
        }
      })
    } else {
      return _column
    }
  })
}

/**
 * Set wasSelect for the selected item and reset it for all others. This is relevant if a user navigates back.
 * Otherwise multiple items would have wasSelected = true
 * was selected is true if the itemIndex from the clicked item matches the one in the column, all others are false.
 *
 * @param columns
 * @param columnIndex
 * @param itemIndex
 * @returns []
 */
export const setIsSelected = (columns, columnIndex, itemIndex) => {
  console.debug('setIsSelected')
  return columns.map((_column, _columnIndex) => {
    if (columnIndex === _columnIndex) {
      return _column.map((_item, _itemIndex) => {
        return {
          ..._item,
          state: setStates(_item, itemIndex === _itemIndex, false)
        }
      })
    } else {
      return _column
    }
  })
}

/**
 * Returns cropped columns
 * @param columns
 * @param length
 * @returns []
 */
export const cropColumns = (columns, length) => {
  return length === 0 ? columns : columns.slice(0, length)
}

/**
 * Sets the states for an item (preconfigered), but also can handle inputs, e.g. setWasSelected()
 * @param item
 * @param isSelected
 * @param wasSelected
 * @returns {{wasSelected: boolean, hasChildren: boolean, isSelected: boolean}}
 */
export const setStates = (item, isSelected = false, wasSelected = false) => {
  return {
    isSelected: isSelected,
    wasSelected: wasSelected,
    hasChildren: item.children ? item.children.length > 0 : false
  }
}
