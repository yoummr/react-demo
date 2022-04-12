import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


class EmployeeComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      numberOfDependent:0,
      totalBenefitCost:0,
      perPayCheckAfter:0
    };
  };
  onCreateEmployee = ()=>{
    let empInfo = {
      Name: this.refs.Name.value,
      NumberOfDependent: this.refs.NumberOfDependent.value,
    }
    fetch("https://localhost:44336/employee/Add",{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify(empInfo)
    })
    .then(res => res.json()).then(
      result =>{
        console.log(result);
        if(result){
          document.getElementById("divPreview").style.display = "block"; 
          this.setState(
            {
              name:result.name, 
              numberOfDependent:result.numberOfDependent,
              totalBenefitCost: result.totalBenefitCost,
              perPayCheckAfter: result.perPayCheckAfter
            });
        }
      }
    );
  }
  render(){
    return(
      <div>
        <h2>Please Enter Employee Details...</h2>
        <p>
          <label>Employee Name: <input type="text" ref="Name"></input></label>
        </p>
        <p>
          <label>Number of Dependent(s): <input type="number" ref="NumberOfDependent"></input></label>
        </p>
        <button onClick={this.onCreateEmployee}>Create</button>
        
        <div id="divPreview" className= 'hidden'>
        <p>
          <label>Name: </label>
          <b>
            {this.state.name}
          </b>
        </p>
        <p>
          <label>Number Of Dependent: </label>
          <b>
            {this.state.numberOfDependent}
          </b>
        </p>
        <p>
          <label>Total Benefit Cost: </label>
          <b>
            {this.state.totalBenefitCost}
          </b>
        </p>
        <p>
          <label>Per PayCheck After Cost: </label>
          <b>
            {this.state.perPayCheckAfter}
          </b>
        </p>
        </div>
      </div>
    );
  }
}

const element=<EmployeeComponent></EmployeeComponent>

ReactDOM.render(element,document.getElementById("root"));
