import { useState, useEffect } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Balance from './Balance';
import ExpenseCard from './ExpenseCard';
import Transactions from './Transactions';
import { RootStore } from '../Store';

import { useSelector } from 'react-redux';

const useStyle = makeStyles({
  component: {
    background: '#FFF',
    padding: 30,
    width: '1000px',
  },
  notice: {
    marginTop: 14,
    marginBottom: 20
  }
})

function App() {
  const classes = useStyle();
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const saveSuccess = useSelector((state: RootStore) => state.expense.savingExpenseSuccess);
  const deleteSuccess = useSelector((state: RootStore) => state.expense.deletingExpenseSuccess);

  useEffect(() => {
    if (saveSuccess || deleteSuccess) {
      setShowSuccessAlert(true);
    } else {
      setShowSuccessAlert(false);
    }
  }, [saveSuccess, deleteSuccess]);

  const renderSaveSuccessfully = () => {
    if (!saveSuccess || !showSuccessAlert) return null;

    return (
      <div className={classes.notice}>
        <Alert 
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowSuccessAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Yay!</AlertTitle>
          Successfully — <strong>saved!</strong>
        </Alert>
      </div>
    )
  }

  const renderDeletedSuccessfully = () => {
    if (!deleteSuccess || !showSuccessAlert) return null;

    return (
      <div className={classes.notice}>
        <Alert 
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowSuccessAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Yay!</AlertTitle>
          Successfully — <strong>deleted!</strong>
        </Alert>
      </div>
    )
  }

  return (
    <div>
      <Box mt={6} className={classes.component}>
        <Typography variant="h4">Manage Your Transactions</Typography>

        {renderSaveSuccessfully()}
        {renderDeletedSuccessfully()}

        <Box mb={2}>
          <Balance />
        </Box>
        <Box mb={2}>
          <ExpenseCard />
        </Box>
        <Box mb={2}>
          <Transactions />
        </Box>
      </Box>
    </div>
  );
}

export default App;