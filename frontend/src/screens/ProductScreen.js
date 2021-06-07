import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import { listProductDetails } from "../actions/productAction";
import Loader from "../components/ui/Loader";
import Message from "../components/ui/Message";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    marginBottom: "1em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.6em",
    },
  },
  button: {
    backgroundColor: "#ccc",
    marginBottom: "1rem",
  },
  image: {
    width: "30rem",
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("md")]: {
      width: "20rem",
    },
  },
  container: {
    marginTop: "1rem",
    marginBottom: "5rem",
  },
}));

const ProductScreen = ({ history, match }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const quantity = [...Array(product.countInStock).keys()];

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Button
        component={Link}
        to="/"
        variant="contained"
        className={classes.button}
      >
        Go Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Grid container className={classes.container}>
          <Grid item md={5}>
            <img
              src={product.image}
              alt={product.name}
              className={classes.image}
            />
          </Grid>
          <Grid item md={4} style={{ paddingRight: "2rem" }}>
            <List aria-label="secondary mailbox folders">
              <ListItem>
                <ListItemText
                  primary={<Typography variant="h4">{product.name}</Typography>}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    <Grid container alignItems="center">
                      <Grid item>
                        <Rating
                          name="simple-controlled"
                          value={product.rating}
                          precision={0.5}
                          readOnly
                        />
                      </Grid>
                      <Grid item style={{ marginLeft: "1rem" }}>
                        {product.numReviews} reviews
                      </Grid>
                    </Grid>
                  }
                  reviws
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Price: $${product.price}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Description: ${product.description}`} />
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} style={{ marginTop: "1rem" }}>
            <Card>
              <List>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>Price:</Grid>
                    <Grid item>${product.price}</Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>status:</Grid>
                    <Grid item>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Grid>
                  </Grid>
                </ListItem>
                {product.countInStock > 0 && (
                  <ListItem>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Select
                          labelId="qty"
                          id="qty"
                          style={{ width: matchesSM ? 250 : "13.8em" }}
                          displayEmpty
                          renderValue={qty > 0 ? undefined : () => "Quantity"}
                          value={qty}
                          onChange={(event) => setQty(event.target.value)}
                        >
                          {quantity.map((option) => (
                            <MenuItem key={option + 1} value={option + 1}>
                              {option + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </ListItem>
                )}
                <ListItem>
                  <Button
                    onClick={addToCartHandler}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductScreen;
