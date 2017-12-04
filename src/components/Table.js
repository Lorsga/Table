import React, { Component } from 'react';
import Row from './Row';
import Pagination from './Pagination';
import SelectPage from './SelectPage';
import SearchFilter from './SearchFilter';
import HeaderTable from './HeaderTable';
import { arrayFiltered, filters, orders, displayOrder } from '../utils/utils';
import './Table.css';


class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            select: [5, 10, 15, 20, 25],
            currentPage: 1,
            elementForPage: null,
            filterText: {},
            result: this.props.customer,
            propertyObject: [],
            separatorDate: "/",
            sort:{},
            property: null,
            statusRow: [],
            checkAllStatus:[]
        }

    }

    componentWillMount() {
        var statusRow = [];
        var checkAllStatus=[];
        for (let i = 0; i < this.props.customer.length; i++) {
            let row = [];
            row.Id = this.props.customer[i].id;
            row.Value = false;
            statusRow.push(row);
        }

        for (let j = 0; j < Math.ceil(this.props.customer.length / this.state.select[0]); j++) {
            checkAllStatus[j] = false;
        }
        var propertyObject = Object.keys(this.state.result[0])
            .filter((user, index) => {
                return user;
            })

        this.setState({
            checkAllStatus: checkAllStatus,
            elementForPage: this.state.select[0],
            propertyObject: propertyObject,
            statusRow: statusRow
        });
    }


    checkRow = (id, value,rowStatus) => {
        let statusRow = this.state.statusRow;
        let currentPage=this.state.currentPage-1;

       statusRow.filter((row, i) => row.Id === id?
        statusRow[i].Value = value:false);

        const state=rowStatus.every((v,i,a)=>v.Value===true);

        this.setState(prevState=>({
            checkAllState:prevState.checkAllStatus.splice(currentPage,1,
               state)}));
        
        this.setState({ statusRow: statusRow })

    }

    checkAll = (event,rowStatus) => {
        let currentPage=this.state.currentPage;
        let value=event.target.checked;
        let checkAllStatus=this.state.checkAllStatus.slice();
        checkAllStatus[currentPage-1]=value;
        
        rowStatus.map((row,i)=> {
            return rowStatus[i].Value = event.target.checked;
        });

        this.setState({
            checkAllStatus:checkAllStatus});
    }

    handleSelectChange = (event) => {

        this.setState({
            elementForPage: event.target.value,
            currentPage: 1
        });
    }

    pageOnChange = (event, maxPages) => {
        var currentStatePage = event.target.value;
        if (currentStatePage > 0) {
            currentStatePage = currentStatePage > maxPages ? maxPages : currentStatePage;
        } else {
            currentStatePage = 1;
        }
        this.setState({
            currentPage: currentStatePage
        });
    }
    search = (event) => {
        let filterText = this.state.filterText;
        let property = event.target.id;
        let value = event.target.value;

        filterText = filters(filterText, property, value);

        this.setState({
            filterText: filterText,
            currentPage: 1
        })
    }

    onSort = (event) => {
        let sort = this.state.sort;
        let property = event.target.id;

        sort = displayOrder(property, sort, this.state.property);

        this.setState({
            sort: sort,
            property: property
        });
    }


    render() {

        const { currentPage,
            elementForPage,
            statusRow,
            filterText,
            separatorDate,
            property } = this.state;
        const defaultCustomer = this.props.customer.slice();
        let sort= this.state.sort;
        //utenti filtrati
        var customersFiltered = arrayFiltered(filterText, defaultCustomer, separatorDate);
        customersFiltered = orders(customersFiltered,property,sort[property]);

        //calcolo elementi per pagina
        const indexOfLastElement = currentPage * elementForPage;
        const indexOfFirstElement = indexOfLastElement - elementForPage;

        const currentCustomer = customersFiltered.slice(indexOfFirstElement, indexOfLastElement);
        const rowStatus = statusRow.slice(indexOfFirstElement, indexOfLastElement);

        //calcolo pagine tabella
        var pageNumbers = [];
        for (var k = 1; k <= Math.ceil(this.state.result.length / this.state.elementForPage); k++) {
            pageNumbers.push(k);
        }

        var maxPages = Math.max.apply(null, pageNumbers);
        var minPages = Math.min.apply(null, pageNumbers);

        return (
            <div>
                <table className="customers">
                    <thead>
                        <HeaderTable propertyObject={this.state.propertyObject} sort={this.state.sort}  onSort={this.onSort} />
                    </thead>
                    <tbody>
                        <SearchFilter propertyObject={this.state.propertyObject} onChange={this.search} checkAllStatus={this.state.checkAllStatus[currentPage-1]} checkAll={(event)=>this.checkAll(event,rowStatus)} />
                        {currentCustomer.map((users, id) =>
                            <Row index={users.id} key={id} checked={rowStatus[id].Value} separatorDate={this.state.separatorDate} callback={this.checkRow} rowStatus={rowStatus} {...users} />)
                        }
                    </tbody>
                </table>
                <Pagination min={minPages} max={maxPages} onChange={this.pageOnChange} currentPage={currentPage} />
                <SelectPage selectPage={this.state.select} handleSelectChange={this.handleSelectChange} />
            </div>
        );
    }
}

export default Table;