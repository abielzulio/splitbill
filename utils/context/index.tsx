import type { BilledItem, BilledPerson } from "data/type"
import { createContext } from "react"

export const BilledItemsPersonContext = createContext<{
  billedPerson: BilledPerson[]
  billedItems: BilledItem[]
  onChangeBilledItem: (billedItem: BilledItem) => void
  deleteBilledItem: (billedItem: BilledItem) => void
  addBilledItem: (billedItem: BilledItem) => void
}>({
  billedPerson: [],
  billedItems: [],
  onChangeBilledItem: () => {},
  deleteBilledItem: () => {},
  addBilledItem: () => {},
})
