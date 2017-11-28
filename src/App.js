import React, { Component } from 'react';
import Header from './components/Header';
import Table from './components/Table'
class App extends Component
{
  constructor(){
    super();
    this.state={
      customer:[]

    }
   
  }

  componentWillMount()
  {
    for(let i=0;i<25;i++)
    {
    this.setState(prevState=>({
      customer:prevState.customer.concat({
      id:i,
      nome:"Lorenzo"+i,
      cognome:"Sgaramella"
    })
    }));
    
   }
}
  render(){
    return(
      <div>
      <Header/>
      <Table customer={this.state.customer}/>
     </div>

    );
  }

}


export default App;