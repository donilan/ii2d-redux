export function increase() {
  return { type: 'INCREASE' };
}
export function decrease() {
  return { type: 'DECREASE' };
}

export function asyncIncrease() {
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch(increase());
    }, 1000);
  }
}
