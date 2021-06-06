import React from "react";
import products from "../products";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Product from "../components/Product";

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
  return (
    <>
      <h1>Latest Products</h1>
      <Grid container spacing={3} className={classes.toolbarMargin}>
        {products.map((product, i) => (
          <Grid key={product._id} item sm={12} md={4} lg={3} xl={2}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomeScreen;
