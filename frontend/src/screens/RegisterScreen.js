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
import { register } from '../actions/userAction';

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

const RegisterScreen = ({ location, history }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      dispatch(register(name, email, password));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <FormContainer>
      <Typography variant='h1' align='center'>
        Sign Up
      </Typography>
      {message && <Snack error={message} />}
      {error && <Snack error={error} />}
      {loading && <Loader />}
      <form className={classes.form} noValidate>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='name'
          label='Name'
          name='name'
          autoComplete='name'
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='confirmPassword'
          label='Confirm Password'
          type='confirmPassword'
          id='confirmPassword'
          autoComplete='current-password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type='submit'
          onClick={submitHandler}
          fullWidth
          variant='contained'
          className={classes.submit}
          disabled={
            name.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
          }
        >
          Register
        </Button>
        <Grid container justify='center'>
          <Grid item>
            <Typography
              className={classes.link}
              component={Link}
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              variant='body2'
            >
              "have an account? Login"
            </Typography>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default RegisterScreen;
