import type { BilledItem } from "data/type"
import { createContext } from "react"

export const BilledItemsContext = createContext<{
  billedItems: BilledItem[]
  onChangeBilledItem: (billedItem: BilledItem) => void
  deleteBilledItem: (billedItem: BilledItem) => void
}>({
  billedItems: [],
  onChangeBilledItem: () => {},
  deleteBilledItem: () => {},
})
