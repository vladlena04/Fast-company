import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ color, name, id }) => {
    return (
        <span className={'badge m-1 bg-' + color} key={id}>
            {name}
        </span>
    );
};

Qualities.propTypes = {
    color: PropTypes.PropTypes.string,
    name: PropTypes.PropTypes.string,
    id: PropTypes.PropTypes.string
};

export default Qualities;