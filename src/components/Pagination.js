import React, { Component } from 'react';
import './Pagination.css';
class Pagination extends Component
{
 render (){
     const currentPage=parseInt(this.props.currentPage,10);
     return (
        <div>
        <ul className="page-numbers">
        <button value={this.props.min} onClick={this.props.onChange}>|&lt;</button>
        <button value={currentPage-1}  onClick={this.props.onChange}>&lt;</button>
        <input type="number" onChange={this.props.onChange} value={currentPage} max={this.props.max} min={this.props.min} />
        <button  className="nextPagination"  value={currentPage+1}  onClick={this.props.onChange}>&gt;</button>
        <button className="nextPagination" value={this.props.max}  onClick={this.props.onChange}>&gt;|</button>
        </ul>
        </div>
     );
 }
}

export default Pagination;