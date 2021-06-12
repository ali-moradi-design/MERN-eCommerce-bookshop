import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Loader from './Loader';
import Snack from './Snack';
import { listTopProducts } from '../../actions/productAction';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#e0e0e05c',
    padding: '0 2rem',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
  },
  img: {
    padding: '1rem',
    borderRadius: 15,
    marginTop: '1rem',
    boxShadow: theme.shadows[2],
  },
  link: {
    padding: '1rem',
    textDecoration: 'none',
  },
}));

const ProductCarousel = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  var settings = {
    dots: true,
    accessibility: true,
    autoplay: true,
    arrows: true,
    infinite: true,
    speed: 500,
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Snack error={error} />
  ) : (
    <div className={classes.container}>
      <Slider {...settings}>
        {products.map((product, i) => (
          <Grid direction='column' container justify='center' key={product._id}>
            <Grid container item justify='center' alignItems='center'>
              <Grid item className={classes.img}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 'auto', height: 350 }}
                />
              </Grid>
            </Grid>
            <Grid
              component={Link}
              to={`/product/${product._id}`}
              className={classes.link}
            >
              <Typography variant='h4' align='center'>
                {product.name} ${product.price}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
