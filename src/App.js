import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, Button, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#1976d2' : '#90caf9',
    },
    secondary: {
      main: mode === 'light' ? '#dc004e' : '#f48fb1',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
});

function App() {
  const [mode, setMode] = useState('dark');
  const theme = createTheme(getDesignTokens(mode));

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    React Ecommerce
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button component={Link} to="/products" color="inherit">
                      Products
                    </Button>
                    <Button component={Link} to="/about" color="inherit">
                      About
                    </Button>
                    <Button component={Link} to="/contact" color="inherit">
                      Contact Us
                    </Button>
                    <Button component={Link} to="/cart" color="inherit">
                      Cart
                    </Button>
                    <Button component={Link} to="/orders" color="inherit">
                      Orders
                    </Button>
                    <IconButton onClick={toggleTheme} color="inherit">
                      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
              <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout-success" element={<CheckoutSuccess />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </Box>
              </Container>
            </Router>
          </ThemeProvider>
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
