export class CategoryDTO {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icon: string | null,
    public readonly type: string,
  ) {}

  static of(id: string, name: string, icon: string | null, type: string): CategoryDTO {
    return new CategoryDTO(id, name, icon, type)
  }

  static empty(): CategoryDTO {
    return new CategoryDTO('', '', null, '')
  }
}

export class WalletDTO {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly balance: number,
    public readonly currency: string,
    public readonly type: string,
    public readonly userId: string,
    public readonly organizationId: string | null,
    public readonly createdAt: string,
  ) {}

  static of(
    id: string,
    name: string,
    balance: number,
    currency: string,
    type: string,
    userId: string,
    organizationId: string | null,
    createdAt: string,
  ): WalletDTO {
    return new WalletDTO(id, name, balance, currency, type, userId, organizationId, createdAt)
  }

  static empty(): WalletDTO {
    return new WalletDTO('', '', 0, 'IDR', '', '', null, '')
  }
}

export class TransactionDTO {
  private constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly type: 'income' | 'expense' | 'transfer',
    public readonly date: string,
    public readonly note: string | null,
    public readonly userId: string,
    public readonly organizationId: string | null,
    public readonly category: CategoryDTO | null,
    public readonly wallet: WalletDTO | null,
    public readonly toWallet: WalletDTO | null,
  ) {}

  static of(
    id: string,
    amount: number,
    type: 'income' | 'expense' | 'transfer',
    date: string,
    note: string | null,
    userId: string,
    organizationId: string | null,
    category: CategoryDTO | null,
    wallet: WalletDTO | null,
    toWallet: WalletDTO | null,
  ): TransactionDTO {
    return new TransactionDTO(id, amount, type, date, note, userId, organizationId, category, wallet, toWallet)
  }

  static empty(): TransactionDTO {
    return new TransactionDTO('', 0, 'expense', '', null, '', null, null, null, null)
  }

  isExpense(): boolean {
    return this.type === 'expense' || this.type === 'transfer'
  }

  isIncome(): boolean {
    return this.type === 'income'
  }
}

export class DashboardDTO {
  private constructor(
    public readonly walletList: WalletDTO[],
    public readonly totalBalance: number,
    public readonly walletCount: number,
    public readonly monthlyIncome: number,
    public readonly monthlyExpense: number,
    public readonly recentTransactions: TransactionDTO[],
  ) {}

  static of(
    walletList: WalletDTO[],
    totalBalance: number,
    walletCount: number,
    monthlyIncome: number,
    monthlyExpense: number,
    recentTransactions: TransactionDTO[],
  ): DashboardDTO {
    return new DashboardDTO(walletList, totalBalance, walletCount, monthlyIncome, monthlyExpense, recentTransactions)
  }

  static empty(): DashboardDTO {
    return new DashboardDTO([], 0, 0, 0, 0, [])
  }

  get monthlySavings(): number {
    return this.monthlyIncome - this.monthlyExpense
  }

  get savingsRate(): number {
    if (this.monthlyIncome === 0) return 0
    return ((1 - this.monthlyExpense / this.monthlyIncome) * 100)
  }

  get financialStatus(): 'healthy' | 'attention' | 'no-activity' {
    if (this.monthlyIncome === 0 && this.monthlyExpense === 0) return 'no-activity'
    if (this.monthlyIncome > this.monthlyExpense) return 'healthy'
    return 'attention'
  }
}
