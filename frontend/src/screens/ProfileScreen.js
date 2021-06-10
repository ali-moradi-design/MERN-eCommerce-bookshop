import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loader from '../components/ui/Loader';
import Snack from '../components/ui/Snack';
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { listMyOrders } from '../actions/orderAction';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import Message from '../components/ui/Message';

const useStyles = makeStyles((theme) => ({
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    boxShadow: theme.shadows[1],
  },
  submit: {
    marginTop: '1rem',
  },
  closeIcon: {
    color: '#8f1529',
  },
}));

const ProfileScreen = ({ match, location, history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Grid container>
      <Grid item sm={3} style={{ paddingRight: '2rem' }}>
        <Typography variant='h2' align='left'>
          User profile
        </Typography>
        {message && <Snack error={message} />}
        {success && <Snack error='Profile Updated' />}
        {error && <Snack error={error} />}
        {loading && <Loader />}
        <form className={classes.form} noValidate>
          <TextField
            variant='standard'
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
            variant='standard'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='standard'
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
            variant='standard'
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
            color='secondary'
            fullWidth
            variant='contained'
            className={classes.submit}
            disabled={name.length === 0 || email.length === 0}
          >
            Update
          </Button>
        </form>
      </Grid>
      <Grid item sm={9}>
        <Typography variant='h2' style={{ paddingLeft: '1rem' }}>
          My Orders
        </Typography>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message severity='error'>{errorOrders}</Message>
        ) : (
          <TableContainer component={Paper} style={{ margin: '1rem' }}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>ID</TableCell>
                  <TableCell align='center'>DATE</TableCell>
                  <TableCell align='center'>TOTAL</TableCell>
                  <TableCell align='center'>PAID</TableCell>
                  <TableCell align='center'>DELIVERD</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell align='center'>{order._id}</TableCell>
                    <TableCell align='center'>
                      {order.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell align='center'>{order.totalPrice}</TableCell>
                    <TableCell align='center'>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <CloseIcon classes={{ root: classes.closeIcon }} />
                      )}
                    </TableCell>
                    <TableCell align='center'>
                      {order.isDeliverd ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <CloseIcon classes={{ root: classes.closeIcon }} />
                      )}
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='contained'
                        component={Link}
                        to={`/order/${order._id}`}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
