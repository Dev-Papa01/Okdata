import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Sample product data with placeholder images
const initialProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://media.istockphoto.com/id/2158075207/photo/asian-woman-listening-to-music-with-wireless-headphones.jpg?s=1024x1024&w=is&k=20&c=nCPXO-KZ7ZwVE545esQ6P0Zw0obu2YAWfyWtEOV6o58=',
    category: 'Electronics',
    rating: 4.5,
    stock: 50
  },
  {
    id: '9',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://media.istockphoto.com/id/2158075207/photo/asian-woman-listening-to-music-with-wireless-headphones.jpg?s=1024x1024&w=is&k=20&c=nCPXO-KZ7ZwVE545esQ6P0Zw0obu2YAWfyWtEOV6o58=',
    category: 'Electronics',
    rating: 4.5,
    stock: 50
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    image: 'https://source.unsplash.com/featured/?smartwatch',
    category: 'Electronics',
    rating: 4.3,
    stock: 30
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Durable laptop backpack with multiple compartments',
    price: 49.99,
    image: 'https://source.unsplash.com/featured/?backpack',
    category: 'Accessories',
    rating: 4.7,
    stock: 100
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 79.99,
    image: 'https://source.unsplash.com/featured/?coffeemaker',
    category: 'Home',
    rating: 4.2,
    stock: 25
  },
  {
    id: '5',
    name: 'Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring',
    price: 89.99,
    image: 'https://source.unsplash.com/featured/?fitnesstracker',
    category: 'Electronics',
    rating: 4.4,
    stock: 75
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const searchProducts = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
    setFilteredProducts(filtered);
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const getProduct = (productId) => {
    return products.find(product => product.id === productId);
  };

  const value = {
    products: filteredProducts,
    allProducts: products,
    categories,
    selectedCategory,
    priceRange,
    sortBy,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    searchProducts,
    filterProducts,
    getProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
