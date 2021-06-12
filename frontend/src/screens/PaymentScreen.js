import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import FormContainer from '../components/ui/FormContainer';
import CheckoutSteps from '../components/ui/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartAction';

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
  service: {
    fontWeight: 300,
    color: '#000',
  },
}));

const PaymentScreen = ({ history }) => {
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps history={history} />
      <Typography variant='h1' align='center'>
        Payment Method
      </Typography>
      <form className={classes.form} noValidate>
        <RadioGroup
          aria-label='service'
          name='service'
          value={paymentMethod}
          onChange={(event) => {
            setPaymentMethod(event.target.value);
          }}
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value='PayPal'
            label='PayPal'
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value='Stripe'
            label='Stripe'
            control={<Radio />}
          />
        </RadioGroup>
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

export default PaymentScreen;
