import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'
import CartContext from '../../Context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {cartQuantityIncrement, cartQuantityDecrement} = value
      const {data} = props
      const {imageUrl, name, cost, quantity, id} = data
      const onIncrement = () => {
        cartQuantityIncrement(id)
      }
      const onDecrement = () => {
        cartQuantityDecrement(id)
      }
      return (
        <>
          <li className="cartItemContainer">
            <div className="cartImageCon">
              <img src={imageUrl} alt={name} className="cartImage" />
              <p className="Carttitle">{name}</p>
            </div>
            <div className="CartcounterCon">
              <button
                type="button"
                className="onIncrementbnt"
                onClick={onDecrement}
              >
                -
              </button>
              <div className="quantity">{quantity}</div>
              <button
                type="button"
                className="onIncrementbnt"
                onClick={onIncrement}
              >
                +
              </button>
            </div>

            <p className="cartItemPrice"> {cost * quantity}</p>
          </li>
          <li className="mobileCartItem">
            <img src={imageUrl} alt={name} className="cartImage" />
            <div className="mobileCartText">
              <p className="Carttitle">{name}</p>
              <div className="CartcounterCon">
                <button
                  type="button"
                  className="onIncrementbnt"
                  onClick={onDecrement}
                >
                  -
                </button>
                <div className="quantity">{quantity}</div>
                <button
                  type="button"
                  className="onIncrementbnt"
                  onClick={onIncrement}
                >
                  +
                </button>
              </div>

              <p className="cartItemPrice">
                {' '}
                <BiRupee /> {cost * quantity}
              </p>
            </div>
          </li>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
