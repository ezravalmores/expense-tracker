import { useEffect, useState } from 'react';
import {
  Typography,
  withStyles,
  makeStyles,
  Box,
  CircularProgress,
  Button,
  ButtonGroup,
  Paper,
  Modal
} from '@material-ui/core';
import { isNil } from 'lodash-es';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Delete, Edit } from '@material-ui/icons/';
import IconButton from '@material-ui/core/IconButton';

import { getExpenses } from '../actions/expense/actions';
import { RootStore } from '../Store';
import { Expense } from '../interfaces/application';
import { setExpense, openExpenseModal, deleteExpense } from '../actions/expense/actions';

import NewTransaction from './NewTransaction';

const useStyle = makeStyles((theme) => ({
  component: {
  },
  header: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20
  },
  title: {
    marginBottom: 6,
    fontSize: 20,
    flexGrow: 1
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  notice: {
    marginBottom: 10
  },
  rangeButtons: {
    marginTop: 10,
    marginBottom: 30,
    flexGrow: 1
  },
  table: {
    minWidth: 700,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginRight: 6
  },
  expense: {
    color: 'red'
  },
  income: {
    color: 'green'
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.hover,
  },
}))(TableRow);

const Transactions = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const [expenseRange, setExpenseRange] = useState<string>('last_30_days');

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const isLoadingExpenses = useSelector((state: RootStore) => state.expense.isLoadingExpenses);
  const loadingExpensesFailed = useSelector((state: RootStore) => state.expense.loadingExpensesFailed);
  const isDeletingExpense = useSelector((state: RootStore) => state.expense.isDeletingExpense);
  const deleteFailed = useSelector((state: RootStore) => state.expense.deletingExpenseFailed);
  const selectedExpense = useSelector((state: RootStore) => state.expense.selectedExpense);
  const deleteSuccess = useSelector((state: RootStore) => state.expense.deletingExpenseSuccess);
  const expenses = useSelector((state: RootStore) => state.expense.expenses);

  const fetchExpenses = () => {
    dispatch(getExpenses(expenseRange));
  }

  useEffect(fetchExpenses, [expenseRange, dispatch]);

  useEffect(() => {
    if (deleteSuccess) setShowConfirmationModal(false);
  }, [deleteSuccess]);

  const onEdit = (transaction: Expense) => {
    dispatch(setExpense(transaction));
    dispatch(openExpenseModal(true));
  }

  const showDeleteConfirmationModal = (expense: Expense) => {
    dispatch(setExpense(expense));
    setShowConfirmationModal(true);
  }

  const onDelete = () => {
    if (isNil(selectedExpense)) return;
    dispatch(deleteExpense(selectedExpense.id));
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

  const renderLoadingFailed = () => {
    if (!loadingExpensesFailed) return null;

    return (
      <div className={classes.notice}>
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          Oops! There's an error — <strong>Try again later!</strong>
        </Alert>
      </div>
    )
  }

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Entry Date</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense: Expense) => (
              <StyledTableRow key={expense.id}>
                <StyledTableCell component="th" scope="row">
                  {expense.transactionDate}
                </StyledTableCell>
                <StyledTableCell align="left">{expense.categoryName}</StyledTableCell>
                <StyledTableCell align="left">{expense.title}</StyledTableCell>
                <StyledTableCell align="right">
                  <span className={expense.amount < 0 ? classes.expense : classes.income}>
                    {expense.amount}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => onEdit(expense)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => showDeleteConfirmationModal(expense)} >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const renderFailedDelete = () => {
    if (!deleteFailed) return null;

    return (
      <div className={classes.notice}>
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          Oops! There's an error — <strong>Try again later!</strong>
        </Alert>
      </div>
    )
  }

  const renderDeleteConfirmModal = () => {
    return (
      <Modal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Delete Confirmation</h2>
          <p id="simple-modal-description">
            {renderFailedDelete()}

            <Box className={classes.container}>
              <Alert severity="error">
                <AlertTitle>Please Confirm.</AlertTitle>
                Are you sure you want to delete this expense? <strong>This is not reversable.</strong>
              </Alert>
            </Box>
            <Button 
              className={classes.button}
              variant="contained"
              color="primary"
              disableElevation
              disabled={isDeletingExpense}
              onClick={() => onDelete()}
            >
              Yes
            </Button>
            <Button variant="contained" color="primary" disableElevation onClick={() => setShowConfirmationModal(false)}>
              Cancel
            </Button>
          </p>
        </div>
      </Modal>
    )
  }

  const renderContent = () => {
    if (expenses.length === 0) {
      return (
        <div className={classes.notice}>
          <Alert severity="error">
            <AlertTitle>HEY!</AlertTitle>
            Seems there are no entries yet — <strong>Add them by clicking add a new transaction!</strong>
          </Alert>
        </div>
      )
    }

    return renderTable();
  }

  return (
    <Box className={classes.component}>
      <Typography className={classes.title}>
        Transactions
      </Typography>

      <div className={classes.header}>
        {renderRangeButtons()}
        <NewTransaction />
      </div>

      {!isLoadingExpenses ? (
        <>
          {loadingExpensesFailed ? (
            <>
              {renderLoadingFailed()}
            </>
          ) : (
            <>
              {renderDeleteConfirmModal()}
              {renderContent()}
            </>
          )}
        </>
      ) : (
        <div className={classes.loader}>
          <CircularProgress disableShrink />
        </div>
      )}
    </Box>
  )
}

export default Transactions;