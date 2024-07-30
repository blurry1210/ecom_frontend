import React from 'react';
import TopBar from '../TopBar/TopBar';
import Navbar from '../navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = ({ setProducts }) => {
  return (
    <div className="header-container">
      <TopBar setProducts={setProducts} />
      <Navbar />
    </div>
  );
};

export default Header;
