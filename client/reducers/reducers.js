import { ADD_STOCK, REMOVE_STOCK, INITIALIZE } from '../actions/actions';

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
       
export default stocks;