import React from 'react';
import { connect } from 'react-redux';

import { addStockAJAX, addError } from '../actions/actions';

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
        const re = /^[a-zA-Z]{2,6}$/;
        if (!re.test(userInput)) {
            this.setState({
                error: `Invalid Input`
            });
            this.props.updateError('');
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
            <div className='search-container'>
                <form className='search-form' onSubmit={this.handleSubmit}>
                    <input
                        className='search-input'
                        type='text' 
                        onChange={this.handleChange} 
                    />
                    <input className='search-submit' type='submit' value='Add' />
                </form>
                {this.state.error &&
                    <div className='error'>{this.state.error}</div>
                }
                {this.props.error &&
                    <div className='error'>{this.props.error}</div>
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return Object.assign({}, ownProps, {stocks: state.stocks, error: state.error});
}

function mapDispatchToProps(dispatch) {
    return {
        addStock: stockSymbol => {
            dispatch(addStockAJAX(stockSymbol));
        },
        updateError: error => {
            dispatch(addError(''));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);