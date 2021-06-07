import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import theme from "./components/ui/theme";
import Main from "./components/Main";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Switch>
          <main style={{ minHeight: "83vh" }}>
            <Container maxWidth="lg">
              <Route
                exact
                path="/"
                render={(props) => (
                  <HomeScreen
                    {...props}
                    setValue={setValue}
                    setSelectedIndex={setSelectedIndex}
                  />
                )}
              />
              <Route
                path="/product/:id"
                render={(props) => (
                  <ProductScreen
                    {...props}
                    setValue={setValue}
                    setSelectedIndex={setSelectedIndex}
                  />
                )}
              />
              <Route
                path="/login"
                render={(props) => (
                  <LoginScreen
                    {...props}
                    setValue={setValue}
                    setSelectedIndex={setSelectedIndex}
                  />
                )}
              />
              <Route
                path="/cart/:id?"
                render={(props) => (
                  <CartScreen
                    {...props}
                    setValue={setValue}
                    setSelectedIndex={setSelectedIndex}
                  />
                )}
              />
            </Container>
          </main>
        </Switch>
        <Footer setValue={setValue} setSelectedIndex={setSelectedIndex} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
