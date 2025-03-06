import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Avatar } from '@mui/material';
import { Store, LocalShipping, Security, Support } from '@mui/icons-material';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      icon: <Store fontSize="large" />,
      title: 'Wide Selection',
      description: 'We offer a vast range of high-quality products to meet all your needs.'
    },
    {
      icon: <LocalShipping fontSize="large" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping service to get your products to you on time.'
    },
    {
      icon: <Security fontSize="large" />,
      title: 'Secure Shopping',
      description: 'Your security is our priority. Shop with confidence using our secure platform.'
    },
    {
      icon: <Support fontSize="large" />,
      title: 'Customer Support',
      description: '24/7 customer service to assist you with any questions or concerns.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ color: 'primary.main', fontWeight: 'bold', mb: 6 }}
        >
          About Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" paragraph color="text.secondary">
              Welcome to E-Shop, your one-stop destination for all your shopping needs. We're dedicated to providing you with the best online shopping experience.
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Founded in 2024, E-Shop has grown from a small startup to one of the leading e-commerce platforms. Our mission is to make quality products accessible to everyone while providing exceptional customer service.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We work with trusted suppliers and brands to ensure that every product in our catalog meets our high standards for quality and value.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1522204538344-922f76ecc041?w=500&q=80"
              alt="About Us"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
        </Grid>

        <Typography
          variant="h3"
          align="center"
          sx={{ mt: 8, mb: 6, color: 'primary.main' }}
        >
          Why Choose Us
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 2
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 60,
                      height: 60,
                      mb: 2
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About;
