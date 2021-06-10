import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { createProduct, listProducts } from '../actions/productAction';

const useStyles = makeStyles((theme) => ({
  checkColor: {
    color: '#158f34',
  },
  closeColor: {
    color: '#8f1529',
  },
}));

const ProductListScreen = ({ history, match }) => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      //   dispatch(deleteUser(id));
    }
  };
  const createProductHandler = () => {
    if (window.confirm('Are you sure')) {
      //   dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Grid
        container
        justify='space-around'
        alignItems='center'
        style={{ margin: '2rem 0' }}
      >
        <Grid item>
          <Typography variant='h2'>Products</Typography>
        </Grid>
        <Grid item>
          <Button
            variant='outlined'
            style={{ textTransform: 'none' }}
            onClick={createProductHandler}
          >
            <AddIcon style={{ marginRight: '0.5rem' }} /> Create Product
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <TableContainer component={Paper} style={{ margin: '1rem' }}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ID</TableCell>
                <TableCell align='center'>NAME</TableCell>
                <TableCell align='center'>PRICE</TableCell>
                <TableCell align='center'>CATEGORY</TableCell>
                <TableCell align='center'>BRAND</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell align='center'>{product._id}</TableCell>
                  <TableCell align='center'>{product.name}</TableCell>
                  <TableCell align='center'>${product.price}</TableCell>
                  <TableCell align='center'>{product.category}</TableCell>
                  <TableCell align='center'>{product.brand}</TableCell>
                  <TableCell align='center'>
                    <ButtonGroup aria-label='small outlined button group'>
                      <Button
                        variant='contained'
                        component={Link}
                        to={`/admin/product/${product._id}/edit`}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ProductListScreen;
