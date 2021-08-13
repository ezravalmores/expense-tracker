/* eslint-disable @typescript-eslint/no-explicit-any */

import { findIndex } from 'lodash-es';

import { Expense } from '../interfaces/application';
import {
  LOADING_EXPENSES,
  LOADING_EXPENSES_FAILED,
  LOADING_EXPENSES_SUCCESS,
  SAVING_EXPENSE,
  SAVING_EXPENSE_FAILED,
  SAVING_EXPENSE_SUCCESS,
  DELETING_EXPENSE,
  DELETING_EXPENSE_FAILED,
  DELETING_EXPENSE_SUCCESS,
  ExpenseDispatchTypes,
  SET_EXPENSE,
  OPEN_CLOSE_EXPENSE_MODAL,
  UPDATING_EXPENSE_SUCCESS
} from '../actions/expense/actionTypes';

interface State {
  expenses: Expense[];
  selectedExpense: Expense | undefined | null;
  expenseModalOpen: boolean;
  isLoadingExpenses: boolean;
  loadingExpensesFailed: boolean;
  loadingExpensesSuccess: boolean;
  isSavingExpense: boolean;
  savingExpenseFailed: boolean;
  savingExpenseSuccess: boolean;
  isDeletingExpense: boolean;
  deletingExpenseFailed: boolean;
  deletingExpenseSuccess: boolean;
}

const defaultState: State = {
  expenses: [],
  selectedExpense: null,
  expenseModalOpen: false,
  isLoadingExpenses: false,
  loadingExpensesFailed: false,
  loadingExpensesSuccess: false,
  isSavingExpense: false,
  savingExpenseFailed: false,
  savingExpenseSuccess: false,
  isDeletingExpense: false,
  deletingExpenseFailed: false,
  deletingExpenseSuccess: false
};

const expenseReducer = (state: State = defaultState, action: ExpenseDispatchTypes): State => {
  let expenses: Expense[] = [];

  switch (action.type) {
    case LOADING_EXPENSES:
      return {
        ...state,
        selectedExpense: undefined,
        isLoadingExpenses: true,
        loadingExpensesSuccess: false
      }
    case LOADING_EXPENSES_SUCCESS:
      return {
        ...state,
        isLoadingExpenses: false,
        loadingExpensesSuccess: true,
        expenses: action.payload
      }
    case LOADING_EXPENSES_FAILED:
      return {
        ...state,
        isLoadingExpenses: false,
        loadingExpensesFailed: true
      }
    case SAVING_EXPENSE:
      return {
        ...state,
        selectedExpense: undefined,
        isSavingExpense: true,
        savingExpenseSuccess: false,
        savingExpenseFailed: false
      }
    case SAVING_EXPENSE_SUCCESS:
      return {
        ...state,
        selectedExpense: undefined,
        savingExpenseSuccess: true,
        isSavingExpense: false,
        expenses: [...state.expenses, action.payload]
      }
    case SAVING_EXPENSE_FAILED:
      return {
        ...state,
        isSavingExpense: false,
        savingExpenseFailed: true
      }
    case UPDATING_EXPENSE_SUCCESS:
      // Dont mutate current state
      expenses = [...state.expenses];

      var index = findIndex(expenses, { id: action.payload.id });

      if (index !== -1) {
        expenses[index] = action.payload;
      }

      return {
        ...state,
        selectedExpense: undefined,
        savingExpenseSuccess: true,
        isSavingExpense: false,
        expenses: expenses
      }
    case DELETING_EXPENSE:
      return {
        ...state,
        isDeletingExpense: true,
        deletingExpenseSuccess: false,
        deletingExpenseFailed: false
      }
    case DELETING_EXPENSE_SUCCESS:
      expenses = [...state.expenses].filter((expense: Expense) => expense.id !== action.payload);

      return {
        ...state,
        selectedExpense: null,
        isDeletingExpense: true,
        savingExpenseSuccess: false,
        deletingExpenseSuccess: true,
        deletingExpenseFailed: false,
        expenses: expenses
      }
    case DELETING_EXPENSE_FAILED:
      return {
        ...state,
        selectedExpense: null,
        isDeletingExpense: false,
        deletingExpenseFailed: true,
      }
    case SET_EXPENSE:
      return {
        ...state,
        selectedExpense: action.payload
      }
    case OPEN_CLOSE_EXPENSE_MODAL:
      return {
        ...state,
        savingExpenseFailed: false,
        expenseModalOpen: action.payload
      }
    default:
      return state
  }
}

export default expenseReducer;