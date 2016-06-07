import React from 'react';

class Stock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let style = {
            borderBottom: `3px solid ${this.props.color}`
        };
        return (
            <li className='stock' style={style}>
                <p className='stock-symbol'>
                    {this.props.stockSymbol}
                </p>
                <span className='stock-remove' onClick={this.props.removeStock.bind(this, this.props.stockSymbol)}>&#x2716;</span>
            </li>
        );
    }
}

export default Stock;