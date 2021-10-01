import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {BsFillStarFill} from 'react-icons/bs'
import Counter from '../Counter'
import CartContext from '../../Context/CartContext'
import './index.css'

class FoodItem extends Component {
  state = {isCounterComponentOn: true, quantity: 1}

  renderFoodItem = () => (
    <CartContext.Consumer>
      {value => {
        const {
          cartAddItem,
          cartQuantityIncrement,
          cartQuantityDecrement,
        } = value

        const {item} = this.props
        const {imageUrl, id, name, cost, rating} = item
        const {isCounterComponentOn, quantity} = this.state
        const onClickAddBtn = () => {
          this.setState({isCounterComponentOn: false})
          cartAddItem({...item, quantity})
        }

        const onIncrement = () => {
          cartQuantityIncrement(id)
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
        }

        const onDecrement = () => {
          cartQuantityDecrement(id)

          if (quantity > 1) {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
          } else {
            this.setState({isCounterComponentOn: true})
          }
        }

        return (
          <li data-testId="foodItem" className="foodItemList">
            <img src={imageUrl} alt="foodItem" className="foodItemLogo" />
            <div className="fooditemTextCon">
              <h1 className="foodItemName">{name}</h1>
              <div className="foodItemPrice">
                <BiRupee />
                <p className="foodItemCost">{cost}.00</p>
              </div>
              <div className="foodItemRating">
                <BsFillStarFill className="foodItemStar" />
                <p className="foodRating">{rating}</p>
              </div>

              {isCounterComponentOn ? (
                <button
                  type="button"
                  className="addBtn"
                  onClick={onClickAddBtn}
                >
                  ADD
                </button>
              ) : (
                <div className="counterCon">
                  <button
                    type="button"
                    onClick={onDecrement}
                    className="onIncrementbnt"
                  >
                    -
                  </button>
                  <div className="quantity">{quantity}</div>
                  <button
                    type="button"
                    onClick={onIncrement}
                    className="onIncrementbnt"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderFoodItem()
  }
}
export default FoodItem
