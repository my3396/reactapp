import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.inputEmailChange = this.inputEmailChange.bind(this);
    }
    inputEmailChange(e) {
        this.setState({inputValue:e.target.value});
      }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.inputValue!=prevState.inputValue) {
          const nokia = {};
          nokia[this.props.label]=this.state.inputValue;
          this.props.callBack(nokia);
        }
    }

    render() {
        return (<div>
            {this.props.label}<br />
            <input type="text" value={this.state.inputValue} onChange={this.inputEmailChange} />
        </div>);
    }
}

export default Input;