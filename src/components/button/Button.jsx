import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Button = ({ type = "button", onClick, children }) => {
  return (
    <button type={type} onClick={onClick} className="btn btn-primary">
      {children}
    </button>
  );
}

export default Button;
