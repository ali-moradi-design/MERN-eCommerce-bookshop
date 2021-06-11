import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Loader from '../components/ui/Loader';
import Snack from '../components/ui/Snack';
import FormContainer from '../components/ui/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const useStyles = makeStyles((theme) => ({
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    boxShadow: theme.shadows[1],
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5, 1.5),
    backgroundColor: '#000',
    color: '#fff',
  },
  upload: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5, 1.5),
  },
  link: {
    color: '#000',
    textDecoration: 'none',
  },
  description: {
    border: `2px solid ${theme.palette.common.orange}`,
    marginTop: '2em',
    borderRadius: 5,
  },
}));

const ProductEditScreen = ({ match, history }) => {
  const classes = useStyles();

  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorUploadImage, setErrorUploadImage] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setErrorUploadImage(true);
      setTimeout(() => {
        setErrorUploadImage(false);
      }, 4000);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Button
        component={Link}
        to='/admin/productlist'
        variant='contained'
        className={classes.button}
      >
        Go Back
      </Button>
      <FormContainer>
        <Typography variant='h1' align='center'>
          Edit Product
        </Typography>
        {errorUploadImage && <Snack error='Invalid file' />}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Snack error={errorUpdate} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Snack error={error} />
        ) : (
          <form className={classes.form} noValidate>
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              type='number'
              id='price'
              label='Price'
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              id='image'
              label='Image URL'
              name='image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Button
              component='label'
              onChange={uploadFileHandler}
              fullWidth
              startIcon={<CloudUploadIcon />}
              variant='contained'
              color='secondary'
              className={classes.upload}
            >
              {uploading ? <CircularProgress /> : 'Upload Image'}

              <input type='file' hidden />
            </Button>
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              id='brand'
              label='Brand'
              name='brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              id='category'
              label='Category'
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              type='number'
              id='countInStock'
              label='Count In Stock'
              name='countInStock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <TextField
              InputProps={{ disableUnderline: true }}
              variant='standard'
              margin='normal'
              required
              multiline
              fullWidth
              rows={10}
              id='description'
              label='Description'
              name='description'
              className={classes.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  name='Is Admin'
                />
              }
              label='Is Admin'
            /> */}

            <Button
              type='submit'
              onClick={submitHandler}
              fullWidth
              variant='contained'
              className={classes.submit}
            >
              Update
            </Button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
