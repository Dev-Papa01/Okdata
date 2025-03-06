import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useProducts } from '../context/ProductContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchProducts } = useProducts();

  const handleSearch = (event) => {
    event.preventDefault();
    searchProducts(searchTerm);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    searchProducts(value);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
