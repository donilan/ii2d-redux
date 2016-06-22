import _ from 'lodash';

export default function(state={count: 0}, action) {
  let { type, payload } = action;
  switch(type) {
    case 'INCREASE':
      return _.assign({}, state, {count: state.count+1});
    case 'DECREASE':
      return _.assign({}, state, {count: state.count-1});
    default:
      return state;
  }
}
