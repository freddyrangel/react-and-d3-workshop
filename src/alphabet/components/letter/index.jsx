import React, { Component } from 'react';
import { findDOMNode }      from 'react-dom';
import d3                   from 'd3';

export default class Letter extends Component {

  state = {
    y: -60,
    x: 0,
    className: 'enter',
    fillOpacity: 1e-6
  }

  transition = d3.transition()
    .duration(750)
    .ease(d3.easeCubic);

  componentWillEnter(callback) {
    let node = d3.select(findDOMNode(this));

    this.setState({x: this.props.i*32});

    node.transition(this.transition)
      .attr('y', 0)
      .style('fill-opacity', 1)
      .on('end', () => {
        this.setState({y: 0, fillOpacity: 1});
        callback()
      });
  }

  componentWillLeave(callback) {
    let node = d3.select(findDOMNode(this));

    this.setState({className: 'exit'});

    node.transition(this.transition)
      .attr('y', 60)
      .style('fill-opacity', 1e-6)
      .on('end', () => {
        this.setState({y: 60, fillOpacity: 1e-6});
        callback()
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.i != nextProps.i) {
      let node = d3.select(findDOMNode(this));

      this.setState({className: 'update'});

      node.transition(this.transition)
        .attr('x', nextProps.i*32)
        .on('end', () => this.setState({x: nextProps.i*32}));
    }
  }

  render() {
    const textProps = {
      dy        : ".35em",
      y         : this.state.y,
      x         : this.state.x,
      className : this.state.className,
      style     : {fillOpacity: this.state.fillOpacity}
    };
    return <text {...textProps}>{this.props.d}</text>
  }
};
