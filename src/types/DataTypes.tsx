export type PersonnalSettings = {
    budgetCycleDay: number,
    preferredCurrency: string,
    originalBalance: number,
}

export type Balance = {
    current: number,
    income: number,
    expenses: number,
}

export type AvatarType = {
    theme: string,
    content: string,
    isContentImage: boolean
}   
export type Transaction = {
  avatar: AvatarType,
  name: string,
  category: string,
  date: string,
  amount: number,
  recurring: boolean,   
  currency: string,
  id: string,
  rate: number,
  billId?: string,
  skipped?: boolean,
}

export type Budget = {
  category: string,
  maximum: number,
  theme: string,
  id: string,
}

export type Pot = {
  name: string,
  target: number,
  total: number,
  theme: string,
  id: string,
}

export type Bill ={
  id: string,
  name: string,
  period: string,
  dueDate: string,
  avatar: AvatarType,
  amount: number,
  currency: string,
  category: string,
  isSuspended: boolean,
  status: "Bill" | "Income"
}

export type Data = {
    personnalSettings: PersonnalSettings,
    balance: Balance,
    transactions: Transaction[],
    budgets: Budget[],
    pots: Pot[],
    bills: Bill[],
    created_at: string,
    updated_at: string,
    user_id: string,
}