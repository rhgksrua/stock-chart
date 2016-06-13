import { combineReducers } from 'redux';
import { ADD_STOCK, REMOVE_STOCK, INITIALIZE, ERROR } from '../actions/actions';

const initialState = [];

export function stocks(state = initialState, action) {
    let newState;
    switch (action.type) {
        case INITIALIZE:
            return action.stocks;
        case ADD_STOCK:
            
            return state.concat(action.stock);
        case REMOVE_STOCK:
            newState = state.filter(stock => {
                return stock.dataset_code !== action.stockSymbol;
            });
            
            return newState;
        default:
            return state;
    }
}

export function error(state = null, action) {
    console.log('--- error', action.error);
    switch(action.type) {
        case ERROR:
            return action.error;
        default:
            return state;
    }
}
       
export default combineReducers({
    stocks,
    error
});