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
  icon: string
  title: string
  amount: number
  is_paid: boolean
  person: BilledPerson[]
}
