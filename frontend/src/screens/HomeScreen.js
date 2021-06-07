import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Product from "../components/Product";
import { listProducts } from "../actions/productAction";
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
}));

const HomeScreen = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Grid container spacing={3} className={classes.toolbarMargin}>
          {products.map((product, i) => (
            <Grid key={product._id} item sm={12} md={4} lg={3} xl={2}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
