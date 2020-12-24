export const getItemById = (item, id) => {
  if (item.id === id) {
    return item
  } else if (hasChildren(item)) {
    let result = null
    // TODO can be nicer? no let?
    for (let i = 0; result === null && i < item.children.length; i++) {
      result = getItemById(item.children[i], id)
    }
    return result
  }
  return null
}

export const hasChildren = (item) => item.children ? item.children.length > 0 : false

export const isSelected = (selectedIds, itemId) => selectedIds[selectedIds.length - 1] === itemId

export const isInPath = (selectedIds, itemId) => selectedIds.includes(itemId)

export const getItemById2 = (tree, id) => {
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
