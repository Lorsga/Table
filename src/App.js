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
    this.setState(prevState=>({
      customer:prevState.customer.concat([{
   "id":4,"firstname":"Michele","lastname":"Bianch","country":"Italy","date":1508277600000,"maritalStatus":{"id":1,"status":"Married"},"skills":[{"id":3,"skillname":"JS"},{"id":2,"skillname":"CSS3"}]},{"id":7,"firstname":"Pippo","lastname":"Baudo","country":"Italy","date":1344618800000,"maritalStatus":{"id":3,"status":"Divorced"},"skills":[{"id":1,"skillname":"HTML5"},{"id":5,"skillname":"AngularJS"}]},{"id":8,"firstname":"Pippo","lastname":"Baudo","country":"Germany","date":853524800000,"maritalStatus":{"id":4,"status":"Widowed"},"skills":[{"id":3,"skillname":"JS"},{"id":1,"skillname":"HTML5"},{"id":5,"skillname":"AngularJS"}]},{"id":9,"firstname":"Gloria","lastname":"Rizzi","country":"Italy","date":1508277600000,"maritalStatus":{"id":1,"status":"Married"},"skills":[{"id":3,"skillname":"JS"},{"id":2,"skillname":"CSS3"}]},{"id":10,"firstname":"Gloria","lastname":"Rizzi","country":"Spain","date":946681200000,"maritalStatus":{"id":1,"status":"Married"},"skills":[{"id":3,"skillname":"JS"},{"id":2,"skillname":"CSS3"}]},{"id":11,"firstname":"Marco","lastname":"Marcolino","country":null,"date":1322694000000,"maritalStatus":null,"skills":[]},{"id":12,"firstname":"Paola","lastname":"Verdi","country":"Portugal","date":1284764461000,"maritalStatus":{"id":2,"status":"Single"},"skills":[]}])
    }));
   
   
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