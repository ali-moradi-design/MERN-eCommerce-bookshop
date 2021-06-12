import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { listOrders } from '../actions/orderAction';

const useStyles = makeStyles((theme) => ({
  checkColor: {
    color: '#158f34',
  },
  closeColor: {
    color: '#8f1529',
  },
}));

const OrderListScreen = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Typography variant='h2' style={{ marginLeft: '1rem' }}>
        Orders
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <TableContainer component={Paper} style={{ margin: '1rem' }}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ID</TableCell>
                <TableCell align='center'>USER</TableCell>
                <TableCell align='center'>DATE</TableCell>
                <TableCell align='center'>TOTAL</TableCell>
                <TableCell align='center'>PAID</TableCell>
                <TableCell align='center'>DELIVERED</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell align='center'>{order._id}</TableCell>
                  <TableCell align='center'>
                    {order.user && order.user.name}
                  </TableCell>
                  <TableCell align='center'>
                    {order.createdAt.substring(0, 10)}
                  </TableCell>
                  <TableCell align='center'>${order.totalPrice}</TableCell>
                  <TableCell align='center'>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <CloseIcon classes={{ root: classes.closeColor }} />
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <CloseIcon classes={{ root: classes.closeColor }} />
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
    </>
  );
};

export default OrderListScreen;
