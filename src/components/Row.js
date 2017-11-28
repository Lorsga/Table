import React, { Component } from 'react';

class Row extends Component
{
    constructor(props)
    { super(props);

        this.state={
            checked:false
        }
    }
    

    checkIt=()=>{
        
        this.props.callback(this.props.index,!this.props.checked);
    }
    render()
    {

        return(
            <tr>
            <td><input type="checkbox" checked={this.props.checked} onChange={this.checkIt}/></td>
            <td>{this.props.nome}</td>
            <td>{this.props.cognome}</td>
            </tr>
        );
    }
}
export default Row;