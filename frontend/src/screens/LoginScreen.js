import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Loader from '../components/ui/Loader';
import Snack from '../components/ui/Snack';
import FormContainer from '../components/ui/FormContainer';
import { login } from '../actions/userAction';

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
    backgroundColor: '#000',
    color: '#fff',
  },
  link: {
    color: '#000',
    textDecoration: 'none',
  },
}));

const LoginScreen = ({ location, history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const onChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);

        break;
      case 'password':
        setPassword(event.target.value);

        break;
      default:
        break;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail('');
    setPassword('');
  };

  return (
    <FormContainer>
      <Typography variant='h1' align='center'>
        Sign In
      </Typography>
      {error && <Snack error={error} />}
      {loading && <Loader />}
      <form className={classes.form} noValidate>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          value={email}
          onChange={onChange}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={onChange}
        />
        <Button
          type='submit'
          onClick={submitHandler}
          fullWidth
          variant='contained'
          className={classes.submit}
          disabled={email.length === 0 || password.length === 0}
        >
          Sign In
        </Button>
        <Grid container justify='center'>
          <Grid item>
            <Typography
              className={classes.link}
              component={Link}
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              variant='body2'
            >
              "Don't have an account? Sign Up"
            </Typography>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default LoginScreen;
