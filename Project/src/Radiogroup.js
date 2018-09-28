import React, { Component } from 'react';
import Radio from './Radio.js';

class Radiogroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue:'',
        };
        this.passUp = this.passUp.bind(this);
    }

    passUp(value) {
        this.setState({selectedValue:value});
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.selectedValue!=prevState.selectedValue) {
          const nokia = {};
          nokia[this.props.label]=this.state.selectedValue;
          this.props.callBack(nokia);
        }
    }

    render() {
        const RadioItems = this.props.labelValues.map((radio)=>{return <Radio label={radio} checked={this.state.selectedValue==radio} callBack={this.passUp} />});
        return (<div>
        {this.props.label}
        {RadioItems}
        </div>);
    }
}

export default Radiogroup;