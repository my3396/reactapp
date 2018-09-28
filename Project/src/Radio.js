import React, { Component } from 'react';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue:'',
        };
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(e) {
      this.setState({selectedValue:e.target.value});
      this.props.callBack(e.target.value);
    }

    render() {
        return (<div>
        <input type="radio" value={this.props.label} checked={this.props.checked} onClick={this.changeValue} />
        {this.props.label}</div>)
    }
}

export default Radio;