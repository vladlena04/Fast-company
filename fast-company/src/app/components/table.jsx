import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data }) => {
    return (
        <table className="table">
            {<TableHeader {...{ onSort, selectedSort, columns }}/>}
            {<TableBody {...{ columns, data } }/>}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default Table;