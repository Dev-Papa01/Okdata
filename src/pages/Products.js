import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Skeleton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { AddShoppingCart, LocalOffer } from '@mui/icons-material';
import Rating from '../components/Rating';
import axios from 'axios';

const Products = () => {
  const { addToCart } = useCart();
  const { 
    products, 
    searchTerm, 
    categories,
    selectedCategory,
    priceRange,
    filterByCategory,
    filterByPrice,
    setProducts
  } = useProducts();
  const [hoveredId, setHoveredId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.15,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95 
    }
  };

  const handlePriceChange = (event, newValue) => {
    filterByPrice(newValue);
  };

  const getImageUrl = (product) => {
    if (!product.image) {
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }
    return product.image.startsWith('http') ? product.image : `/images/products/${product.image}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      fetchMoreProducts();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchMoreProducts = async () => {
    try {
      const response = await axios.get(`/api/products?offset=${products.length}`);
      setProducts([...products, ...response.data]);
    } catch (error) {
      console.error('Error fetching more products:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {isLoading ? (
        <Grid container spacing={4}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Filters Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Left Sidebar - Categories */}
            <Grid item xs={12} md={3}>
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'grey.50'
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    fontWeight={600}
                  >
                    Categories
                  </Typography>
                </Box>
                <List disablePadding>
                  {categories.map((category) => (
                    <ListItem 
                      key={category}
                      disablePadding
                      divider
                    >
                      <ListItemButton
                        selected={selectedCategory === category}
                        onClick={() => filterByCategory(category)}
                        sx={{
                          py: 1.5,
                          '&.Mui-selected': {
                            bgcolor: 'primary.light',
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.light',
                            }
                          },
                          '&:hover': {
                            bgcolor: 'action.hover',
                          }
                        }}
                      >
                        <ListItemText 
                          primary={category}
                          primaryTypographyProps={{
                            fontSize: '0.95rem',
                            fontWeight: selectedCategory === category ? 600 : 400,
                            color: selectedCategory === category ? 'primary.main' : 'text.primary'
                          }}
                        />
                        {selectedCategory === category && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                boxShadow: '0 0 0 3px rgba(255, 87, 34, 0.2)'
                              }}
                            />
                          </motion.div>
                        )}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Main Content Area */}
            <Grid item xs={12} md={9}>
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                {/* Price Range Header */}
                <Box
                  sx={{
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'grey.50',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <LocalOffer sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    Price Range
                  </Typography>
                </Box>

                {/* Price Range Content */}
                <Box sx={{ p: 3 }}>
                  <Box sx={{ px: 2, mb: 3 }}>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      min={0}
                      max={2000}
                      step={50}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `$${value}`}
                      sx={{
                        '& .MuiSlider-rail': {
                          height: 6,
                          bgcolor: 'grey.200',
                        },
                        '& .MuiSlider-track': {
                          height: 6,
                          bgcolor: 'primary.main',
                        },
                        '& .MuiSlider-thumb': {
                          width: 20,
                          height: 20,
                          bgcolor: '#fff',
                          border: '2px solid',
                          borderColor: 'primary.main',
                          boxShadow: 'none',
                          '&:hover, &.Mui-focusVisible': {
                            boxShadow: '0 0 0 6px rgba(255, 87, 34, 0.16)',
                          },
                        },
                        '& .MuiSlider-valueLabel': {
                          bgcolor: 'primary.main',
                        }
                      }}
                    />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          textAlign: 'center',
                          borderRadius: 1,
                          borderColor: 'primary.light',
                          bgcolor: 'rgba(255, 87, 34, 0.04)'
                        }}
                      >
                        <Typography variant="caption" color="text.secondary" display="block">
                          Min Price
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600} color="primary.main">
                          ${priceRange[0]}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          textAlign: 'center',
                          borderRadius: 1,
                          borderColor: 'primary.light',
                          bgcolor: 'rgba(255, 87, 34, 0.04)'
                        }}
                      >
                        <Typography variant="caption" color="text.secondary" display="block">
                          Max Price
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600} color="primary.main">
                          ${priceRange[1]}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 4 }}
          />

          {searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ mb: 4, color: 'text.secondary' }}
              >
                {products.length === 0 
                  ? `No products found for "${searchTerm}"`
                  : `Showing results for "${searchTerm}"`}
              </Typography>
            </motion.div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <motion.div
                      variants={cardVariants}
                      onHoverStart={() => setHoveredId(product.id)}
                      onHoverEnd={() => setHoveredId(null)}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: 3,
                          boxShadow: hoveredId === product.id ? 8 : 2,
                          transition: 'box-shadow 0.3s ease-in-out'
                        }}
                      >
                        <Box sx={{ overflow: 'hidden' }}>
                          <motion.div
                            variants={imageVariants}
                            whileHover="hover"
                          >
                            <CardMedia
                              component="img"
                              height="300"
                              image={getImageUrl(product)}
                              alt={product.name}
                              sx={{ objectFit: 'cover' }}
                            />
                          </motion.div>
                        </Box>

                        <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Typography gutterBottom variant="h5" component="h2">
                              {product.name}
                            </Typography>
                            <Rating 
                              value={product.rating} 
                              reviews={product.reviews}
                            />
                            <Typography color="text.secondary" paragraph>
                              {product.description}
                            </Typography>
                            <Typography 
                              variant="h6" 
                              color="primary"
                              sx={{
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                              }}
                            >
                              ${product.price}
                            </Typography>
                          </motion.div>
                        </CardContent>

                        <CardActions>
                          <motion.div style={{ width: '100%' }}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={() => addToCart(product)}
                              startIcon={<AddShoppingCart />}
                              sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem'
                              }}
                            >
                              Add to Cart
                            </Button>
                          </motion.div>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </motion.div>
        </motion.div>
      )}
    </Container>
  );
};

export default Products;
