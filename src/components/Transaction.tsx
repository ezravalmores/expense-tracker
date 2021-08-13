import React from 'react';
import { ListItemText, ListItem, makeStyles, ListItemIcon, CircularProgress } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons/';
import { isNil } from 'lodash-es';

import { Expense } from '../interfaces/application';
import { useDispatch, useSelector } from 'react-redux';
import { setExpense, openExpenseModal, deleteExpense } from '../actions/expense/actions';
import { RootStore } from '../Store';

const useStyle = makeStyles({
  list: {
    display: 'flex',
    marginTop: 10,
    border: '1px solid #F6F6F6'
  },
})

interface Props {
  transaction: Expense;
}

const Transaction: React.FC<Props> = ({ transaction }) => {
  const dispatch = useDispatch();
  const sign = transaction.amount >= 0 ? '$' : '-$';
  const amount = sign + Math.abs(transaction.amount);
  const color = transaction.amount >= 0 ? 'Green' : 'Red';
  const classes = useStyle();

  const isDeletingExpense = useSelector((state: RootStore) => state.expense.isDeletingExpense);
  const selectedExpense = useSelector((state: RootStore) => state.expense.selectedExpense);

  const onEdit = () => {
    dispatch(setExpense(transaction));
    dispatch(openExpenseModal(true));
  }

  const onDelete = () => {
    dispatch(setExpense(transaction));
    dispatch(deleteExpense(transaction.id));
  }

  const deleting = isDeletingExpense && !isNil(selectedExpense) && selectedExpense.id === transaction.id;

  return (
    <ListItem style={{ borderLeft: `5px solid ${color}` }} className={classes.list}>
      <ListItemText primary={transaction.transactionDate} />
      <ListItemText primary={transaction.categoryName} />
      <ListItemText primary={transaction.title} />
      <ListItemText primary={amount} />
      <ListItemIcon>
        {deleting ? (
          <CircularProgress size={10} />
        ) : (
          <>
            <Edit onClick={onEdit} />
            <Delete onClick={onDelete} />
          </>
        )}
      </ListItemIcon>
    </ListItem>
  )
}

export default Transaction;