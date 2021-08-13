import React, { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  makeStyles,
  Select,
  MenuItem,
  CircularProgress,
  Modal,
  InputLabel,
  FormControl 
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { isNil } from 'lodash-es';
import { format } from 'date-fns';

import { getCategories } from '../actions/category/actions';
import { saveExpense, openExpenseModal, setExpense, updateExpense } from '../actions/expense/actions';
import { Category, ExpensePayload } from '../interfaces/application';

import { RootStore } from '../Store';

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    marginBottom: 20
  },
  title: {
    marginBottom: 6,
    fontSize: 20,
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
  notice: {
    marginBottom: 10
  },
  button: {
    marginRight: 6
  }
}));

const NewTransaction: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyle();
  const [selectedCategory, setSelectedCategory] = useState<string | number>(' ');
  const [transactionDate, setTransactionDate] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number | string>('');

  const selectedExpense = useSelector((state: RootStore) => state.expense.selectedExpense);
  const isLoadingCategories = useSelector((state: RootStore) => state.category.isLoadingCategories);
  const loadingCategoriesFailed = useSelector((state: RootStore) => state.category.loadingCategoriesFailed);
  const isSavingExpense = useSelector((state: RootStore) => state.expense.isSavingExpense);
  const categories = useSelector((state: RootStore) => state.category.categories);
  const expenseModalOpen = useSelector((state: RootStore) => state.expense.expenseModalOpen);
  const saveFailed = useSelector((state: RootStore) => state.expense.savingExpenseFailed);
  const saveSuccess = useSelector((state: RootStore) => state.expense.savingExpenseSuccess);

  const handleFormDefaultValue = () => {
    if (isNil(selectedExpense)) return;

    setSelectedCategory(selectedExpense.categoryId);
    setTransactionDate(selectedExpense.transactionDate);
    setTitle(selectedExpense.title);
    setAmount(Math.abs(selectedExpense.amount));
  }

  const resetForm = () => {
    setSelectedCategory('');
    setTransactionDate('');
    setTitle('');
    setAmount('');
  }

  // On modal load fetch categories
  useEffect(() => {
    if (expenseModalOpen) {
      dispatch(getCategories());
    }
  }, [expenseModalOpen, dispatch]);

  // When expense is selected
  useEffect(handleFormDefaultValue, [selectedExpense]);

  // When save succeed
  useEffect(() => {
    if (saveSuccess) {
      dispatch(openExpenseModal(false));
    }
  }, [saveSuccess, dispatch])

  const onAddNewClick = () => {
    dispatch(openExpenseModal(true));
    resetForm();
    dispatch(setExpense(null));
  }

  const submit = () => {
    const category = categories.find((category: Category) => category.id === selectedCategory);

    const payload: ExpensePayload = {
      category_id: selectedCategory,
      amount: category?.entryType === 'expense' ? -amount : amount,
      title: title,
      transaction_date: transactionDate
    }

    if (!isNil(selectedExpense)) {
      dispatch(updateExpense(payload, selectedExpense.id));
    } else {
      dispatch(saveExpense(payload));
    }
  }

  const handleTransactionDateChange = (event: ChangeEvent<any>) => {
    setTransactionDate(event.target.value);
  }

  const handleCategoryChange = (event: ChangeEvent<any>) => {
    setSelectedCategory(event.target.value);
  }

  const renderFailedSave = () => {
    if (!saveFailed) return null;

    return (
      <div className={styles.notice}>
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          Oops! There's an error — <strong>Try again later!</strong>
        </Alert>
      </div>
    )
  }

  const renderCategory = () => {
    return (
      <FormControl variant="outlined">
        <InputLabel htmlFor="category-select">Category</InputLabel>
        <Select
          placeholder="Enter Category"
          label="Category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.input}
          inputProps={{
            name: 'category',
            id: 'category-select',
          }}
        >
          <MenuItem key="none" value={' '}>None</MenuItem>
          {categories.map((category: Category) => {
            return (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    )
  }

  const submitEnabled = () => {
    return (amount !== '' !== undefined && title !== '' && transactionDate !== '') || isSavingExpense;
  }

  const renderLoadingCategoriesFailed = () => {
    return (
      <div className={styles.notice}>
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          Oops! There's an error loading categories — <strong>Try again later!</strong>
        </Alert>
      </div>
    )
  }

  const renderEmtpyCategories = () => {
    if (categories.length === 0) {
      return (
        <div className={styles.notice}>
          <Alert severity="warning">
            <AlertTitle>Hey!</AlertTitle>
            Seems there are no categories yet. You can still add an entry but it will fall under uncategorized. — <strong>You can add categories by going to categories page.</strong>
          </Alert>
        </div>
      )
    }
  }

  const modalBody = () => {
    return (
      <div className={styles.paper}>
        <h2 id="simple-modal-title">{!isNil(selectedExpense) ? 'Update Transaction Entry' : 'New Transaction Entry'}</h2>
        <p id="simple-modal-description">
          <>
            {!isLoadingCategories ? (
              <>
                {loadingCategoriesFailed ? (
                  <>
                    {renderLoadingCategoriesFailed()}
                  </>
                ) : (
                  <>
                    <Box className={styles.container}>
                      {renderFailedSave()}
                      {renderEmtpyCategories()}
                      {renderCategory()}

                      <TextField
                        id="date"
                        label="Entry Date"
                        type="date"
                        defaultValue={transactionDate}
                        variant="outlined"
                        className={styles.input}
                        inputProps={{ max: format(new Date(), 'yyyy-MM-dd') }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleTransactionDateChange}
                      />
                      <TextField
                        variant="outlined"
                        className={styles.input}
                        value={title}
                        label="Enter title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <TextField type="number" variant="outlined" value={amount} label="Enter amount" onChange={(e: any) => setAmount(e.target.value)} />
                    </Box>
                    <Button className={styles.button} variant="contained" color="primary" disableElevation disabled={!submitEnabled()} onClick={submit}>
                      {isSavingExpense && <CircularProgress size={10} />}
                      {!isSavingExpense && 'Save Transaction'}
                    </Button>
                    <Button variant="contained" color="primary" disableElevation onClick={() => dispatch(openExpenseModal(false))}>
                      Cancel
                    </Button>
                  </>
                )}
              </>
            ) : (
              <div className={styles.loader}>
                <CircularProgress disableShrink />
              </div>
            )}
          </>
        </p>
      </div>
    )
  }

  return (
    <>
      <Button onClick={onAddNewClick} color="primary">Add a new transaction</Button>
      <Modal
        open={expenseModalOpen}
        onClose={() => dispatch(openExpenseModal(false))}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={styles.modal}
      >
        {modalBody()}
      </Modal>
    </>
  )
}

export default NewTransaction;