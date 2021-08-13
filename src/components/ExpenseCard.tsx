import React from 'react';
import { Card, CardContent, makeStyles, Typography, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { isNil } from 'lodash-es';

import { RootStore } from '../Store';
import { Expense } from '../interfaces/application';
import { sumNegative, sumPositive } from '../utils/amounts';

const useStyle = makeStyles({
  container: {
    display: 'flex'
  },
  trade: {
    flex: 1,
    padding: 10
  },
  income: {
    color: 'green'
  },
  expense: {
    color: 'red'
  }
})

const ExpenseCard: React.FC = () => {
  const classes = useStyle();

  const expenses = useSelector((state: RootStore) => state.expense.expenses);
  const amounts = expenses.map((expense: Expense) => {
    if (!isNil(expense.categoryId)) {
      return expense.amount
    }

    return 0;
  });
  const uncategorized = sumPositive(expenses.map((expense: Expense) => {
    if (isNil(expense.categoryId)) {
      return expense.amount
    }

    return 0;
  }));
  const income = sumPositive(amounts);
  const expense = sumNegative(amounts);

  return (
    <Box className={classes.container}>
      <Card className={classes.trade}>
        <CardContent>
          <Typography>Income</Typography>
          <Typography className={classes.income}>${income}</Typography>
        </CardContent>
      </Card>
      <Card className={classes.trade}>
        <CardContent>
          <Typography>Expense</Typography>
          <Typography className={classes.expense}>${expense}</Typography>
        </CardContent>
      </Card>
      <Card className={classes.trade}>
        <CardContent>
          <Typography>Uncategorized</Typography>
          <Typography className={classes.expense}>${uncategorized}</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ExpenseCard;