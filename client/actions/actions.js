import fetch from 'isomorphic-fetch';

export const ADD_STOCK = 'ADD_STOCK';
export const REMOVE_STOCK = 'REMOVE_STOCK';
export const INITIALIZE = 'INITIALIZE';

const HOST = `${window.location.protocol}//${window.location.host}`;

export const addStock = stock => {
    
    return {
        type: ADD_STOCK,
        stock: Object.assign(stock, {parsedData: parsedData(stock.data)})
    };
};

export const addStockAJAX = stockSymbol => {
    const url = `${HOST}/api/v1/add`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        method: 'put',
        body: JSON.stringify({ stockSymbol })
    };
    return dispatch => {
        return fetch(url, options)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data);
                if (data.error) throw new Error(data.error);
                return data;
            })
            .catch(err => {
                console.warn(err);
            });
    };
};

export const fetchStock = stock => {
    return dispatch => {
        
    };
};

export const removeStock = stockSymbol => {
    return {
        type: REMOVE_STOCK,
        stockSymbol
    };
};

export const removeStockAJAX = stockSymbol => {
    const url = `${HOST}/api/v1/remove`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        method: 'delete',
        body: JSON.stringify({ stockSymbol })
    };
    return dispatch => {
        return fetch(url, options)
            .then(data => {
                return data.json();
            })
            .then(data => {
                if (data.error) throw new Error(data.error);
                //dispatch(removeStock(stockSymbol));
                return data;
            })
            .catch(err => {
                console.warn(err);
            });
    };
};

export const removeStockSocket = stockSymbol => {
    // do socket io sutff here
    console.log('-- action remove stock scoket');
    return dispatch => {
        dispatch(removeStock(stockSymbol));
    };
};

const addParsedDataInitialize = stocks => {
    return stocks.map(stock => {
        stock.parsedData = parsedData(stock.data);
        return stock;
    });
};

const parsedData = points => {
    return points.map(point => {
        const parsedPoint = point.split(',');
        return {
            date: parsedPoint[0],
            value: parseInt(parsedPoint[1], 10)
        };
    });
};

export const initialize = (stocks) => {
    //console.log('parsed data', addParsedDataInitialize(stocks));
    return {
        type: INITIALIZE,
        stocks: addParsedDataInitialize(stocks)
    };
};

export const initializeStocks = () => {
    const url = `${window.location.protocol}//${window.location.host}/api/v1/all`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        method: 'get'
    };
    return dispatch => {
        return fetch(url, options)
            .then(data => {
                return data.json();
            })
            .then(data => {
                if (data.error) throw new Error(data.error);
                dispatch(initialize(data));
                return data;
            })
            .catch(err => {
                console.warn(err);
            });
        
    };
};