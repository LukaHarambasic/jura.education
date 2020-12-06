// TODO: has to be renamed

export const setup = (files) => {
  console.debug('setup')
  return [files].map(items => {
    return items.map(item => {
      return {
        ...item,
        state: defaultState(item)
      }
    })
  })
}

export const addColumn = (columns, children) => {
  console.debug('addColumn')
  console.log(children)
  return [
    ...columns,
    children.map(item => {
      return {
        ...item,
        state: defaultState(item)
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
