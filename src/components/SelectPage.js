import React, { Component } from 'react';

class SelectPage extends Component
{   
    render(){
        return(
            <select className="pagination"  onChange={this.props.handleSelectChange}>
            {this.props.selectPage.map((number,index)=> <option key={index} value={number}>{number}</option>)}
            </select>
        );
    }
}

export default SelectPage;