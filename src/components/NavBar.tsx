import React from 'react';
import { AppBar, Toolbar, Button, Typography , makeStyles} from '@material-ui/core';
import { navigate } from '@reach/router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar: React.FC = () => {
  const styles = useStyles();

  const navigateTo = (path: string) => {
    navigate(path);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={styles.title}>
          Ezra Valmores Expense Tracker
        </Typography>
        <Button color="inherit" onClick={() => navigateTo('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigateTo('/categories')}>Categories</Button>
        <Button color="inherit" onClick={() => navigateTo('/reports')}>Reports</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;