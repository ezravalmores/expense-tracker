/* eslint-disable @typescript-eslint/no-explicit-any */

import { findIndex } from 'lodash-es';

import { Category } from '../interfaces/application';
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
} from '../actions/category/ActionTypes';

interface State {
  categories: Category[];
  selectedCategory: Category | undefined | null;
  categoryModalOpen: boolean;
  isLoadingCategories: boolean;
  loadingCategoriesFailed: boolean;
  loadingCategoriesSuccess: boolean;
  isSavingCategory: boolean;
  savingCategoryFailed: boolean;
  savingCategorySuccess: boolean;
  isDeletingCategory: boolean;
  deletingCategoryFailed: boolean;
  deletingCategorySuccess: boolean;
}

const defaultState: State = {
  categories: [],
  selectedCategory: null,
  categoryModalOpen: false,
  isLoadingCategories: false,
  loadingCategoriesFailed: false,
  loadingCategoriesSuccess: false,
  isSavingCategory: false,
  savingCategoryFailed: false,
  savingCategorySuccess: false,
  isDeletingCategory: false,
  deletingCategoryFailed: false,
  deletingCategorySuccess: false
};

const categoryReducer = (state: State = defaultState, action: CategoryDispatchTypes): State => {
  let categories : Category[] = [];

  switch (action.type) {
    case LOADING_CATEGORIES:
      return {
        ...state,
        isLoadingCategories: true,
        loadingCategoriesSuccess: false
      }
    case LOADING_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingCategories: false,
        loadingCategoriesSuccess: true,
        categories: action.payload
      }
    case LOADING_CATEGORIES_FAILED:
      return {
        ...state,
        isLoadingCategories: false,
        loadingCategoriesFailed: true
      }
    case SAVING_CATEGORY:
      return {
        ...state,
        isSavingCategory: true,
        savingCategorySuccess: false
      }
    case SAVING_CATEGORY_SUCCESS:
      return {
        ...state,
        isSavingCategory: false,
        savingCategorySuccess: true,
        categories: [...state.categories, action.payload]
      }
    case SAVING_CATEGORY_FAILED:
      return {
        ...state,
        isSavingCategory: false,
        savingCategoryFailed: true
      }
    case UPDATING_CATEGORY_SUCCESS:
      // Dont mutate current state
      categories = [...state.categories];

      var index = findIndex(categories, { id: action.payload.id });

      if (index !== -1) {
        categories[index] = action.payload;
      }

      return {
        ...state,
        selectedCategory: undefined,
        savingCategorySuccess: true,
        isSavingCategory: false,
        categories: categories
      }
    case DELETING_CATEGORY:
      return {
        ...state,
        isDeletingCategory: true,
        deletingCategorySuccess: false,
        deletingCategoryFailed: false
      }
    case DELETING_CATEGORY_SUCCESS:
      categories = [...state.categories].filter((category: Category) => category.id !== action.payload);

      return {
        ...state,
        selectedCategory: null,
        isDeletingCategory: true,
        savingCategorySuccess: false,
        deletingCategorySuccess: true,
        deletingCategoryFailed: false,
        categories: categories
      }
    case DELETING_CATEGORY_FAILED:
      return {
        ...state,
        selectedCategory: null,
        isDeletingCategory: false,
        deletingCategoryFailed: true,
      }
    case SET_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      }
    case OPEN_CLOSE_CATEGORY_MODAL:
      return {
        ...state,
        savingCategoryFailed: false,
        deletingCategoryFailed: false,
        categoryModalOpen: action.payload
      }
    default:
      return state
  }
}

export default categoryReducer;