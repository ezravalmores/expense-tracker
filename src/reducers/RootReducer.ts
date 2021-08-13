import { combineReducers } from 'redux';
import categoryReducer from "./CategoryReducer";
import expenseReducer from "./ExpenseReducer";

const RootReducer = combineReducers({
  category: categoryReducer,
  expense: expenseReducer
})

export default RootReducer;