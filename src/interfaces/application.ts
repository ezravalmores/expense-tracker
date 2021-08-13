export enum ENTRY_TYPE {
  expense = 'expense',
  income = 'income'
}

export interface Category {
  id: number | string;
  name: string;
  entryType: ENTRY_TYPE;
  description: string;
}

export interface Expense {
  id: number | string;
  categoryId: number | string;
  categoryName: string;
  title: string;
  amount: number;
  createdAt: string;
  transactionDate: string;
}

export interface ExpensePayload {
  id?: string | number;
  category_id: number | string;
  title: string;
  amount: string | number;
  transaction_date: string;
}

export interface CategoryPayload {
  id?: string | number;
  name: string;
  description: string;
  entry_type: string
}