import React from 'react';
import axios from 'axios';

const AxiosRequest = ({ url, data }) => {
    const sendRequest = () => {
        axios.post(url, data)
            .then(res => console.log(res))
            .catch(error => console.error(error));
    };

    return sendRequest();
}

export default AxiosRequest;
