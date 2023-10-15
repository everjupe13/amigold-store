import { SortListType } from './catalog.types'

export const SortList: SortListType = [
  {
    id: 1,
    label: 'Актуальности',
    sortKey: ''
  },
  {
    id: 2,
    label: 'Новинки',
    sortKey: 'isNew'
  },
  {
    id: 3,
    label: 'Сначала дешевые',
    sortKey: 'prices'
  },
  {
    id: 4,
    label: 'Сначала дорогие',
    sortKey: '-prices'
  },
  {
    id: 5,
    label: 'По размеру скидки',
    sortKey: '-discount'
  }
]
