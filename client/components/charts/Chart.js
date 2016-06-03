import React from 'react';
import d3 from 'd3';
import { connect } from 'react-redux';

import Line from './Line';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width
        };
        this.getStartDateArr = this.getStartDateArr.bind(this);
        this.getEndDateArr = this.getEndDateArr.bind(this);
        this.parseDate = this.parseDate.bind(this);
    }
    parseDate(date, specifier = '%Y-%m-%dT%H:%M:%S.%LZ') {
        //console.log('inside parsdeata', date)
        return d3.time.format(specifier).parse(date);
    }
    getStartDateArr(stocks) {
        return stocks.reduce((prev, cur, i, arr) => {
            return prev.concat(this.parseDate(cur.start_date));
        }, []);
    }
    getEndDateArr(stocks) {
        return stocks.reduce((prev, cur, i, arr) => {
            return prev.concat(this.parseDate(cur.end_date));
        }, []);
    }
    render() {
        
        
        const startDates = this.getStartDateArr(this.props.stocks);
        const endDates = this.getEndDateArr(this.props.stocks);
        console.log('--- arr start date', startDates, endDates);
        console.log('--- extends', d3.extent(startDates.concat(endDates)));
        
        let stocks = this.props.stocks;
        //console.log('start chart', stocks);
        const parseDate = d3.time.format('%Y-%m-%d').parse;
        
        const margin = {top: 5, right: 50, bottom: 20, left: 50}
        const w = this.state.width - (margin.left + margin.right)
        const h = this.props.height - (margin.top + margin.bottom);
        let largest;
        
        // get oldest date
        //stocks.reduce(function(prev, current, i, arr) {
        //    return prev.length > current.length ? i : prev;
            
            
        //}, 0);
        let stock;
        if (stocks.length > 0) {
            stock = [stocks[0]];
        } else {
            stock = [];
            return (
                <div></div>
            )
        }
        
        //console.log(stock);
        
        //console.log('min max test', parseDate(stock.start_date));
        if (stocks[0]) {
            console.log('start date', parseDate(stocks[0].start_date));
        }
        //let parsed = stock.map(function(d, i) {
        //    let spl = d.split(',');
        //    if (i < 10) {
        //        //console.log(parseDate(spl[0]), spl[0], spl[1], parseInt(spl[1], 10))
        //    }
        //    //console.log('--- spl', spl);
        //    return { date: parseDate(spl[0]), val: parseInt(spl[1], 10) };
        //});
        //console.log('--parsed', parsed);
        
        //let xyMin = stocks.reduce(function(prev, cur, i, arr) {
        //    return d3.min(prev.data.concat(cur.data));
        //});
        //
        //let xyMax = stocks.reduce(function(prev, cur, i, arr) {
        //    return d3.max(prev.data.concat(cur.data));
        //});
        
        console.log('-- before min', stock)
            
        let yMin = d3.min(stock[0].parsedData, function(d) {
            return d.value - 10;
            
        });
        
        let yMax = d3.max(stock[0].parsedData, function(d) {
            return d.value + 10;
        })
        
        let x = d3.time.scale()
            .domain(d3.extent(startDates.concat(endDates), function(d) {
                return d;
            }))
            .rangeRound([0, w]);
            
        let y = d3.scale.linear()
            .domain([yMin, yMax])
            .range([h, 0]);
            
            
        let line = d3.svg.line()
            .x(function(d) {
                //console.log('--- before parsedate', x(this.parseDate(d.date, '%Y-%m-%d')));
                return x(this.parseDate(d.date, '%Y-%m-%d'));
            }.bind(this))
            .y(function(d) {
                //console.log(y(d.value));
                return y(d.value)
            })
            .interpolate('cardinal');
        
        const allLines = stocks.map((stock, i) => {
            //console.log('stock all lines', stock)
            console.log(stock.dataset_code, i);
            if (i === 0) {
                console.log('found!!!!!!!!!!!!!', stock);
                return (
                    <Line key={stock._id} transform={transform} lineData={line(stock.parsedData)} />
                );
            }
            return (
                <path key={stock._id}/>
            )
        })
            
        const transform = `translate(${margin.left}, ${margin.top})`;
        
                   // <Line transform={transform} lineData={line(parsed)} />
        return (
            <div>
                <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
                    {allLines}
                </svg>
            </div>
        );
    }
}

Chart.defaultProps = {
    width: 600,
    height: 300,
    chartId: 'line-chart'
};

function mapStateToProps(state, ownProps) {
    const stocks = state;
    return {
        stocks
    };
}

export default connect(mapStateToProps)(Chart);