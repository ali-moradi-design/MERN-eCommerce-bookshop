import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';
import { listUsers, deleteUser } from '../actions/userAction';

const useStyles = makeStyles((theme) => ({
  checkColor: {
    color: '#158f34',
  },
  closeColor: {
    color: '#8f1529',
  },
}));

const UserListScreen = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Typography variant='h2' style={{ marginLeft: '1rem' }}>
        Users
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
                <TableCell align='center'>NAME</TableCell>
                <TableCell align='center'>EMAIL</TableCell>
                <TableCell align='center'>ADMIN</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align='center'>{user._id}</TableCell>
                  <TableCell align='center'>{user.name}</TableCell>
                  <TableCell align='center'>
                    <Button
                      style={{ textTransform: 'none' }}
                      component={Link}
                      to={`mailto:${user.email}`}
                    >
                      {user.email}
                    </Button>
                  </TableCell>
                  <TableCell align='center'>
                    {user.isAdmin ? (
                      <CheckIcon classes={{ root: classes.checkColor }} />
                    ) : (
                      <CloseIcon classes={{ root: classes.closeColor }} />
                    )}
                  </TableCell>

                  <TableCell align='center'>
                    <ButtonGroup aria-label='small outlined button group'>
                      <Button
                        variant='contained'
                        component={Link}
                        to={`/admin/user/${user._id}/edit`}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </ButtonGroup>
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

export default UserListScreen;
