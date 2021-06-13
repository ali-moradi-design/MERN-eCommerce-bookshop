import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Loader from '../components/ui/Loader';
import Alert from '@material-ui/lab/Alert';
import { getOrderDetails, deliverOrder } from '../actions/orderAction';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

const useStyles = makeStyles((theme) => ({
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    boxShadow: theme.shadows[1],
    [theme.breakpoints.down('sm')]: {
      width: '5rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '17rem',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    padding: theme.spacing(1.5, 1.5),
    backgroundColor: '#000',
    color: '#fff',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
  },
  service: {
    fontWeight: 300,
    color: '#000',
  },
}));

const OrderScreen = ({ match, history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.ItemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert severity='error'>error</Alert>
  ) : (
    <>
      <Typography variant='h1'> Order {order._id}</Typography>
      <Grid
        container
        direction={matchesMD ? 'column' : 'row'}
        alignItems={matchesMD && 'center'}
        style={{ marginTop: theme.spacing(2) }}
      >
        <Grid item md={8} style={{ paddingRight: theme.spacing(8) }}>
          <List disablePadding>
            <ListItem>
              <Typography variant='h2'>Shipping</Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h5' component='p'>
                Name :{' '}
              </Typography>
              {order.user.name}
            </ListItem>
            <ListItem>
              <Typography variant='h5' component='p'>
                Email :
              </Typography>
              <Typography
                className={classes.link}
                variant='h5'
                component={'a'}
                href={`mailto:${order.user.email}`}
                rel='noopener noreferrer'
                target='_blank'
              >
                {order.user.email}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h5' component='p'>
                Address :{' '}
              </Typography>
              {order.shippingAddress.address} , {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode} {order.shippingAddress.country}
            </ListItem>
            {order.isDelivered ? (
              <Alert severity='success' style={{ marginBottom: '1rem' }}>
                Delivered on {order.deliveredAt}
              </Alert>
            ) : (
              <Alert severity='error' style={{ marginBottom: '1rem' }}>
                Not Delivered
              </Alert>
            )}
            <Divider />
            <ListItem>
              <Typography variant='h2' component='p'>
                Payment Method
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h5' component='p'>
                Method :
              </Typography>
              {order.paymentMethod}
            </ListItem>
            {order.isPaid ? (
              <Alert severity='success' style={{ marginBottom: '1rem' }}>
                Paid on {order.paidAt}
              </Alert>
            ) : (
              <Alert severity='error' style={{ marginBottom: '1rem' }}>
                Not Paid
              </Alert>
            )}
            <Divider />
            <ListItem>
              <Typography variant='h2' component='p'>
                Order Items
              </Typography>
            </ListItem>
            {order.orderItems.length === 0 ? (
              <Alert severity='error'>Order is empty </Alert>
            ) : (
              <>
                {order.orderItems.map((item, i) => (
                  <ListItem key={i} divider>
                    <Grid container alignItems='center'>
                      <Grid item sm={2}>
                        <img
                          className={classes.smallImage}
                          src={item.image}
                          alt={item.name}
                        />
                      </Grid>
                      <Grid
                        item
                        sm
                        style={{ padding: theme.spacing(0, 1) }}
                        align='center'
                      >
                        <Button
                          component={Link}
                          to={`./product/${item.product}`}
                        >
                          {item.name}
                        </Button>
                      </Grid>
                      <Grid
                        item
                        sm={4}
                        style={{ padding: theme.spacing(0, 1) }}
                      >
                        {item.qty} x ${item.price} = $
                        {(item.qty * item.price).toFixed(2)}
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </>
            )}
          </List>
        </Grid>
        <Grid item md={4} style={{ padding: matchesMD ? '2rem 1rem' : 0 }}>
          <Card>
            <List>
              <ListItem>
                <Typography variant='h2'>Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container justify='space-between'>
                  <Grid item sm>
                    Items
                  </Grid>
                  <Grid item sm>
                    ${order.ItemsPrice}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify='space-between'>
                  <Grid item sm>
                    Shipping
                  </Grid>
                  <Grid item sm>
                    ${order.shippingPrice}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify='space-between'>
                  <Grid item sm>
                    Tax
                  </Grid>
                  <Grid item sm>
                    ${order.taxPrice}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify='space-between'>
                  <Grid item sm>
                    Total
                  </Grid>
                  <Grid item sm>
                    ${order.totalPrice}
                  </Grid>
                </Grid>
              </ListItem>
              {!order.isPaid && (
                <ListItem style={{ marginTop: '3rem' }}>
                  <Button
                    disabled
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Pay
                  </Button>
                </ListItem>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListItem>
                  <Button
                    onClick={deliverHandler}
                    variant='contained'
                    color='secondary'
                    fullWidth
                  >
                    Mark As Delivered
                  </Button>
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderScreen;
