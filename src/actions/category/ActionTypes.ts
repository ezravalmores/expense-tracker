import { Category } from '../../interfaces/application';

export const LOADING_CATEGORIES = 'LOADING_CATEGORIES';
export const LOADING_CATEGORIES_FAILED = 'LOADING_CATEGORIES_FAILED';
export const LOADING_CATEGORIES_SUCCESS = 'LOADING_CATEGORIES_SUCCESS';

export const SAVING_CATEGORY = 'SAVING_CATEGORY';
export const SAVING_CATEGORY_FAILED = 'SAVING_CATEGORY_FAILED';
export const SAVING_CATEGORY_SUCCESS = 'SAVING_CATEGORY_SUCCESS';

export const DELETING_CATEGORY = 'DELETING_CATEGORY';
export const DELETING_CATEGORY_FAILED = 'DELETING_CATEGORY_FAILED';
export const DELETING_CATEGORY_SUCCESS = 'DELETING_CATEGORY_SUCCESS';

export const UPDATING_CATEGORY_SUCCESS = 'UPDATING_CATEGORY_SUCCESS';

export const SET_CATEGORY = 'SET_CATEGORY';
export const OPEN_CLOSE_CATEGORY_MODAL = 'OPEN_CLOSE_CATEGORY_MODAL';


export interface CategoriesLoading {
  type: typeof LOADING_CATEGORIES
}

export interface CategoriesLoadingFailed {
  type: typeof LOADING_CATEGORIES_FAILED
}

export interface CategoriesLoadingSuccess {
  type: typeof LOADING_CATEGORIES_SUCCESS,
  payload: Category[]
}

export interface CategorySaving {
  type: typeof SAVING_CATEGORY
}

export interface CategorySavingFailed {
  type: typeof SAVING_CATEGORY_FAILED
}

export interface CategorySavingSuccess {
  type: typeof SAVING_CATEGORY_SUCCESS,
  payload: Category
}

export interface UpdatingCategorySuccess {
  type: typeof UPDATING_CATEGORY_SUCCESS,
  payload: Category
}

export interface CategoryDeleting {
  type: typeof DELETING_CATEGORY
}

export interface CategoryDeletingFailed {
  type: typeof DELETING_CATEGORY_FAILED
}

export interface CategoryDeletingSuccess {
  type: typeof DELETING_CATEGORY_SUCCESS,
  payload: string | number
}

export interface OpenCloseCategoryModal {
  type: typeof OPEN_CLOSE_CATEGORY_MODAL,
  payload: boolean
}

export interface SetCategory {
  type: typeof SET_CATEGORY,
  payload: Category | null
}

export type CategoryDispatchTypes = 
  CategoriesLoading | 
  CategoriesLoadingFailed |
  CategoriesLoadingSuccess |
  CategorySaving |
  CategorySavingFailed |
  CategorySavingSuccess |
  UpdatingCategorySuccess |
  CategoryDeleting |
  CategoryDeletingFailed |
  CategoryDeletingSuccess |
  OpenCloseCategoryModal |
  SetCategory;