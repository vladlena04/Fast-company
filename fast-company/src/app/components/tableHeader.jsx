import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const ascIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
        );
    };

    const descIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg>
        );
    };

    const handleSort = (item) => {
        // console.log('handleSort', item, selectedSort);
        if (selectedSort.path === item.path) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ path: item.path, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((col) => (
                    <th
                        key={col}
                        onClick={columns[col].path ? () => handleSort(columns[col]) : undefined}
                        scope="col"
                        {...{ role: columns[col].path ? "button" : "" }}
                    >
                        <div>
                            {columns[col].name}
                            {selectedSort.path === columns[col].path ? (selectedSort.order === "asc" ? ascIcon() : descIcon()) : undefined}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;