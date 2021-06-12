import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Product from '../components/Product';
import { listProducts } from '../actions/productAction';
import Loader from '../components/ui/Loader';
import Paginate from '../components/ui/Paginate';
import Message from '../components/ui/Message';
import Meta from '../components/ui/Meta';
import ProductCarousel from '../components/ui/ProductCarousel';

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0.8em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0.6em',
    },
  },
}));

const HomeScreen = ({ match, history }) => {
  const classes = useStyles();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Button
          variant='contained'
          component={Link}
          to='/'
          color='inherit'
          size='small'
        >
          Go Back
        </Button>
      )}
      <Typography variant='h1'>Latest Products</Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <>
          <Grid container spacing={3} className={classes.toolbarMargin}>
            {products.map((product, i) => (
              <Grid key={product._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            history={history}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
