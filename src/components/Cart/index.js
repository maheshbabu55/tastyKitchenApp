import {Component} from 'react'
import Header from '../Header'
import CartContext from '../../Context/CartContext'
import CartListView from '../CartListView'
import EmptyCart from '../EmptyCart'
import './index.css'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartData} = value
          const showEmpty = cartData.length === 0
          return (
            <>
              <Header />
              <div className="cartContainer">
                {showEmpty ? <EmptyCart /> : <CartListView />}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
