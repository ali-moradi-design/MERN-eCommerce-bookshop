import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import theme from './components/ui/theme';
import Container from '@material-ui/core/Container';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

const App = () => {
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue} />

        <main style={{ minHeight: '83vh' }}>
          <Container maxWidth='lg'>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <HomeScreen {...props} setValue={setValue} />
                )}
              />
              <Route
                path='/product/:id'
                render={(props) => (
                  <ProductScreen {...props} setValue={setValue} />
                )}
              />
              <Route
                path='/login'
                render={(props) => (
                  <LoginScreen {...props} setValue={setValue} />
                )}
              />
              <Route
                path='/register'
                render={(props) => (
                  <RegisterScreen {...props} setValue={setValue} />
                )}
              />
              <Route
                path='/profile'
                render={(props) => (
                  <ProfileScreen {...props} setValue={setValue} />
                )}
              />
              <Route
                path='/shipping'
                render={(props) => (
                  <ShippingScreen {...props} setValue={setValue} />
                )}
              />
              <Route
                path='/payment'
                render={(props) => (
                  <PaymentScreen {...props} setValue={setValue} />
                )}
              />
              <Route
                path='/placeorder'
                render={(props) => (
                  <PlaceOrderScreen {...props} setValue={setValue} />
                )}
              />
              <Route
                path='/cart/:id?'
                render={(props) => (
                  <CartScreen {...props} setValue={setValue} />
                )}
              />
            </Switch>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
