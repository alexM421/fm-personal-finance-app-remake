export type PersonnalSettings = {
    budgetCycleDay: number,
    preferredCurrency: string,
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
}

export type Budget = {
  category: string,
  maximum: number,
  theme: string,
}

export type Pot = {
  name: string,
  target: number,
  total: number,
  theme: string,
}

export type Data = {
    personnalSettings: PersonnalSettings,
    balance: Balance,
    transactions: Transaction[],
    budgets: Budget[],
    pots: Pot[],
    created_at: string,
    updated_at: string,
    user_id: string,
}