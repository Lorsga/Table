import React, { Component } from 'react';
import Row from './Row';
import Pagination from './Pagination';
import SelectPage from './SelectPage';

 class Table extends Component
 {
constructor(props)
{
    super(props);
    this.state={
        select:[5,10,15,20,25],
        maxPages:0,
        minPages:0,
        rowState:[],
        currentPage: 1,
        elementForPage:null,
        checkAllState:[],
        filter:"",
        result:[],
 
    }

}


componentWillMount()
{   
   var checkAllState=[];
   const pageNumbers = [];
   var rowState=[];
    for (var j = 0; j < Math.ceil(this.props.customer.length / this.state.select[0]); j++) {
       checkAllState[j]=false;
       pageNumbers.push(j);
      }
      for (var i = 0; i<this.props.customer.length; i++) {
        rowState[i]=false;
      }

      this.setState({checkAllState:checkAllState,
    rowState:rowState,
    maxPages:Math.max.apply(null,pageNumbers),
    minPages:Math.min.apply(null,pageNumbers),
    elementForPage:this.state.select[0],
    result:this.props.customer
    });


   
}

    checkRow=(id,value)=>
    {  
        this.setState(prevState=>({
            rowState:prevState.rowState.splice(id,1,value)}));

        var currentPage=this.state.currentPage-1;
        var splitRowState=this.splitRowState();
        const state=splitRowState[currentPage].every((v,i,a)=>v===true);
        if(this.state.checkAllState[currentPage])
        {
            this.setState(prevState=>({
                checkAllState:prevState.checkAllState.splice(currentPage,1,
                    !this.state.checkAllState[currentPage])}));
        }else
        {
            if(state)
            {
                this.setState(prevState=>({
                checkAllState:prevState.checkAllState.splice(currentPage,1,
                   true)}));
            }
        }
        var rowState=this.concatRowState(splitRowState);
        this.setState({
            rowState: rowState,
            checkAllState:this.state.checkAllState
        })
    }

    splitRowState=()=>
    {
        debugger;
        var splitState=[];
        while(this.state.rowState.length)
        {
            splitState.push(this.state.rowState.splice(0,this.state.elementForPage));
        }
        return splitState;
    }

    concatRowState=(rowState)=>
    {
        var concatState=[];
        for(var j = 0; j < rowState.length; j++)
            {
                concatState = concatState.concat(rowState[j]);
            }
        return concatState;
    }
    checkAll=(currentPage,currentCustomer)=>
    {     
        debugger;
        var checkState=!this.state.checkAllState[currentPage-1];
        this.setState(prevState=>({
            checkAllState:prevState.checkAllState.splice(currentPage-1,1,checkState)
        }))
        var rowState=this.splitRowState();
        for( var i=0; i<currentCustomer.length; i++) {
            rowState[currentPage-1][i]=checkState;  
          }
         var rowConcatState=this.concatRowState(rowState);
        this.setState({
            rowState:rowConcatState,
            checkAllState:this.state.checkAllState})
    }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id),
        });
        
      }

      handleSelectChange=(event)=>
      {
        this.setState({
            elementForPage: event.target.value,
            currentPage:1
          });
      }

      pageOnChange=(event)=>
      { 
        var currentStatePage=event.target.value;
        if(currentStatePage>0){
            currentStatePage=currentStatePage>this.state.maxPages?this.state.maxPages:currentStatePage;
        } else{
            currentStatePage=1;
        }
        this.setState({
            currentPage: currentStatePage,
          });
      }
        search=(event)=>
        {
            
            let filtering= this.props.customer.filter(
                (user)=>{
                    return user.nome.toLowerCase().indexOf(event.target.value.toLowerCase())!==-1;
                }
            );

            this.setState({
            filter:event.target.value,
            result:filtering});

        }
       
    render(){
        const {currentPage, elementForPage } = this.state;
        const indexOfLastTodo = currentPage * elementForPage;
        const indexOfFirstTodo = indexOfLastTodo - elementForPage;
         const currentCustomer = this.state.result.slice(indexOfFirstTodo, indexOfLastTodo);
        return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Check</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                    </tr>
                </thead>
            <tbody>
            <tr>
                <td><input type="checkbox" checked={this.state.checkAllState[currentPage-1]} onChange={()=>this.checkAll(currentPage,currentCustomer)}/>
                </td>
                    <td><input type="text" value={this.state.filter} onChange={this.search.bind(this)}/></td>
                    <td><input type="text"/></td>
            </tr>
                 {currentCustomer.map((users,index)=>
                 <Row index={users.id}  checked={this.state.rowState[users.id]} callback={this.checkRow} key={index} {...users}/>)
                 }
            </tbody>
            </table>
            <Pagination min={this.state.minPages} max={this.state.maxPages} onChange={this.pageOnChange} currentPage={currentPage}/>
            <SelectPage selectPage={this.state.select}  handleSelectChange={this.handleSelectChange}/>
        </div>
        );
    }
}

export default Table;