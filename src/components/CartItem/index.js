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

          <p> {cost * quantity}</p>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
