import React from 'react';
import d3 from 'd3';
import ReactDOM from 'react-dom';

class Axis extends React.Component {
    constructor(props) {
        super(props);
        this.renderAxis = this.renderAxis.bind(this);
    }
    componentDidUpdate() {
        this.renderAxis();
    }
    componentDidMount() {
        this.renderAxis();
    }
    
    renderAxis() {
        const node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);
    }
    
    render() {
        let translate = `translate(0,${this.props.h})`;
        return (
            <g className='axis' transform={this.props.axisType == 'x' ? translate : ''} >
            </g>
        );
    }
}

export default Axis;