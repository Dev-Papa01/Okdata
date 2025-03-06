import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useOrders } from '../context/OrderContext';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getOrder } = useOrders();
  const orderId = location.state?.orderId;
  const order = orderId ? getOrder(orderId) : null;

  if (!order) {
    navigate('/');
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircleIcon
            color="success"
            sx={{ fontSize: 64, mb: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            Order Confirmed!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Thank you for your purchase. Your order has been successfully placed.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Order ID: {order.id}
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/orders')}
            >
              View Orders
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CheckoutSuccess;
