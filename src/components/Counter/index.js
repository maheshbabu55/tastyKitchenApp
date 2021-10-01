import {Component} from 'react'

import './index.css'

class Counter extends Component {
  render() {
    const {quantity} = this.props
    return (
      <div className="counterCon">
        <button
          type="button"
          onClick={this.onDecrement}
          className="onIncrementbnt"
        >
          -
        </button>
        <div className="quantity">{quantity}</div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="onIncrementbnt"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
