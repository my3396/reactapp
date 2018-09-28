import React, { Component } from 'react';
import Input from './Input.js';
import Dropdown from './Dropdown.js';
import Radiogroup from './Radiogroup.js';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      responseData: [],
      finalOutput: [],
    };
    this.submit = this.submit.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  updateState(inp) {
    this.state=Object.assign(this.state,inp);
  }
  componentDidMount() {
    fetch("http://cors-anywhere.herokuapp.com/http://ansible-template-engine.herokuapp.com/form").then(response=>{return response.json()}).then(data=>{this.setState({responseData:data})});
  }
  submit() {
    const responseData = this.state.responseData;
    const fin_Obj = responseData.map(data=>{
      if(data.type=="email") {
        const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state[data.label]);
          return {label:data.label,value:this.state[data.label],isValid:emailValid}
      }
      if(data.type=="telephone") {
          const phoneNumValid=/^[0-9]*$/.test(this.state[data.label]);
      
          return {label:data.label,value:this.state[data.label],isValid:phoneNumValid}
      }
      if(data.isHidden==true) {
        return null;
      }
      else {
        return {label:data.label,value:this.state[data.label],isValid:true}
      }
    });

    console.log("naveen",JSON.stringify(fin_Obj));
    this.setState({finalOutput:JSON.stringify(fin_Obj)});
  }
   render() {
     const RenderComponents = this.state.responseData.map((DataEntries)=>{
       if(DataEntries.type=="email" || DataEntries.type=="telephone") {
         return (<Input label={DataEntries.label} callBack={(inpu)=>this.updateState(inpu)} />)
       }
       if(DataEntries.type=="radio") {
         return (<Radiogroup label={DataEntries.label} labelValues={DataEntries.value} callBack={(inpu)=>this.updateState(inpu)} />)
       }
       if(DataEntries.type=="select") {
         return (<Dropdown label={DataEntries.label} list={DataEntries.value} defaultValue={DataEntries.default} callBack={(inpu)=>this.updateState(inpu)} />)
       }
     });
      return(
        (<div>
           {RenderComponents}
           <button onClick={this.submit}>Submit</button>
           <br />
           <br />
           {this.state.finalOutput}
        </div>)
      );
   }
}
export default App;
