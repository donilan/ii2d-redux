import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

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
          <Button onClick={this.props.decrease}>-</Button>
          <Button onClick={this.props.increase}>+</Button>
          <Button onClick={this.props.asyncIncrease}>+(Async)</Button>
        </div>
      </div>
    );
  }
}
