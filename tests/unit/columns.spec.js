import { shallowMount } from '@vue/test-utils'
import Columns from '@/components/Columns'
import mock from '@/assets/mock.json'

describe('Columns.vue', () => {
  let component
  beforeEach(() => {
    component = shallowMount(Columns, {
      propsData: { tree: mock }
    })
  })
  it('displays initial column', () => {
    const columns = component.findAll('.column')
    expect(columns.length).toBe(1)
    expect(columns.length).not.toBe(0)
    expect(columns.length).not.toBe(2)
  })
  it('is initial first item text "Öffentliches Recht"', () => {
    const items = component.findAll('.item')
    expect(items.at(0).text()).toMatch('Öffentliches Recht')
    expect(items.at(0).text()).not.toMatch('Strafrecht')
    expect(items.at(0).text()).not.toMatch('Zivilrecht')
  })
  it('has initial column three children', () => {
    const items = component.findAll('.item')
    expect(items.length).toBe(3)
  })
  it('click at first item in first column and test selectedIds', async () => {
    const items = component.findAll('.item')
    await items.at(0).trigger('click')
    expect(component.vm.selectedIds).toStrictEqual([1, 2])
    expect(component.vm.selectedIds).not.toStrictEqual([])
    expect(component.vm.selectedIds).not.toStrictEqual([2, 3])
  })
  // IMPORTANT: this test is failing and is implemented correctly
  it('click at first item in first column and test if items contains "§ 1 Abwehr von Maßnahmen"', async () => {
    const items = component.findAll('.item')
    await items.at(0).trigger('click')
    const items2 = component.findAll('.item')
    const foundItem = items2.wrappers.findIndex(_item => _item.text() === '§ 1 Abwehr von Maßnahmen')
    expect(foundItem).toBeGreaterThanOrEqual(0) // if it isn't found the index is -1
  })
  it('computed columns reflects length of selected ids', () => {
    component.setData({ selectedIds: [1, 2] })
    expect(component.vm.columns.length).toBe(2)
    expect(component.vm.columns.length).not.toBe(3)
    expect(component.vm.columns.length).not.toBe(1)
  })
  // IMPORTANT: this test is failing and is implemented correctly
  it('computed columns contain the correct items', () => {
    const FIRST_COLUM = ['Öffentliches Recht', 'Zivilrecht', 'Strafrecht']
    const SECOND_COLUM = ['§ 1 Abwehr von Maßnahmen', '§ 2 Erlass von Maßnahmen', '§ 3 Feststellung der Rechtswidrigkeit']
    component.setData({ selectedIds: [1, 2] })
    const columns = component.vm.columns
    const isFirstColumnCorrect = columns[0].every(_item => FIRST_COLUM.includes(_item.name))
    const isSecondColumnCorrect = columns[1].every(_item => SECOND_COLUM.includes(_item.name))
    expect(isFirstColumnCorrect).toBe(true)
    expect(isSecondColumnCorrect).toBe(true)
  })
  // TODO: keyboard navigation with edge cases
})
