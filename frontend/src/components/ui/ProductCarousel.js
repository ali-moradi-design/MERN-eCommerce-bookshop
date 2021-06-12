import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Snack from './Snack';
import { listTopProducts } from '../../actions/productAction';
import { Carousel } from '3d-react-carousal';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  let slides = products.map((product) => (
    <div key={product._id} component={Link} to={`/product/${product.id}`}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: 'auto', height: 350 }}
      />
      <p align='center'>
        {product.name} ${product.price}
      </p>
    </div>
  ));
  return loading ? (
    <Loader />
  ) : error ? (
    <Snack error={error} />
  ) : (
    <Carousel slides={slides} autoplay={true} interval={5000} />
  );
};

export default ProductCarousel;
