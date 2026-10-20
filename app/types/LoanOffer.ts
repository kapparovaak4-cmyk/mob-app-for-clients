import type { StatusTagVariant } from "./Status"

export interface LoanOffer {
  id: number | string

  bank: string
  program: string
  logo?: string

  amount: number
  monthlyPayment: number

  gesv: string
  term: string
  commission: number

  calculationDate: string

  statusText: string
  statusVariant?: StatusTagVariant
}