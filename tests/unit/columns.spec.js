import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Columns from '@/components/Columns'
import mock from '@/assets/mock.json'

describe('Columns.vue', () => {
  let component
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()
  beforeEach(() => {
    component = shallowMount(Columns, {
      localVue,
      router,
      propsData: { tree: mock }
    })
  })
  it('displays initial column', () => {
    const columns = component.findAll('.column')
    expect(columns.length).toBe(1)
  })
  it('is initial first item text "Öffentliches Recht"', () => {
    const items = component.findAll('.item')
    expect(items.at(0).text()).toMatch('Öffentliches Recht')
  })
  it('has initial column three children', () => {
    const items = component.findAll('.item')
    expect(items.length).toBe(3)
  })
  it('click at first item in first column and test selectedIds', async () => {
    const items = component.findAll('.item')
    await items.at(0).trigger('click')
    expect(component.vm.selectedIds).toStrictEqual([1, 2])
  })
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
  })
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
  it('initial keyboard press: ArrowDown', () => {
    console.log('before', component.vm.selectedIds)
    component.setData({ selectedIds: [1] })
    component.vm.onkeydown({ key: 'ArrowDown' })
    console.log('after', component.vm.selectedIds)
    expect(component.vm.selectedIds).toStrictEqual([1, 2])
  })
  it('initial keyboard press: ArrowUp', () => {
    component.setData({ selectedIds: [1] })
    component.vm.onkeydown({ key: 'ArrowUp' })
    expect(component.vm.selectedIds).toStrictEqual([1, 2])
  })
  it('initial keyboard press: ArrowLeft', () => {
    component.setData({ selectedIds: [1] })
    component.vm.onkeydown({ key: 'ArrowLeft' })
    expect(component.vm.selectedIds).toStrictEqual([1, 2])
  })
  it('initial keyboard press: ArrowRight', () => {
    component.setData({ selectedIds: [1] })
    component.vm.onkeydown({ key: 'ArrowRight' })
    expect(component.vm.selectedIds).toStrictEqual([1, 2])
  })
  it('initial keyboard press: d', () => {
    component.setData({ selectedIds: [1] })
    component.vm.onkeydown({ key: 'd' })
    expect(component.vm.selectedIds).toStrictEqual([1])
  })
  it('second keyboard press: ArrowDown', () => {
    component.setData({ selectedIds: [1] })
    component.vm.onkeydown({ key: 'ArrowDown' })
    component.vm.onkeydown({ key: 'ArrowDown' })
    expect(component.vm.selectedIds).toStrictEqual([1, 904])
    // TODO: also test what is visible on ui
  })
  it('third keyboard press: ArrowDown', () => {
    component.setData({ selectedIds: [1] })
    component.vm.onkeydown({ key: 'ArrowDown' })
    component.vm.onkeydown({ key: 'ArrowDown' })
    component.vm.onkeydown({ key: 'ArrowDown' })
    expect(component.vm.selectedIds).toStrictEqual([1, 905])
    // TODO: also test what is visible on ui
  })
  // TODO: arrows -> up, right, left per one and different combinations + ui
  // TODO: test columns for change: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
  // TODO: test reset in columns
  // TODO: keyboard navigation with edge cases
  // TODO: test query params
})
