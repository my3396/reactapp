import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownvalue: this.props.defaultValue,
        }
        this.dropDownChange = this.dropDownChange.bind(this);
    }

    dropDownChange(e) {
        this.setState({dropdownvalue:e.target.value});
      }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.state.dropdownvalue!=prevState.dropdownvalue) {
          const nokia = {};
          nokia[this.props.label]=this.state.dropdownvalue;
          this.props.callBack(nokia);
        }
    }  

    render() {
        const options = this.props.list.map((value)=>{return(<option value={value}>{value}</option>)});
        return(
            <div>{this.props.label}<br />
        <select value={this.state.dropdownvalue} onChange={this.dropDownChange}>
                {options}
            </select>
            </div>)
    }
}

export default Dropdown;