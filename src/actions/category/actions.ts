import { Dispatch } from 'redux';
import {
  LOADING_CATEGORIES,
  LOADING_CATEGORIES_FAILED,
  LOADING_CATEGORIES_SUCCESS,
  SAVING_CATEGORY,
  SAVING_CATEGORY_FAILED,
  SAVING_CATEGORY_SUCCESS,
  DELETING_CATEGORY,
  DELETING_CATEGORY_FAILED,
  DELETING_CATEGORY_SUCCESS,
  UPDATING_CATEGORY_SUCCESS,
  SET_CATEGORY,
  OPEN_CLOSE_CATEGORY_MODAL,
  CategoryDispatchTypes
} from './ActionTypes';
import Api, { METHODS } from '../../utils/api';
import { Category, CategoryPayload } from '../../interfaces/application';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCategories = () => async (dispatch: Dispatch<CategoryDispatchTypes>) => {
  try {
    dispatch({
      type: LOADING_CATEGORIES
    })
    const path = `/categories`
    const res = await Api.doFetch(path, {}, METHODS.GET)
    const json = await res.json();

    let categories: Category[] = [];
    json.data.map((json: any) => categories = [...categories, {...json.attributes}])

    dispatch({
      type: LOADING_CATEGORIES_SUCCESS,
      payload: categories
    })
  } catch(e) {
    dispatch({
      type:   LOADING_CATEGORIES_FAILED
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const saveCategory = (payload: CategoryPayload) => async (dispatch: Dispatch<CategoryDispatchTypes>) => {
  try {
    dispatch({
      type: SAVING_CATEGORY
    })
    const path = `/categories`
    const res = await Api.doFetch(path, payload, METHODS.POST)
    const json = await res.json();

    dispatch({
      type: SAVING_CATEGORY_SUCCESS,
      payload: json.data.attributes
    })
  } catch(e) {
    dispatch({
      type: SAVING_CATEGORY_FAILED
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateCategory = (payload: CategoryPayload, id: string | number) => async (dispatch: Dispatch<CategoryDispatchTypes>) => {
  try {
    dispatch({
      type: SAVING_CATEGORY
    })
    const path = `/categories/${id}`
    const res = await Api.doFetch(path, payload, METHODS.PUT)
    const json = await res.json();

    dispatch({
      type: UPDATING_CATEGORY_SUCCESS,
      payload: json.data.attributes
    })
  } catch(e) {
    dispatch({
      type: SAVING_CATEGORY_FAILED
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteCategory = (id: string | number) => async (dispatch: Dispatch<CategoryDispatchTypes>) => {
  try {
    dispatch({
      type: DELETING_CATEGORY
    })
    const path = `/categories/${id}`
    await Api.doFetch(path, undefined, METHODS.DELETE)

    dispatch({
      type: DELETING_CATEGORY_SUCCESS,
      payload: id
    })
  } catch(e) {
    dispatch({
      type: DELETING_CATEGORY_FAILED
    })
  }
}

export const setCategory = (category: Category | null) => (dispatch: Dispatch<CategoryDispatchTypes>) => {
  dispatch({
    type: SET_CATEGORY,
    payload: category
  })
}

export const openCategoryModal = (value: boolean) => (dispatch: Dispatch<CategoryDispatchTypes>) => {
  dispatch({
    type: OPEN_CLOSE_CATEGORY_MODAL,
    payload: value
  })
}