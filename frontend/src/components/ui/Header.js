import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchBox from './SearchBox';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../actions/userAction';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0.8em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0.6em',
    },
  },
  logo: {
    height: '8em',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    color: '#fff',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    marginLeft: '50px',
    marginRight: '25px',
  },
  menu: {
    backgroundColor: '#ebda44',
    color: '#f4f4f4',
    borderRadius: '5px',
    zIndex: 1302,
  },
  menuItem: {
    ...theme.typography.tab,
    color: '#000',
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIcon: {
    color: '#fff',
    height: '50px',
    width: '50px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.red,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    padding: '0 2rem',
    opacity: 0.5,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.gray,
    '&:hover': {
      backgroundColor: '#000',
    },
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  logout: {
    marginLeft: '2rem',
  },
}));

export default function Header(props) {
  const classes = useStyles(props);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [openDrawer, setOpenDrawer] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };
  const { value, setValue } = props;

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === '/cart' && value !== 1) {
      setValue(1);
    }
  }, [value, setValue]);

  const tabs = (
    <React.Fragment>
      <Route
        render={({ history }) => <SearchBox {...props} history={history} />}
      />
      <Tabs
        value={props.value}
        onChange={handleChange}
        indicatorColor='secondary'
      >
        <Tab label='HOME' component={Link} to='/' className={classes.tab} />
        <Tab label='CART' component={Link} to='/cart' className={classes.tab} />
      </Tabs>
      {userInfo ? (
        <ButtonGroup
          aria-label='outlined secondary button group'
          className={classes.logout}
        >
          <Button variant='contained' onClick={logoutHandler}>
            <ExitToAppIcon />
            LOGOUT
          </Button>
          <Button
            component={Link}
            to='/profile'
            variant='contained'
            className={classes.button}
          >
            <PersonIcon />
            {userInfo.name}
          </Button>
        </ButtonGroup>
      ) : (
        <Button
          component={Link}
          to='/login'
          variant='contained'
          className={classes.button}
        >
          <PersonIcon />
          Sign In
        </Button>
      )}
      {userInfo && userInfo.isAdmin && (
        <ButtonGroup
          variant='contained'
          aria-label='outlined secondary button group'
        >
          <Button component={Link} to='/admin/userlist'>
            Users
          </Button>
          <Button component={Link} to='/admin/productlist'>
            Products
          </Button>
          <Button component={Link} to='/admin/orderlist'>
            Orders
          </Button>
        </ButtonGroup>
      )}
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          <ListItem
            classes={{ selected: classes.drawerItemSelected }}
            selected={props.value === 0}
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(0);
            }}
            divider
            button
            component={Link}
            to='/'
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              HOME
            </ListItemText>
          </ListItem>
          <ListItem
            classes={{ selected: classes.drawerItemSelected }}
            selected={props.value === 1}
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(1);
            }}
            divider
            button
            component={Link}
            to='/cart'
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              CART
            </ListItemText>
          </ListItem>
          {userInfo ? (
            <>
              <ListItem
                selected={props.value === 0}
                classes={{
                  root: classes.drawerItemEstimate,
                  selected: classes.drawerItemEstimate,
                }}
                onClick={() => {
                  setOpenDrawer(false);
                  props.setValue(0);
                }}
                divider
                button
                component={Link}
                to='/profile'
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {userInfo.name}
                </ListItemText>
              </ListItem>
              <ListItem
                classes={{
                  root: classes.drawerItemEstimate,
                  selected: classes.drawerItemEstimate,
                }}
                onClick={() => {
                  setOpenDrawer(false);
                  logoutHandler();
                }}
                divider
                button
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  logout
                </ListItemText>
              </ListItem>
            </>
          ) : (
            <ListItem
              selected={props.value === 0}
              classes={{
                root: classes.drawerItemEstimate,
                selected: classes.drawerItemEstimate,
              }}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(0);
              }}
              divider
              button
              component={Link}
              to='/login'
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                Sign In
              </ListItemText>
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed' className={classes.appbar}>
          <Toolbar>
            <Button
              component={Link}
              to='/'
              disableRipple
              onClick={() => props.setValue(0)}
              className={classes.logoContainer}
              style={{ textDecoration: 'none' }}
            >
              <Grid container alignItems='center'>
                <Grid
                  item
                  style={{ marginRight: '0.8rem', marginTop: '0.3rem' }}
                >
                  <MenuBookIcon fontSize='large' />
                </Grid>
                <Grid item>
                  <Typography variant='h6'> Book shop</Typography>
                </Grid>
              </Grid>
            </Button>
            <Hidden mdDown>{tabs}</Hidden>
            <Hidden lgUp>{drawer}</Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
