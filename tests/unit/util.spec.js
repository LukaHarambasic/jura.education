import { hasChildren, isInPath, isSelected } from '@/assets/js/util'
// import mock from '@/assets/mock.json'

describe('util.js', () => {
/*  it('getItemById returns correct item', () => {
    const item0 = getItemById([mock], 1) // first id
    const item1 = getItemById([mock], 2)
    const item2 = getItemById([mock], 11)
    const item3 = getItemById([mock], 948)
    const item4 = getItemById([mock], 1205)
    const item5 = getItemById([mock], 2146) // last id
    expect(item0.name).toMatch('content')
    expect(item0.name).not.toMatch('moritz')
    expect(item1.name).toMatch('Öffentliches Recht')
    expect(item1.name).not.toMatch('daniel')
    expect(item1.name).not.toMatch('')
    expect(item2.name).toMatch('(i) Zulässigkeit')
    expect(item2.name).not.toMatch('simon')
    expect(item3.name).toMatch('Im analogen Geschäftsverkehr')
    expect(item3.name).not.toMatch('felix')
    expect(item4.name).toMatch('(c2) Unrichtige Übermittlung, § 120 BGB')
    expect(item4.name).not.toMatch('richi')
    expect(item5.name).toMatch('E. Ansprüche aus ungerechtfertigter Bereicherung')
    expect(item5.name).not.toMatch('jonas')
    expect(item5.name).not.toMatch('')
  }) */
  // TODO: rename
  it('hasChildren', () => {
    expect(hasChildren({})).toBe(false)
    expect(hasChildren({ children: [] })).toBe(false)
    expect(hasChildren({ children: null })).toBe(false)
    expect(hasChildren({ children: undefined })).toBe(false)
    expect(hasChildren({ children: ['18', '02', '1996'] })).toBe(true)
    expect(hasChildren({ children: ['25', '05', '1997'] })).toBe(true)
    expect(hasChildren({ children: [{}] })).toBe(true)
    expect(hasChildren({ children: [{}, {}] })).toBe(true)
    expect(hasChildren({ children: [999, 434, 121] })).toBe(true)
  })
  // TODO: rename
  it('isSelected', () => {
    expect(isSelected([1, 4], 4)).toBe(true)
    expect(isSelected([], 1)).toBe(false)
    expect(isSelected([4, 5, 49], 2)).toBe(false)
  })
  // TODO: rename
  it('isInPath', () => {
    expect(isInPath([1, 4], 1)).toBe(true)
    expect(isInPath([], 1)).toBe(false)
    expect(isInPath([4, 5, 49], 2)).toBe(false)
  })
})
