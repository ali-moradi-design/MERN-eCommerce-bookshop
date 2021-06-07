import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
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
    marginBottom: "1em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.6em",
    },
  },
  logo: {
    height: "8em",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    color: "#fff",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: "#ebda44",
    color: "#f4f4f4",
    borderRadius: "5px",
    zIndex: 1302,
  },
  menuItem: {
    ...theme.typography.tab,
    color: "#000",
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIcon: {
    color: "#fff",
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.red,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    padding: "0 2rem",
    opacity: 0.5,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Header(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  useEffect(() => {
    if (window.location.pathname === "/" && props.value !== 0) {
      props.setValue(0);
    } else if (window.location.pathname === "/cart" && props.value !== 1) {
      props.setValue(1);
    }
  }, [props.value]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="secondary"
      >
        <Tab label="HOME" component={Link} to="/" className={classes.tab} />
        <Tab label="CART" component={Link} to="/cart" className={classes.tab} />
      </Tabs>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => {
          props.setValue(false);
        }}
      >
        <PersonIcon />
        Sign In
      </Button>
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
            to="/"
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
            to="/cart"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              CART
            </ListItemText>
          </ListItem>
          <ListItem
            selected={props.value === 2}
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemEstimate,
            }}
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(2);
            }}
            divider
            button
            component={Link}
            to="/login"
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Sign In
            </ListItemText>
          </ListItem>
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
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Button
              component={Link}
              to="/"
              disableRipple
              onClick={() => props.setValue(0)}
              className={classes.logoContainer}
              style={{ textDecoration: "none" }}
            >
              <Grid container alignItems="center">
                <Grid
                  item
                  style={{ marginRight: "0.8rem", marginTop: "0.3rem" }}
                >
                  <MenuBookIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography variant="h6"> Book shop</Typography>
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
