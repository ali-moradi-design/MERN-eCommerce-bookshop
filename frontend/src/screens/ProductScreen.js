import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import Meta from '../components/ui/Meta';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: '1rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
  image: {
    width: '25rem',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('md')]: {
      width: '20rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '17rem',
    },
  },
  container: {
    marginTop: '1rem',
    marginBottom: '5rem',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  description: {
    border: `2px solid ${theme.palette.common.orange}`,
    padding: '0.5rem',
    width: '96%',
    [theme.breakpoints.down('sm')]: {
      padding: '0rem',
      width: '100%',
    },
  },
  select: {
    '&::before': {
      border: `2px solid ${theme.palette.common.orange}`,
    },
  },
}));

const ProductScreen = ({ history, match }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Button
        component={Link}
        to='/'
        variant='contained'
        className={classes.button}
      >
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Grid
            container
            direction={matchesSM ? 'column' : 'row'}
            alignItems={matchesSM ? 'center' : undefined}
            className={classes.container}
          >
            <Grid item md={4} style={{ marginTop: matchesSM ? '1rem' : 0 }}>
              <img
                src={product.image}
                alt={product.name}
                className={classes.image}
              />
            </Grid>
            <Grid
              item
              md={5}
              style={{ padding: '0 2rem', margin: matchesSM ? '1rem 0' : 0 }}
            >
              <List aria-label='secondary mailbox folders'>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant='h4'>{product.name}</Typography>
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={
                      <Grid container alignItems='center'>
                        <Grid item>
                          <Rating
                            name='simple-controlled'
                            value={product.rating}
                            precision={0.5}
                            readOnly
                          />
                        </Grid>
                        <Grid item style={{ marginLeft: '1rem' }}>
                          {product.numReviews} reviews
                        </Grid>
                      </Grid>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Price: $${product.price}`} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Description: ${product.description}`}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              md={3}
              style={{ marginTop: '1rem', padding: matchesMD ? '0 2rem' : 0 }}
            >
              <Card>
                <List>
                  <ListItem>
                    <Grid container justify='space-between'>
                      <Grid item>Price:</Grid>
                      <Grid item>${product.price}</Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container justify='space-between'>
                      <Grid item>status:</Grid>
                      <Grid item>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Grid>
                    </Grid>
                  </ListItem>
                  {product.countInStock > 0 && (
                    <ListItem>
                      <Grid container justify='space-between'>
                        <Grid item>
                          <Select
                            labelId='qty'
                            id='qty'
                            style={{
                              width: matchesSM
                                ? '20rem'
                                : matchesMD
                                ? 180
                                : '13.8em',
                            }}
                            displayEmpty
                            renderValue={qty > 0 ? undefined : () => 'Quantity'}
                            value={qty}
                            onChange={(event) => setQty(event.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (option) => (
                                <MenuItem key={option + 1} value={option + 1}>
                                  {option + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </Grid>
                      </Grid>
                    </ListItem>
                  )}
                  <ListItem>
                    <Button
                      onClick={addToCartHandler}
                      variant='contained'
                      color='primary'
                      fullWidth
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={5}>
              <Typography variant='h2'>Reviews</Typography>

              {product.reviews.length === 0 && (
                <Alert
                  variant='outlined'
                  severity='info'
                  style={{ margin: '1rem 0' }}
                >
                  No Reviews
                </Alert>
              )}
              <List>
                {product.reviews.map((review) => (
                  <React.Fragment key={review._id}>
                    <ListItem disableGutters>
                      <Grid
                        container
                        alignItems='center'
                        justify='space-between'
                      >
                        <Grid item>
                          <Typography variant='h4'>{review.name} </Typography>
                        </Grid>
                        <Grid item>
                          <Rating
                            size='small'
                            name='simple-controlled'
                            value={review.rating}
                            precision={0.5}
                            readOnly
                          />{' '}
                        </Grid>
                        <Grid item>
                          <Typography variant='h5'>
                            {review.createdAt.substring(0, 10)}{' '}
                          </Typography>{' '}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item>
                          <Typography variant='body2'>
                            {review.comment}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider style={{ marginTop: '1rem' }} />
                  </React.Fragment>
                ))}
                <ListItem style={{ marginTop: '1rem' }} disableGutters>
                  <Typography variant='body1'>
                    Write a Customer Review
                  </Typography>
                </ListItem>
                {successProductReview && (
                  <Alert
                    variant='outlined'
                    severity='success'
                    style={{ margin: '1rem 0' }}
                  >
                    Review submitted successfully
                  </Alert>
                )}
                {loadingProductReview && <Loader />}
                {errorProductReview && (
                  <Alert
                    variant='outlined'
                    severity='warning'
                    style={{ margin: '1rem 0' }}
                  >
                    {errorProductReview}
                  </Alert>
                )}
                {userInfo ? (
                  <ListItem disableGutters>
                    <form className={classes.form} noValidate>
                      <Select
                        labelId='rating'
                        id='rating'
                        displayEmpty
                        renderValue={rating > 0 ? undefined : () => 'Select...'}
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                      >
                        <MenuItem value='1'>1 - Poor</MenuItem>
                        <MenuItem value='2'>2 - Fair</MenuItem>
                        <MenuItem value='3'>3 - Good</MenuItem>
                        <MenuItem value='4'>4 - Very Good</MenuItem>
                        <MenuItem value='5'>5 - Excellent</MenuItem>
                      </Select>
                      <TextField
                        InputProps={{ disableUnderline: true }}
                        variant='standard'
                        margin='normal'
                        required
                        multiline
                        fullWidth
                        rows={5}
                        id='comment'
                        label='Comment'
                        name='comment'
                        className={classes.description}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        type='submit'
                        onClick={submitHandler}
                        variant='contained'
                        color='secondary'
                      >
                        Submit
                      </Button>
                    </form>
                  </ListItem>
                ) : (
                  <Alert
                    variant='outlined'
                    severity='info'
                    style={{ margin: '1rem 0' }}
                  >
                    Please{' '}
                    <Button
                      component={Link}
                      to='/login'
                      style={{ textTransform: 'none' }}
                    >
                      {' '}
                      sign in
                    </Button>
                    to write a review
                  </Alert>
                )}
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductScreen;
