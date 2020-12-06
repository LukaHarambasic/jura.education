// TODO: has to be renamed

export const setup = (files) => {
  console.debug('setup')
  // files is an object, so it's converted to an array to use map()
  return [files].map(_items => {
    return _items.map(_item => {
      return {
        ..._item,
        state: defaultState(_item)
      }
    })
  })
}

export const addColumn = (columns, children) => {
  console.debug('addColumn')
  return [
    ...columns,
    children.map(_item => {
      return {
        ..._item,
        state: defaultState(_item)
      }
    })
  ]
}

export const defaultState = (item, isSelected = false, wasSelected = false) => {
  return {
    isSelected: isSelected,
    wasSelected: wasSelected,
    hasChildren: item.children ? item.children.length > 0 : false
  }
}

// tried to make this functional
// columns could be directly modified and returned
export const setWasSelected = (columns, columnIndex, itemIndex) => {
  console.debug('setWasSelected')
  return columns.map((_column, _columnIndex) => {
    if (columnIndex === _columnIndex) {
      return _column.map((_item, _itemIndex) => {
        return {
          ..._item,
          state: defaultState(_item, false, itemIndex === _itemIndex)
        }
      })
    } else {
      return _column
    }
  })
}

// maybe relevant for arrow navigation
// export const setIsSelected = (columns, columnIndex, itemIndex) => {
//   const columnsCopy = columns
//   columnsCopy[columnIndex] = columns[columnIndex].map((item, index) => {
//     return {
//       ...item,
//       state: defaultState(item, itemIndex === index)
//     }
//   })
//   return columnsCopy
// }
