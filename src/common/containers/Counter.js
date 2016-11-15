import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increase, decrease, asyncIncrease } from '../actions/counter';

@connect(
  state => ({count: state.counter.count}),
  { increase, decrease, asyncIncrease }
)
export default class Counter extends Component {
  componentWillMount() {
    if(this.props.location.query.increase)
      this.props.asyncIncrease();
  }
  render() {
    return (
      <div className="container">
        <div>
          Counter {this.props.count}
          <button onClick={this.props.decrease}>-</button>
          <button onClick={this.props.increase}>+</button>
          <button onClick={this.props.asyncIncrease}>+(Async)</button>
        </div>
      </div>
    );
  }
}
