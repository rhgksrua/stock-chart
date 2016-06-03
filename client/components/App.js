import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { addStock, initializeStocks, removeStock } from '../actions/actions';

import StockListContainer from './StockListContainer';
import Search from './Search';
import Chart from './charts/Chart';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const url = `${window.location.protocol}//${window.location.host}`;
        const socket = io(url);
        socket.on('add stock', data => {
            //console.log(data);
            console.log('socket add stock');
            //socket.emit('add stock', {my: 'data'});
            this.props.addStock(data.stock);
        });
        socket.on('remove stock', data => {
            console.log('socket remove stock', data);
            this.props.removeStock(data.stockSymbol);
        });
        this.props.initializeStocks();
    }
    render() {
        return (
            <div>
                <h1>Stock Chart</h1>
                <Chart />
                <StockListContainer />
                <Search />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        initializeStocks: () => {
            dispatch(initializeStocks());
        },
        addStock: stock => {
            dispatch(addStock(stock));
        },
        removeStock: stockSymbol => {
            dispatch(removeStock(stockSymbol));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

