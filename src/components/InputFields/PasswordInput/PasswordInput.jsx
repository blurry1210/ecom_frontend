import React from 'react';
import './PasswordInput.less';
const PasswordInput = ({ user, handleChange }) => {
    return (
        <div className="input-field">
            <input type="password" name="password" value={user} onChange={handleChange} placeholder="Your password" />
        </div>
    );
}

export default PasswordInput;