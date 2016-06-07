import React from 'react';

class Line extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log('LINE', this.props.stockName, this.props.color);
        return (
            <path
                stroke={this.props.color}
                className='line shadow' 
                d={this.props.lineData} 
                strokeLinecap='round'
            />
        );
    }
}

export default Line;