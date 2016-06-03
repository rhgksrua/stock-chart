import React from 'react';

class Stock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>
                {this.props.stockSymbol}
                <span onClick={this.props.removeStock.bind(this, this.props.stockSymbol)}>>&#x2716;</span>
            </li>
        );
    }
}

export default Stock;