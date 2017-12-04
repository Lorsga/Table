import React, { Component } from 'react';
import './SearchFilter.css';
class SearchFilter extends Component {

    render() {


        const searchFilter = this.props.propertyObject.map((property, index) => {
                return <td key={index}><input type="text" id={property} onChange={this.props.onChange} /></td>
            
        });
        return (
            <tr>
                <td><input type="checkbox" checked={this.props.checkAllStatus} onClick={this.props.checkAll}/></td>
                {searchFilter}
            </tr>
        );
    }

}

export default SearchFilter;