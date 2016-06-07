import React from 'react';
import { connect } from 'react-redux';

import { addStockAJAX } from '../actions/actions';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let userInput = event.target.value;
        this.setState({ userInput });
    }
    handleSubmit(event) {
        event.preventDefault();
        let userInput = this.state.userInput;
        const re = /[a-zA-Z]+/;
        if (!re.test(userInput)) {
            this.setState({
                error: `Invalid`
            });
            return;
        }
        
        
        let stockExists = this.props.stocks.some(stock => {
            return stock.dataset_code.toUpperCase() === this.state.userInput.toUpperCase();
        });
        
        if (stockExists) {
            this.setState({
                error: `${this.state.userInput} Exists!`
            });
            return;
        }
        this.setState({
            error: ''
        });
        
        this.props.addStock(this.state.userInput);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text' 
                        onChange={this.handleChange} 
                    />
                    <input type='submit' value='Add' />
                </form>
                <div className='error'>{this.state.error}</div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return Object.assign({}, ownProps, {stocks: state});
}

function mapDispatchToProps(dispatch) {
    return {
        addStock: stockSymbol => {
            dispatch(addStockAJAX(stockSymbol));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);