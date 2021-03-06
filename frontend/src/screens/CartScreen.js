import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Message from '../components/ui/Message';
import { addToCart, removeFromCart } from '../actions/cartAction';

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
      width: '10rem',
    },
  },
}));

const CartScreen = ({ match, location, history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Grid
      container
      direction={matchesSM ? 'column' : 'row'}
      alignItems={matchesSM ? undefined : 'center'}
    >
      <Grid item md={8}>
        <Typography variant='h1'>Shopping Cart</Typography>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty{' '}
            <Button color='inherit' size='small'>
              Go Back
            </Button>{' '}
          </Message>
        ) : (
          <List>
            {cartItems.map((item) => (
              <div key={item.product}>
                <ListItem>
                  <Grid
                    container
                    direction={matchesXS ? 'column' : 'row'}
                    justify={matchesXS ? 'center' : 'space-between'}
                    alignItems={matchesSM ? 'center' : 'center'}
                  >
                    <Grid item md={2}>
                      <img
                        className={classes.smallImage}
                        src={item.image}
                        alt={item.name}
                      />
                    </Grid>
                    <Grid
                      item
                      md={3}
                      align='center'
                      style={{ margin: matchesXS ? '1rem 0' : 0 }}
                    >
                      <Button component={Link} to={`./product/${item.product}`}>
                        {item.name}
                      </Button>
                    </Grid>
                    <Grid item md={2}>
                      ${item.price}
                    </Grid>
                    <Grid
                      item
                      md={2}
                      style={{ margin: matchesXS ? '1rem 0' : 0 }}
                    >
                      <Select
                        labelId='qty'
                        id='qty'
                        style={{ width: '3em' }}
                        displayEmpty
                        renderValue={
                          item.qty > 0 ? undefined : () => 'Quantity'
                        }
                        value={item.qty}
                        onChange={(event) =>
                          dispatch(
                            addToCart(item.product, Number(event.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((option) => (
                          <MenuItem key={option + 1} value={option + 1}>
                            {option + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item md={1}>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => removeFromCartHandler(item.product)}
                        style={{ padding: '1rem', borderRadius: 5 }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </Grid>
      <Grid item md={4} style={{ marginTop: '3rem', padding: '1rem' }}>
        <Card>
          <List>
            <ListItem>
              <Typography variant='h2'>
                SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                ITEMS
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h5'>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Typography>
            </ListItem>
            <ListItem style={{ marginTop: '3rem' }}>
              <Button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                variant='contained'
                color='secondary'
                fullWidth
              >
                Proceed To Checkout
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CartScreen;
