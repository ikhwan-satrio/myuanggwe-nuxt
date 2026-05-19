import type { TransactionType, CategoryType, WalletType } from "~~/server/lib/db/schemas"

export interface TransactionMerge extends TransactionType {
  category: CategoryType;
  wallet: WalletType;
  toWallet: WalletType;
}
