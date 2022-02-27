import React from "react";
import PropTypes from 'prop-types';

const Qualitie = ({ color, name, _id }) => {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
};

Qualities.propTypes = {
    color: PropTypes.PropTypes.string,
    name: PropTypes.PropTypes.string,
    id: PropTypes.PropTypes.string
};

export default Qualitie;
