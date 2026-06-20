import type { TransactionType, CategoryType, WalletType } from "~~/server/lib/db/schemas"

export interface TransactionMerge extends TransactionType {
  fromAmount: number | null;
  afterTransaction: string | null;
  category: CategoryType;
  wallet: WalletType;
  toWallet: WalletType;
}
