import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box, Rating, CardMedia } from '@mui/material';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
 
const ProductCard = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height={200}
        image={product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        sx={{ 
          objectFit: 'cover',
          bgcolor: 'grey.100',
          display: imageError ? 'none' : 'block'
        }}
      />
      {imageError && (
        <Box
          sx={{
            height: 200,
            bgcolor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">
            {product.name}
          </Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.rating})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const { products, categories, selectedCategory, setSelectedCategory } = useProducts();
  const { addToCart } = useCart();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>      
      <Box sx={{ mb: 4, display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory(category)}
            sx={{ minWidth: 'fit-content' }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard 
              product={product} 
              onAddToCart={addToCart}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
