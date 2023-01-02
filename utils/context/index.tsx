import type { BilledItem, BilledPerson } from "data/type"
import { createContext } from "react"

export const BilledItemsContext = createContext<{
  billedItems: BilledItem[]
  onChangeBilledItem: (billedItem: BilledItem) => void
  deleteBilledItem: (billedItem: BilledItem) => void
  addBilledItem: (billedItem: BilledItem) => void
}>({
  billedItems: [],
  onChangeBilledItem: () => {},
  deleteBilledItem: () => {},
  addBilledItem: () => {},
})

export const BilledPersonContext = createContext<{
  billedPerson: BilledPerson[]
  onChangeBilledPerson?: (billedItem: BilledPerson) => void
  deleteBilledPerson?: (billedItem: BilledPerson) => void
  addBilledPerson?: (billedItem: BilledPerson) => void
}>({
  billedPerson: [],
  /*   onChangeBilledPerson: () => {},
  deleteBilledPerson: () => {},
  addBilledPerson: () => {}, */
})
