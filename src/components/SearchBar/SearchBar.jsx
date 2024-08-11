import React, { useState } from 'react';
import './SearchBar.less'; 
import axios from 'axios';

const SearchBar = ({ setProducts }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
      
        if (newQuery.trim() === '') {
          setProducts([]); // or fetch all products
          return;
        }
      
        try {
          const response = await axios.get('http://localhost:3001/api/products/search', {
            params: { query: newQuery },
          });
          setProducts(response.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching products:', err);
          setError('Failed to fetch products. Please try again later.');
          setProducts([]);
        }
      };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search..."
                className="search-input"
            />
            <i className="search-icon fas fa-search"></i>
            {error && <p className="search-error">{error}</p>}
        </div>
    );
};

export default SearchBar;
