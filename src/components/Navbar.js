import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
  Container,
  InputBase,
  alpha,
} from '@mui/material';
import { ShoppingCart, Assignment, Info, ContactSupport, Search } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { searchProducts } = useProducts();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              flexShrink: 0,
            }}
          >
            E-Commerce Store
          </Typography>

          <Box 
            sx={{ 
              position: 'relative',
              backgroundColor: alpha('#fff', 0.15),
              '&:hover': {
                backgroundColor: alpha('#fff', 0.25),
              },
              borderRadius: 1,
              px: 2,
              flex: 1,
              maxWidth: 400,
              mx: 2,
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            <InputBase
              placeholder="Search products..."
              onChange={(e) => searchProducts(e.target.value)}
              sx={{
                color: 'inherit',
                width: '100%',
                '& .MuiInputBase-input': {
                  py: 1,
                }
              }}
              startAdornment={<Search sx={{ mr: 1, opacity: 0.7 }} />}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
            <Button
              component={RouterLink}
              to="/about"
              color="inherit"
              startIcon={<Info />}
            >
              About
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              color="inherit"
              startIcon={<ContactSupport />}
            >
              Contact
            </Button>
            <Button
              component={RouterLink}
              to="/orders"
              color="inherit"
              startIcon={<Assignment />}
            >
              Orders
            </Button>
            <Button
              component={RouterLink}
              to="/cart"
              color="inherit"
              startIcon={
                <Badge badgeContent={cartItemCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              }
            >
              Cart
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
