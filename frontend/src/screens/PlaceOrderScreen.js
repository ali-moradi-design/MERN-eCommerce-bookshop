import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormContainer from '../components/ui/FormContainer';
import CheckoutSteps from '../components/ui/CheckoutSteps';
import Snack from '../components/ui/Snack';
import Message from '../components/ui/Message';
import { createOrder } from '../actions/orderAction';

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

const PlaceOrderScreen = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.ItemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.ItemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.ItemsPrice).toFixed(2)));
  cart.totalPrice = addDecimals(
    (
      Number(cart.ItemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2)
  );

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        ItemsPrice: cart.ItemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps history={history} />
      </FormContainer>
      <Grid
        container
        direction={matchesMD ? 'column' : 'row'}
        alignItems={matchesMD && 'center'}
        style={{ marginTop: theme.spacing(4) }}
      >
        <Grid item md={8} style={{ paddingRight: theme.spacing(8) }}>
          <List disablePadding>
            <ListItem>
              <Typography variant='h2'>Shipping</Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h5' component='p'>
                Address :{' '}
              </Typography>
              {cart.shippingAddress.address} , {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
            </ListItem>
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
              {cart.paymentMethod}
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant='h2' component='p'>
                Order Items
              </Typography>
            </ListItem>
            {cart.cartItems.length === 0 ? (
              <Message severity='error'>Your Cart is empty </Message>
            ) : (
              <>
                {cart.cartItems.map((item, i) => (
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
                    ${cart.ItemsPrice}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify='space-between'>
                  <Grid item sm>
                    Shipping
                  </Grid>
                  <Grid item sm>
                    ${cart.shippingPrice}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify='space-between'>
                  <Grid item sm>
                    Tax
                  </Grid>
                  <Grid item sm>
                    ${cart.taxPrice}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify='space-between'>
                  <Grid item sm>
                    Total
                  </Grid>
                  <Grid item sm>
                    ${cart.totalPrice}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>{error && <Snack error={error} />}</ListItem>
              <ListItem style={{ marginTop: '1rem' }}>
                <Button
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderScreen;
