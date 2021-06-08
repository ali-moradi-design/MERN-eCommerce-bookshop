import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormContainer from '../components/ui/FormContainer';
import CheckoutSteps from '../components/ui/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartAction';

const useStyles = makeStyles((theme) => ({
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    boxShadow: theme.shadows[1],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5, 1.5),
    backgroundColor: '#000',
    color: '#fff',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
  },
}));

const ShippingScreen = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps history={history} />
      <Typography variant='h1' align='center'>
        Shipping
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='address'
          label='Address'
          name='address'
          type='text'
          autoComplete='address'
          autoFocus
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='city'
          label='City'
          name='city'
          type='text'
          autoComplete='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='postalCode'
          label='PostalCode'
          type='text'
          id='postalCode'
          autoComplete='postalCode'
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='country'
          label='Country'
          type='text'
          id='country'
          autoComplete='country'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button
          type='submit'
          onClick={submitHandler}
          fullWidth
          variant='contained'
          className={classes.submit}
        >
          Continue
        </Button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
