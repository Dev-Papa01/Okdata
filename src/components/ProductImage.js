import React from 'react';
import { Box, Typography } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';

const ProductImage = ({ product, height = 200 }) => {
  return (
    <Box
      sx={{
        height,
        bgcolor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        borderRadius: 1,
      }}
    >
      <ImageIcon sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="body2" align="center" sx={{ px: 2 }}>
        {product.name}
      </Typography>
    </Box>
  );
};

export default ProductImage;
