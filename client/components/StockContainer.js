import { connect } from 'react-redux';
import Stock from './Stock';

import { removeStockAJAX } from '../actions/actions';

function mapStateToProps(state, ownProps) {
    console.log('-- ownprops', ownProps);
    return ownProps;
}

function mapDispatchToProps(dispatch) {
    return {
        removeStock: stockSymbol => {
            dispatch(removeStockAJAX(stockSymbol));
        }
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);