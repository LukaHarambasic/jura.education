import { getItemById, hasChildren, isInPath, isSelected } from '@/assets/js/util'
import mock from '@/assets/mock.json'

describe('util.js', () => {
  it('getItemById returns correct item', () => {
    const item0 = getItemById(mock, 1) // findable - first id
    const item1 = getItemById(mock, 2) // findable
    const item2 = getItemById(mock, 11) // findable
    const item3 = getItemById(mock, 948) // findable
    const item4 = getItemById(mock, 1205) // findable
    const item5 = getItemById(mock, 2146) // findable - last id
    const item6 = getItemById(mock, 0) // not findable
    const item7 = getItemById(mock, -180296) // not findable
    const item8 = getItemById(mock, 250597) // not findable
    expect(item0.name).toMatch('content')
    expect(item1.name).toMatch('Öffentliches Recht')
    expect(item2.name).toMatch('(i) Zulässigkeit')
    expect(item3.name).toMatch('Im analogen Geschäftsverkehr')
    expect(item4.name).toMatch('(c2) Unrichtige Übermittlung, § 120 BGB')
    expect(item5.name).toMatch('E. Ansprüche aus ungerechtfertigter Bereicherung')
    expect(item6).toBe(null)
    expect(item7).toBe(null)
    expect(item8).toBe(null)
  })
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
  // TODO isInital
  // TODO is allowed key
})
