import React, { Component } from 'react';

class HeaderTable extends Component {
    render() {
        const headerTable = this.props.propertyObject.map((property, index) => {
            const displayOrder = this.props.sort[property] === undefined ? "" : this.props.sort[property] === 1 ? "↑" : "↓";
            return <th key={index} id={property} onClick={this.props.onSort}>{property.charAt(0).toUpperCase() + property.slice(1)} {displayOrder}</th>

        });
        return (
            <tr>
                <th>Check</th>
                {headerTable}
            </tr>
        );
    }
}

export default HeaderTable;