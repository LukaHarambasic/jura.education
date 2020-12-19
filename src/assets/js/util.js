export const getItemById = (tree, id) => {
  // console.log('getItemById with Id', id)
  return tree.find(_item => {
    // console.log('------------------------')
    // console.log(`itemid: ${_item.id}, searchid: ${id}`)
    if (_item.id === id) {
      // console.log('true')
      return true
    } else if (hasChildren) {
      // console.log('hasChildren')
      return getItemById(_item.children, id)
    }
    // console.log('false')
    return false
  })
}

export const hasChildren = (item) => item.children ? item.children.length > 0 : false

export const isSelected = (selectedIds, itemId) => selectedIds[selectedIds.length - 1] === itemId

export const isInPath = (selectedIds, itemId) => selectedIds.includes(itemId)
