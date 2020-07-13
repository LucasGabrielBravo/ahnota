import React from 'react';
import Loader from 'react-loader-spinner';
import useAuten from '../hooks/useAuten';

const Spinner: React.FC = () => {
    const { loading } = useAuten();
    return (
        (loading) ?
        <div id="spinner">
            <Loader type="Rings" color="#F99" />
        </div>
        :
        <></>
    );
}

export default Spinner;