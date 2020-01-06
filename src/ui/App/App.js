import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const AppComponent = function ({ children }) {
    return (
        <div className="app">
            {children}
        </div>
    );
};

AppComponent.propTypes = {
    children: PropTypes.array,
};

export default AppComponent;