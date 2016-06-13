import React from 'react';
import d3 from 'd3';
import { connect } from 'react-redux';

import Line from './Line';
import Axis from './Axis';
import Tooltip from './Tooltip';

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
    parseDate(date, specifier = '%Y-%m-%d') {
        //date, specifier = '%Y-%m-%dT%H:%M:%S.%LZ'
        return d3.time.format(specifier).parse(date.split('T')[0]);
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
        
        let stocks = this.props.stocks;
        
        const startDates = this.getStartDateArr(stocks);
        const endDates = this.getEndDateArr(stocks);
        const startEndDates = startDates.concat(endDates);
        console.log('start end', startEndDates);
        
        
        const margin = {top: 5, right: 5, bottom: 40, left: 40};
        const w = this.state.width - (margin.left + margin.right);
        const h = this.props.height - (margin.top + margin.bottom);
        
        const allYMins = stocks.map(stock => {
            return d3.min(stock.parsedData, d => d.value - 10);
        });
        
        const allYMaxes = stocks.map(stock => {
            return d3.max(stock.parsedData, d =>  d.value + 10);
        });
            
        let yMin = d3.min(allYMins);
        let yMax = d3.max(allYMaxes);
        
        
        let x = d3.time.scale()
            .domain(d3.extent(startEndDates, function(d) {
                return d;
            }))
            .rangeRound([0, w]);
            
        let y = d3.scale.linear()
            .domain([yMin, yMax])
            .range([h, 0]);
            
            
        let line = d3.svg.line()
            .x(function(d) {
                let dd = x(this.parseDate(d.date, '%Y-%m-%d'));
                return dd;
            }.bind(this))
            .y(function(d) {
                let yPoint = y(d.value);
                return yPoint;
            })
            .interpolate('cardinal');
            
        const transform = `translate(${margin.left}, ${margin.top})`;
        
        const allLines = stocks.map(stock => {
            console.log(stock.dataset_code, stock.color);
            return (
                <Line key={stock.id}
                      color={stock.color}
                      transform={transform} 
                      lineData={line(stock.parsedData)}
                      stockName={stock.dataset_code}
                />
            );
        });
        
        const yAxis = d3.svg.axis()
                      .scale(y)
                      .orient('left')
                      .ticks(10);
        
        const xAxis = d3.svg.axis()
                      .scale(x)
                      .orient('bottom')
                      .ticks(5);
        
        return (
            <div className='chart-container'>
                <svg id={this.props.chartId} 
                     width={this.state.width} 
                     height={this.props.height} 
                >
                    <g transform={transform} >
                        <Axis h={h} axis={yAxis} axisType='y' />
                        <Axis h={h} axis={xAxis} axisType='x' />
                        {allLines}
                    </g>
                    <rect
                        transform={transform} 
                        height={h}
                        width={w}
                        fill='none'
                    />
                    <Tooltip
                        h={h}
                        w={w}
                        transform={transform}
                        x={x}
                        stocks={stocks}
                    />
                </svg>
            </div>
        );
    }
}

Chart.defaultProps = {
    width: 900,
    height: 500,
    chartId: 'line-chart'
};

function mapStateToProps(state, ownProps) {
    const stocks = state.stocks;
    return {
        stocks
    };
}

export default connect(mapStateToProps)(Chart);