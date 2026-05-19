export class WalletRefDTO {
  constructor(
    public readonly id: string = '',
    public readonly name: string = '',
  ) {}

  static empty(): WalletRefDTO {
    return new WalletRefDTO()
  }
}

export class CategoryRefDTO {
  constructor(
    public readonly id: string = '',
    public readonly name: string = '',
    public readonly icon: string | null = null,
    public readonly type: string = '',
  ) {}

  static empty(): CategoryRefDTO {
    return new CategoryRefDTO()
  }
}

export class TransactionDTO {
  constructor(
    public readonly id: string = '',
    public readonly amount: number = 0,
    public readonly type: 'income' | 'expense' | 'transfer' = 'expense',
    public readonly date: string = '',
    public readonly description: string | null = null,
    public readonly userId: string = '',
    public readonly organizationId: string | null = null,
    public readonly wallet: WalletRefDTO = WalletRefDTO.empty(),
    public readonly category: CategoryRefDTO | null = null,
    public readonly toWallet: WalletRefDTO | null = null,
  ) {}

  static empty(): TransactionDTO {
    return new TransactionDTO()
  }

  isExpense(): boolean {
    return this.type === 'expense'
  }

  isIncome(): boolean {
    return this.type === 'income'
  }

  isTransfer(): boolean {
    return this.type === 'transfer'
  }

  get label(): string {
    return this.description || this.category?.name || 'Transfer'
  }

  get displayIcon(): string {
    return this.category?.icon ?? ''
  }
}

export class TransactionListDTO {
  constructor(
    public readonly transactionList: TransactionDTO[] = [],
  ) {}

  static empty(): TransactionListDTO {
    return new TransactionListDTO()
  }
}

export class WalletDTO {
  constructor(
    public readonly id: string = '',
    public readonly name: string = '',
    public readonly balance: number = 0,
    public readonly currency: string = 'IDR',
    public readonly type: string = '',
    public readonly userId: string = '',
    public readonly organizationId: string | null = null,
    public readonly createdAt: string = '',
  ) {}

  static empty(): WalletDTO {
    return new WalletDTO()
  }
}

export class WalletListDTO {
  constructor(
    public readonly walletList: WalletDTO[] = [],
  ) {}

  static empty(): WalletListDTO {
    return new WalletListDTO()
  }
}

export class CategoryDTO {
  constructor(
    public readonly id: string = '',
    public readonly name: string = '',
    public readonly icon: string | null = null,
    public readonly type: string = '',
  ) {}

  static empty(): CategoryDTO {
    return new CategoryDTO()
  }
}

export class CategoryListDTO {
  constructor(
    public readonly categoryList: CategoryDTO[] = [],
  ) {}

  static empty(): CategoryListDTO {
    return new CategoryListDTO()
  }
}

export type TransactionType = 'income' | 'expense' | 'transfer'

export class CreateTransactionDTO {
  constructor(
    public readonly type: TransactionType = 'expense',
    public readonly amount: number = 0,
    public readonly walletId: string = '',
    public readonly toWalletId: string = '',
    public readonly categoryId: string = '',
    public readonly description: string = '',
    public readonly date: string = new Date().toISOString().split('T')[0]!,
  ) {}

  static empty(): CreateTransactionDTO {
    return new CreateTransactionDTO()
  }
}
