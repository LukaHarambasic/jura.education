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

export const isInitial = (selectedIds) => selectedIds.length <= 1

export const isAllowedKey = (key) => ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(key)
