import React, { Component } from 'react';
import './Pagination.css';
class Pagination extends Component
{
 render (){
     const currentPage=parseInt(this.props.currentPage,10);
     return (
        <div>
        <ul className="page-numbers">
        <button value={this.props.min} onClick={(event)=>this.props.onChange(event,this.props.max)}>|&lt;</button>
        <button value={currentPage-1}  onClick={(event)=>this.props.onChange(event,this.props.max)}>&lt;</button>
        <input type="number" onChange={(event)=>this.props.onChange(event,this.props.max)} value={currentPage} max={this.props.max} min={this.props.min} />
        <button  className="nextPagination"  value={currentPage+1}  onClick={(event)=>this.props.onChange(event,this.props.max)}>&gt;</button>
        <button className="nextPagination" value={this.props.max}  onClick={(event)=>this.props.onChange(event,this.props.max)}>&gt;|</button>
        </ul>
        </div>
     );
 }
}

export default Pagination;