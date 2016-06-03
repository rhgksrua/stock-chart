import React from 'react';
import { connect } from 'react-redux';

import { addStockAJAX } from '../actions/actions';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            userInput: event.target.value 
        });
        console.log(event.target.value);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log('submitting');
        console.log('--user intput', this.state.userInput);
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
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return ownProps;
    
}

function mapDispatchToProps(dispatch) {
    return {
        addStock: stockSymbol => {
            dispatch(addStockAJAX(stockSymbol));
        }
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);