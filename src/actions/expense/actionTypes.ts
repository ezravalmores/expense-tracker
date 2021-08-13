import { Expense } from '../../interfaces/application';

export const LOADING_EXPENSES = 'LOADING_EXPENSES';
export const LOADING_EXPENSES_FAILED = 'LOADING_EXPENSES_FAILED';
export const LOADING_EXPENSES_SUCCESS = 'LOADING_EXPENSES_SUCCESS';

export const SAVING_EXPENSE = 'SAVING_EXPENSE';
export const SAVING_EXPENSE_FAILED = 'SAVING_EXPENSE_FAILED';
export const SAVING_EXPENSE_SUCCESS = 'SAVING_EXPENSE_SUCCESS';

export const DELETING_EXPENSE = 'DELETING_EXPENSE';
export const DELETING_EXPENSE_FAILED = 'DELETING_EXPENSE_FAILED';
export const DELETING_EXPENSE_SUCCESS = 'DELETING_EXPENSE_SUCCESS';

export const UPDATING_EXPENSE_SUCCESS = 'UPDATING_EXPENSE_SUCCESS';

export const SET_EXPENSE = 'SET_EXPENSE';
export const OPEN_CLOSE_EXPENSE_MODAL = 'OPEN_CLOSE_EXPENSE_MODAL';

export interface ExpensesLoading {
  type: typeof LOADING_EXPENSES
}

export interface ExpensesLoadingFailed {
  type: typeof LOADING_EXPENSES_FAILED
}

export interface ExpensesLoadingSuccess {
  type: typeof LOADING_EXPENSES_SUCCESS,
  payload: Expense[]
}

export interface ExpenseSaving {
  type: typeof SAVING_EXPENSE
}

export interface ExpenseSavingFailed {
  type: typeof SAVING_EXPENSE_FAILED
}

export interface OpenCloseExpenseModal {
  type: typeof OPEN_CLOSE_EXPENSE_MODAL,
  payload: boolean
}

export interface ExpenseSavingSuccess {
  type: typeof SAVING_EXPENSE_SUCCESS,
  payload: Expense
}

export interface UpdatingSavingSuccess {
  type: typeof UPDATING_EXPENSE_SUCCESS,
  payload: Expense
}

export interface ExpenseDeleting {
  type: typeof DELETING_EXPENSE
}

export interface ExpenseDeletingFailed {
  type: typeof DELETING_EXPENSE_FAILED
}

export interface ExpenseDeletingSuccess {
  type: typeof DELETING_EXPENSE_SUCCESS,
  payload: string | number
}

export interface OpenCloseExpenseModal {
  type: typeof OPEN_CLOSE_EXPENSE_MODAL,
  payload: boolean
}

export interface SetExpense {
  type: typeof SET_EXPENSE,
  payload: Expense | null
}

export type ExpenseDispatchTypes = 
  ExpensesLoading |
  ExpensesLoadingFailed |
  ExpensesLoadingSuccess |
  ExpenseSaving |
  ExpenseSavingFailed |
  ExpenseSavingSuccess |
  UpdatingSavingSuccess |
  ExpenseDeleting |
  ExpenseDeletingFailed |
  ExpenseDeletingSuccess |
  SetExpense |
  OpenCloseExpenseModal