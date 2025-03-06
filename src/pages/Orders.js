import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  Chip,
} from '@mui/material';
import { useOrders } from '../context/OrderContext';

const OrderStatusChip = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      color={getColor()}
      size="small"
    />
  );
};

const Orders = () => {
  const { orders, cancelOrder, replaceOrder } = useOrders();

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          No orders found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/"
          sx={{ mt: 2 }}
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Order #{order.id}
                  </Typography>
                  <OrderStatusChip status={order.status} />
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Placed on: {new Date(order.date).toLocaleDateString()}
                </Typography>

                {order.items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      my: 1,
                    }}
                  >
                    <Typography variant="body1">
                      {item.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                    pt: 2,
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <Box>
                    <Typography variant="h6">
                      Total: ${order.total.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {order.status === 'pending' && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel Order
                      </Button>
                    )}
                    {order.status === 'cancelled' && (
                      <Button
                        variant="contained"
                        onClick={() => replaceOrder(order.id)}
                      >
                        Replace Order
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders;
