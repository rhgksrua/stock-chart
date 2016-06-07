import React from 'react';
import d3 from 'd3';
import ReactDOM from 'react-dom';

class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.renderAxis = this.renderAxis.bind(this);
        this.mousemove = this.mousemove.bind(this);
    }
    componentDidUpdate() {
    }
    componentDidMount() {
        this.renderAxis();
    }
    bisectDate() {
        return d3.bisector(function(d) { return d.date; }).left; 
    }
    mousemove(node, verticalLine, tooltip) {
        const bisectDate = d3.bisector(function(d) { 
            let pd = d3.time.format('%Y-%m-%d').parse(d.date.split('T')[0]);
            return pd; 
        }).left; 
        let xPos = d3.mouse(node)[0];
        let x0 = this.props.x.invert(xPos);
        
        // Vertical marker
        verticalLine
            .attr('x1', xPos)
            .attr('y1', 0)
            .attr('x2', xPos)
            .attr('y2', this.props.h)
            .style('fill', 'none')
            .style('display', null)
            .style('opacity', 0.5)
            .style('stroke', '#000');
        
        // get current set of points
        let orderedSet = this.props.stocks.reduce((prev, cur) => {
            let i = bisectDate(cur.parsedData, x0);
            if (i >= cur.parsedData.length || i === 0) {
                return prev;
            }
            return prev.concat({
                dataset_code: cur.dataset_code,
                // parsedata is ascending order
                // data is descending order
                value: cur.data[cur.data.length - i][1],
                color: cur.color
            });
        }, []).sort((a, b) => {
            if (a.value < b.value) return 1;
            if (a.value > b.value) return -1;
            return 0;
        });
        
        if (this.props.stocks.length <= 0) return;
        let tooltipHtml = orderedSet.reduce((prev, cur) => {
            return `
                ${prev}
                <div class='tool-tip-info'>
                    <p class='tool-tip-color' style='background-color: ${cur.color}'></p>
                    <p class='tool-tip-symbol'>${cur.dataset_code}</p>
                    <p class='tool-tip-value'>${cur.value.toFixed(2)}</p>
                </div>
            `;
        }, '');
        
        tooltip.html(tooltipHtml)
               .style('top', `${d3.event.pageY}px`)
               .style('left', `${d3.event.pageX + 20}px`);
    }
    
    renderAxis() {
        const node = ReactDOM.findDOMNode(this);
        const rect = d3.select(node);
        const tooltip = d3.select('#app').append('div')
                          .attr('class', 'tool-tip');
        
        rect.append('rect')
            .attr('width', this.props.w)
            .attr('height', this.props.h)
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .on('mousemove', () => {
                this.mousemove(node, verticalLine, tooltip);
            });
        const verticalLine = rect.append('line')
            .attr('x1', 100)
            .attr('y1', 0)
            .attr('x2', 100)
            .attr('y2', this.props.h)
            .style('fill', 'none')
            .style('display', 'none')
            .style('stroke', '#000');
            
    }
    
    render() {
        return (
            <g className='tooltips-container' transform={this.props.transform} >
            </g>
        );
    }
}

export default Tooltip;