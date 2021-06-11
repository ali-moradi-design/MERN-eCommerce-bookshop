import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
    height: 430,
  },
  media: {
    height: 250,
    width: '100%',
    boxShadow: theme.shadows[1],
    borderRadius: 5,
  },
  link: {
    textDecoration: 'none',
    color: '#000',
  },
  mb: {
    marginBottom: '1rem',
  },
  image: {
    height: '100%',
    width: '100%',
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid
          item
          component={Link}
          className={classes.media}
          to={`/product/${product._id}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className={classes.image}
          />
        </Grid>
      </Grid>
      <CardContent>
        <div className={classes.mb} style={{ height: 40 }}>
          <Typography
            gutterBottom
            variant='h5'
            component={Link}
            to={`/product/${product._id}`}
            className={classes.link}
          >
            {product.name}
          </Typography>
        </div>

        <Grid container alignItems='center' className={classes.mb}>
          <Grid item>
            <Rating
              name='simple-controlled'
              value={product.rating}
              precision={0.5}
              readOnly
            />
          </Grid>
          <Grid item style={{ marginLeft: '1rem' }}>
            {product.numReviews} reviews
          </Grid>
        </Grid>

        <Typography variant='h4' component='p'>
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
