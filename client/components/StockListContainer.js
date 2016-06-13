import { connect } from 'react-redux';
import StockList from './StockList';

function mapStateToProps(state) {
    return {
        stocks: state.stocks
    };
}

export default connect(mapStateToProps)(StockList);