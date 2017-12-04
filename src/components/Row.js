import React, { Component } from 'react';
import { formatDate, skills } from '../utils/utils';

class Row extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }
    }

    checkIt = () => {
    
        this.props.callback(this.props.index,!this.props.checked,this.props.rowStatus);

       
    }

    render() {

        const separatorDate = this.props.separatorDate;
        const skillsObject = this.props.skills;
        const date = this.props.date;

        return (
            <tr>
                <td><input type="checkbox"  checked={this.props.checked} onChange={this.checkIt} /></td>
                <td>{this.props.id}</td>
                <td>{this.props.firstname}</td>
                <td>{this.props.lastname}</td>
                <td>{this.props.country}</td>
                <td>{formatDate(separatorDate, date)}</td>
                <td>{this.props.maritalStatus != null ? this.props.maritalStatus.status : ''}</td>
                <td>{skills(skillsObject)}</td>
            </tr>
        );
    }


}
export default Row;