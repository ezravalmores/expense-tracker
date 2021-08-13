import { useState, useEffect, ChangeEvent } from 'react';
import { Box, MenuItem, FormControl, InputLabel, Select, makeStyles, TextField, Button, CircularProgress, Typography, Paper, withStyles, Modal } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Delete, Edit } from '@material-ui/icons/';
import { isNil } from 'lodash-es';

import { RootStore } from '../Store';
import { getCategories, openCategoryModal, setCategory, updateCategory, deleteCategory, saveCategory } from '../actions/category/actions';
import { Category, CategoryPayload } from '../interfaces/application';

const useStyle = makeStyles((theme) => ({
  component: {
    background: '#FFF',
    padding: 30,
    width: '1000px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20
  },
  tableContainer: {
    marginTop: 20
  },
  notice: {
    marginTop: 2,
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
  },
  table: {
    minWidth: 700,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    marginBottom: 20
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginRight: 6
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const CategoriesPage = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [entryType, setEntryType] = useState<string>('');

  const selectedCategory = useSelector((state: RootStore) => state.category.selectedCategory);
  const isLoadingCategories = useSelector((state: RootStore) => state.category.isLoadingCategories);
  const isDeletingCategories = useSelector((state: RootStore) => state.category.isDeletingCategory);
  const deleteSuccess = useSelector((state: RootStore) => state.category.deletingCategorySuccess);
  const loadingCategoriesFailed = useSelector((state: RootStore) => state.category.loadingCategoriesFailed);
  const categories = useSelector((state: RootStore) => state.category.categories);
  const categoryModalOpen = useSelector((state: RootStore) => state.category.categoryModalOpen);
  const isSavingCategory = useSelector((state: RootStore) => state.category.isSavingCategory);
  const saveFailed = useSelector((state: RootStore) => state.category.savingCategoryFailed);
  const deleteFailed = useSelector((state: RootStore) => state.category.deletingCategoryFailed);
  const saveSuccess = useSelector((state: RootStore) => state.category.savingCategorySuccess);

  const handleFormDefaultValue = () => {
    if (isNil(selectedCategory)) return;

    setName(selectedCategory.name);
    setDescription(selectedCategory.description);
    setEntryType(selectedCategory.entryType);
  }

  const resetForm = () => {
    setName('');
    setDescription('');
    setEntryType(' ')
  }

  // When expense is selected
  useEffect(handleFormDefaultValue, [selectedCategory]);

  const fetchResources = () => {
    dispatch(getCategories());
  }

  useEffect(fetchResources, [dispatch]);

  // When save, delete succeed
  useEffect(() => {
    if (saveSuccess) dispatch(openCategoryModal(false));
    if (deleteSuccess) setShowConfirmationModal(false);
  }, [saveSuccess, deleteSuccess, dispatch])

  const onAddNewClick = () => {
    dispatch(openCategoryModal(true));
    resetForm();
    dispatch(setCategory(null));
  }

  const onEdit = (category: Category) => {
    dispatch(setCategory(category));
    dispatch(openCategoryModal(true));
  }

  const showDeleteConfirmationModal = (category: Category) => {
    dispatch(setCategory(category));
    setShowConfirmationModal(true);
  }

  const onDelete = () => {
    if (isNil(selectedCategory)) return;
    dispatch(deleteCategory(selectedCategory.id));
  }

  const submit = () => {
    const payload: CategoryPayload = {
      name,
      description,
      entry_type: entryType
    }

    if (!isNil(selectedCategory)) {
      dispatch(updateCategory(payload, selectedCategory.id));
    } else {
      dispatch(saveCategory(payload));
    }
  }

  const renderLoader = () => {
    return (
      <div className={classes.loader}>
        <CircularProgress disableShrink />
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

  const renderTable = () => {
    return (
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category: Category) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell component="th" scope="row">
                  {category.name}
                </StyledTableCell>
                <StyledTableCell align="right">{category.description}</StyledTableCell>
                <StyledTableCell align="right">
                  <Edit onClick={() => onEdit(category)} />
                  <Delete onClick={() => showDeleteConfirmationModal(category)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const renderFailedSave = () => {
    if (!saveFailed) return null;

    return (
      <div className={classes.notice}>
        <Alert severity="error">
          <AlertTitle>Error!</AlertTitle>
          Oops! There's an error — <strong>Try again later!</strong>
        </Alert>
      </div>
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

  const renderCategory = () => {
    return (
      <FormControl variant="outlined">
        <InputLabel htmlFor="entry-type-select">Entry Type</InputLabel>
        <Select
          placeholder="Enter entry type"
          label="Entry Type"
          value={entryType}
          onChange={(event: ChangeEvent<any>) => setEntryType(event.target.value)}
          className={classes.input}
          inputProps={{
            name: 'entry-type',
            id: 'entry-type-select',
          }}
        >
          <MenuItem key="none" value={'expense'}>Expense</MenuItem>
          <MenuItem key="none" value={'income'}>Income</MenuItem>
        </Select>
      </FormControl>
    )
  }

  const createModalBody = () => {
    const submitEnabled = () => {
      return (name !== '' && description !== '') || isSavingCategory;
    }

    return (
      <div className={classes.paper}>
        <h2 id="simple-modal-title">{!isNil(selectedCategory) ? 'Update Category' : 'New Category'}</h2>
        <p id="simple-modal-description">
          <Box className={classes.container}>
            {renderFailedSave()}

            {renderCategory()}

            <TextField
              id="name"
              label="Name"
              defaultValue={name}
              variant="outlined"
              className={classes.input}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              multiline
              rows={4}
              variant="outlined"
              className={classes.input}
              value={description}
              label="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Button className={classes.button} variant="contained" color="primary" disableElevation disabled={!submitEnabled()} onClick={submit}>
            {isSavingCategory && <CircularProgress size={10} />}
            {!isSavingCategory && 'Save Category'}
          </Button>
          <Button variant="contained" color="primary" disableElevation onClick={() => dispatch(openCategoryModal(false))}>
            Cancel
          </Button>
        </p>
      </div>
    )
  }

  const renderCreateModal = () => {
    return (
      <Modal
        open={categoryModalOpen}
        onClose={() => dispatch(openCategoryModal(false))}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {createModalBody()}
      </Modal>
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
                Are you sure you want to delete this category? <strong>This will also delete entries under this category.</strong>
              </Alert>
            </Box>
            <Button 
              className={classes.button}
              variant="contained"
              color="primary"
              disableElevation
              disabled={isDeletingCategories}
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

  const isLoadingResources = isLoadingCategories;
  const isLoadingResourcesFailed = loadingCategoriesFailed;

  return (
    <div>
      <Box mt={6} className={classes.component}>
        <Typography variant="h4">Categories</Typography>

        <Box mt={2}>
          <Button onClick={onAddNewClick} color="primary">Add a new category</Button>
        </Box>

        {isLoadingResources ? (
          <>{renderLoader()}</>
        ) : (
          <>
            {renderCreateModal()}
            {renderDeleteConfirmModal()}
            {isLoadingResourcesFailed && renderFailedLoad()}
            {!isLoadingResourcesFailed && categories.length === 0 && renderEmpty()}
            {categories.length > 0 && renderTable()}
          </>
        )}
      </Box>
    </div>
  );
}

export default CategoriesPage;