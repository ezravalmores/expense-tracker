import React from 'react';
import { Typography, makeStyles, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { RootStore } from '../Store';
import { Expense } from '../interfaces/application';

const useStyle = makeStyles({
  balance: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 6
  }
})

const Balance: React.FC = () => {
  const classes = useStyle();
  const expenses = useSelector((state: RootStore) => state.expense.expenses);
  const amount = expenses.map((transaction: Expense) => transaction.amount);
  const total = amount.reduce((amount: any, item: any) => (amount += item), 0).toFixed(2);

  return (
    <Box>
      <Typography className={classes.balance}>Balance: ${total}</Typography>
    </Box>
  )
}

export default Balance;