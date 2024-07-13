import React from 'react';
import './EmailInput.less';
const EmailInput = ({ user, handleChange }) => {
    return (
        <div className="input-field">
            <input type="email" name="email" value={user} onChange={handleChange} placeholder="Your email" />
        </div>
    );
}

export default EmailInput;