import React from 'react';
import { Box, Typography, Rating as MuiRating } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

const Rating = ({ value, reviews, showCount = true }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <MuiRating
        value={value}
        precision={0.1}
        readOnly
        size="small"
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon fontSize="inherit" />}
      />
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}
      >
        {value.toFixed(1)}
        {showCount && (
          <span>({reviews} reviews)</span>
        )}
      </Typography>
    </Box>
  );
};

export default Rating;
