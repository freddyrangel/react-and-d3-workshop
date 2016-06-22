import './index.less';
import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import d3                   from 'd3';
import Letter               from '../letter';

export default class Alphabet extends Component {

  static letters = "abcdefghijklmnopqrstuvwxyz".split('');

  state = {alphabet: []}

  componentDidMount() {
    d3.interval(() => {
      const shuffledLetters = d3.shuffle(Alphabet.letters)
        .slice(0, Math.floor(Math.random() * 18))
        .sort();
      this.setState({alphabet: shuffledLetters});
    }, 1500);

  }

  render() {
    const { alphabet } = this.state;
    const letters = alphabet.map((d, i) => <Letter d={d} i={i} key={i} />)

    return <g transform="translate(30, 200)">
      <ReactTransitionGroup component="g">
        {letters}
      </ReactTransitionGroup>
    </g>
  }
}
