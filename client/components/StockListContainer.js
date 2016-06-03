import { connect } from 'react-redux';
import StockList from './StockList';

function mapStateToProps(state) {
    return {
        stocks: state
    };
}

export default connect(mapStateToProps)(StockList);