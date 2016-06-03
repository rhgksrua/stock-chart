import React from 'react';

class Line extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log('-- line', this.props.lineData);
        //console.log('--------- createing line');
        return (
            <g transform={this.props.transform}>
                <path className='line shadow' d={this.props.lineData} strokeLinecap='round' />
            </g>
        );
    }
}

export default Line;