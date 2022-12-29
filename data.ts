import type { Bill } from "type"

export const UNPAID_BILLS: Bill[] = [
  {
    id: "20b0cc8c-88a7-4407-88db-cdc493267594",
    created_at: Date.now(),
    icon: "🥩",
    title: "Waroeng Steak",
    amount: 140_000,
    is_paid: false,
    person: [
      {
        id: "0dad8825-6d7a-44fa-8c6f-b3aacaa5c858",
        name: "Fitrah",
        amount: 20_000,
        is_paid: true,
      },
      {
        id: "0c81303c-a385-40a6-b947-1868c985ec20",
        name: "Annisa",
        amount: 50_000,
        is_paid: false,
      },
      {
        id: "5a55358f-2a60-4369-a315-9edcc1cc6374",
        name: "Alex",
        amount: 30_000,
        is_paid: true,
      },
      {
        id: "c7d354fe-66ff-4657-b3b1-eafece9e837b",
        name: "Joko",
        amount: 40_000,
        is_paid: false,
      },
    ],
  },
  {
    id: "d2f2dd0f-60bb-4c13-b3fb-343ae882f487",
    created_at: Date.now(),
    icon: "🍝",
    title: "Pasta Banget",
    amount: 130_000,
    is_paid: false,
    person: [
      {
        id: "0dad8825-6d7a-44fa-8c6f-b3aacaa5c858",
        name: "Fitrah",
        amount: 20_000,
        is_paid: true,
      },
      {
        id: "0c81303c-a385-40a6-b947-1868c985ec20",
        name: "Annisa",
        amount: 50_000,
        is_paid: false,
      },
      {
        id: "5a55358f-2a60-4369-a315-9edcc1cc6374",
        name: "Alex",
        amount: 30_000,
        is_paid: false,
      },
      {
        id: "c7d354fe-66ff-4657-b3b1-eafece9e837b",
        name: "Joko",
        amount: 40_000,
        is_paid: false,
      },
    ],
  },
]

export const PAID_BILLS: Bill[] = [
  {
    id: "20b0cc8c-88a7-4407-88db-cdc493267594",
    created_at: Date.now(),
    icon: "🥐",
    title: "La Paris",
    amount: 140_000,
    is_paid: true,
    person: [
      {
        id: "0dad8825-6d7a-44fa-8c6f-b3aacaa5c858",
        name: "Fitrah",
        amount: 20_000,
        is_paid: true,
      },
      {
        id: "0c81303c-a385-40a6-b947-1868c985ec20",
        name: "Annisa",
        amount: 50_000,
        is_paid: true,
      },
      {
        id: "5a55358f-2a60-4369-a315-9edcc1cc6374",
        name: "Alex",
        amount: 30_000,
        is_paid: true,
      },
      {
        id: "c7d354fe-66ff-4657-b3b1-eafece9e837b",
        name: "Joko",
        amount: 40_000,
        is_paid: true,
      },
    ],
  },
  {
    id: "d2f2dd0f-60bb-4c13-b3fb-343ae882f487",
    created_at: Date.now(),
    icon: "🍇",
    title: "Buah Segarz",
    amount: 130_000,
    is_paid: true,
    person: [
      {
        id: "0dad8825-6d7a-44fa-8c6f-b3aacaa5c858",
        name: "Fitrah",
        amount: 20_000,
        is_paid: true,
      },
      {
        id: "0c81303c-a385-40a6-b947-1868c985ec20",
        name: "Annisa",
        amount: 50_000,
        is_paid: true,
      },
      {
        id: "5a55358f-2a60-4369-a315-9edcc1cc6374",
        name: "Alex",
        amount: 30_000,
        is_paid: true,
      },
      {
        id: "c7d354fe-66ff-4657-b3b1-eafece9e837b",
        name: "Joko",
        amount: 40_000,
        is_paid: true,
      },
    ],
  },
]