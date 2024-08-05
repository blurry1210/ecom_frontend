import React, { useState } from 'react';
import './SearchBar.less'; // Use CSS or ensure .less is correctly compiled
import axios from 'axios';

const SearchBar = ({ setProducts }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        try {
            let response;
            if (newQuery.trim() === '') {
                // Fetch all products if the query is empty
                response = await axios.get('http://localhost:5000/api/products');
            } else {
                // Fetch filtered products based on the query
                response = await axios.get('http://localhost:5000/api/products/search', {
                    params: { query: newQuery },
                });
            }

            setProducts(response.data);
            setError(null); // Clear error if successful
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to fetch products. Please try again later.');
            setProducts([]); // Clear products on error
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
