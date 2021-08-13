import { Dispatch } from 'redux';
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
  UPDATING_EXPENSE_SUCCESS,
  SET_EXPENSE,
  OPEN_CLOSE_EXPENSE_MODAL,
  ExpenseDispatchTypes
} from './actionTypes';
import Api, { METHODS } from '../../utils/api';
import { Expense, ExpensePayload } from '../../interfaces/application';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getExpenses = (range_type: string) => async (dispatch: Dispatch<ExpenseDispatchTypes>) => {
  try {
    dispatch({
      type: LOADING_EXPENSES
    })
    const path = `/expenses?range_type=${range_type}`
    const res = await Api.doFetch(path, {}, METHODS.GET)
    const json = await res.json();

    let expenses: Expense[] = [];
    json.data.map((json: any) => expenses = [...expenses, {...json.attributes}])

    dispatch({
      type: LOADING_EXPENSES_SUCCESS,
      payload: expenses
    })
  } catch(e) {
    dispatch({
      type: LOADING_EXPENSES_FAILED
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const saveExpense = (payload: ExpensePayload) => async (dispatch: Dispatch<ExpenseDispatchTypes>) => {
  try {
    dispatch({
      type: SAVING_EXPENSE
    })
    const path = `/expenses`
    const res = await Api.doFetch(path, payload, METHODS.POST)
    const json = await res.json();

    dispatch({
      type: SAVING_EXPENSE_SUCCESS,
      payload: json.data.attributes
    })
  } catch(e) {
    dispatch({
      type: SAVING_EXPENSE_FAILED
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateExpense = (payload: ExpensePayload, id: string | number) => async (dispatch: Dispatch<ExpenseDispatchTypes>) => {
  try {
    dispatch({
      type: SAVING_EXPENSE
    })
    const path = `/expenses/${id}`
    const res = await Api.doFetch(path, payload, METHODS.PUT)
    const json = await res.json();

    dispatch({
      type: UPDATING_EXPENSE_SUCCESS,
      payload: json.data.attributes
    })
  } catch(e) {
    dispatch({
      type: SAVING_EXPENSE_FAILED
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteExpense = (id: string | number) => async (dispatch: Dispatch<ExpenseDispatchTypes>) => {
  try {
    dispatch({
      type: DELETING_EXPENSE
    })
    const path = `/expenses/${id}`
    await Api.doFetch(path, undefined, METHODS.DELETE)

    dispatch({
      type: DELETING_EXPENSE_SUCCESS,
      payload: id
    })
  } catch(e) {
    dispatch({
      type: DELETING_EXPENSE_FAILED
    })
  }
}

export const setExpense = (expense: Expense | null) => (dispatch: Dispatch<ExpenseDispatchTypes>) => {
  dispatch({
    type: SET_EXPENSE,
    payload: expense
  })
}

export const openExpenseModal = (value: boolean) => (dispatch: Dispatch<ExpenseDispatchTypes>) => {
  dispatch({
    type: OPEN_CLOSE_EXPENSE_MODAL,
    payload: value
  })
}