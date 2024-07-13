import React from 'react';
import './Button.less';
const Button = ({ onClick, children }) => {
    return (
      <button type="submit" onClick={onClick} className="custom-button">
        {children}
      </button>
    );
  }
  
  export default Button;
  