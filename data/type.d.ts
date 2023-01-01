export interface Person {
  id: string
  name: string
  phone?: number
}

export interface BilledPerson extends Person {
  amount: number
  is_paid: boolean
}
export interface Bill {
  id: string
  created_at: number
  url?: string
  icon?: string
  img?: string
  title: string
  amount?: number
  is_paid?: boolean
  person?: BilledPerson[]
}

export interface OCRBill extends Bill {
  items: BilledItem[]
  fees: Fee[]
}

export interface BilledItem {
  id: number
  title: string
  qty: number
  price: number
  person?: Person[]
}

interface Fee {
  id: number
  price: number
}
