import React from 'react';

import StockContainer from './StockContainer';

class StockList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //console.log(this.props);
        let allStocks = this.props.stocks.map(stock => {
            return (
                <StockContainer key={stock.id} stockSymbol={stock.dataset_code} color={stock.color} />
            );
            
        });
        return (
            <div className='stocklist-container'>
                <ul>
                    {allStocks}
                </ul>
            </div>
        );
    }
}

export default StockList;