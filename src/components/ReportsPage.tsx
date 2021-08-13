import { useState, useEffect } from 'react';
import { Box, makeStyles, CircularProgress, Button, ButtonGroup, Typography } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { sampleSize, isNil } from 'lodash-es';
import { Alert, AlertTitle } from '@material-ui/lab';

import { RootStore } from '../Store';
import { getCategories } from '../actions/category/actions';
import { getExpenses } from '../actions/expense/actions';
import { Category, Expense } from '../interfaces/application';
import { sumPositive } from '../utils/amounts';

const colors = ['#F44520', '#11A308', '#0E3AC4', '#D3D322', '#22B0D3', '#22D3C3', '#A8D322', '#DCAB10', '##F08080', '##FF7F50']

const useStyle = makeStyles({
  component: {
    background: '#FFF',
    padding: 30,
    width: '1000px',
  },
  notice: {
    marginTop: 20,
    marginBottom: 20
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rangeButtons: {
    marginTop: 20,
    marginBottom: 10
  }
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const buildData = (categories: Category[], expenses: Expense[]) => {
  const labels = [...categories.map((category: Category) => category.name), 'Uncategorized'];
  const completeCategories = [...categories, { name: 'Uncategorized' }]
  const backgroundColors = sampleSize(colors, categories.length + 1);

  const getAmounts = () => {
    let amounts: Array<number | string> = [];

    completeCategories.map((category: Category | Partial<Category>) => {
      const transactions = !isNil(category.id)
        ? expenses.filter((expense: Expense) => expense.categoryId === category.id)
        : expenses.filter((expense: Expense) => expense.categoryId === null);

      const transactionAmounts = transactions.map((expense: Expense) => Math.abs(expense.amount));
      amounts.push(sumPositive(transactionAmounts));
      return null;
    })

    return amounts;
  }

  return {
    labels,
    datasets: [
      {
        label: 'Total amount per category',
        data: getAmounts(),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  }
}

const ReportsPage = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [expenseRange, setExpenseRange] = useState<string>('last_30_days');
  const isLoadingExpenses = useSelector((state: RootStore) => state.expense.isLoadingExpenses);
  const isLoadingCategories = useSelector((state: RootStore) => state.expense.isLoadingExpenses);
  const loadingCategoriesFailed = useSelector((state: RootStore) => state.category.loadingCategoriesFailed);
  const loadingExpensesFailed = useSelector((state: RootStore) => state.expense.loadingExpensesFailed);
  const expenses = useSelector((state: RootStore) => state.expense.expenses);
  const categories = useSelector((state: RootStore) => state.category.categories);

  const fetchResources = () => {
    dispatch(getCategories());
    dispatch(getExpenses(expenseRange));
  }

  useEffect(fetchResources, [expenseRange, dispatch]);

  const renderLoader = () => {
    return (
      <div className={classes.loader}>
        <CircularProgress disableShrink />
      </div>
    )
  }

  const renderRangeButtons = () => {
    const active = (type: string) => expenseRange === type;
    const onClick = (type: string) => setExpenseRange(type);

    return (
      <div className={classes.rangeButtons}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button size="small" onClick={() => onClick('today')} variant={active('today') ? 'contained' : 'outlined'}>Today</Button>
          <Button size="small" onClick={() => onClick('this_month')} variant={active('this_month') ? 'contained' : 'outlined'}>This month</Button>
          <Button size="small" onClick={() => onClick('last_30_days')} variant={active('last_30_days') ? 'contained' : 'outlined'}>Last 30 Days</Button>
        </ButtonGroup>
      </div>
    )
  }

  const renderEmpty = () => {
    return (
      <div className={classes.notice}>
        <Alert severity="error">
          <AlertTitle>HEY!</AlertTitle>
          Seems there are no entries yet — <strong>You can go to home to add entries!</strong>
        </Alert>
      </div>
    )
  }

  const renderFailedLoad = () => {
    return (
      <div className={classes.notice}>
        <Alert severity="error">
          <AlertTitle>Oops!</AlertTitle>
          An error occured — <strong>Please try again.</strong>
        </Alert>
      </div>
    )
  }

  const isLoadingResources = isLoadingExpenses || isLoadingCategories;
  const isLoadingResourcesFailed = loadingCategoriesFailed || loadingExpensesFailed;

  return (
    <div>
      <Box mt={6} className={classes.component}>
        <Typography variant="h4">Reports</Typography>

        {renderRangeButtons()}
        {isLoadingResources ? (
          <>{renderLoader()}</>
        ) : (
          <>
            {isLoadingResourcesFailed && renderFailedLoad()}
            {!isLoadingResourcesFailed && expenses.length === 0 && renderEmpty()}
            {expenses.length > 0 && <Bar data={buildData(categories, expenses)} options={options} />}
          </>
        )}
      </Box>
    </div>
  );
}

export default ReportsPage;