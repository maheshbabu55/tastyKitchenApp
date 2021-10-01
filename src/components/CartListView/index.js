import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../Context/CartContext'
import CartItem from '../CartItem'
import Footer from '../Footer'
import PaymentSuccessfull from '../PaymentSuccessful'
import './index.css'

class CartListView extends Component {
  state = {displayPaymentSuccessful: false}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartData} = value
          let total = 0
          cartData.forEach(eachItem => {
            total += eachItem.quantity * eachItem.cost
          })
          const {displayPaymentSuccessful} = this.state
          const renderPaymentSuccessfull = () => {
            this.setState({displayPaymentSuccessful: true})
          }
          const goToHome = () => {
            this.setState({displayPaymentSuccessful: false})
          }

          return (
            <>
              {displayPaymentSuccessful ? (
                <PaymentSuccessfull goToHome={goToHome} />
              ) : (
                <>
                  <ul className="ulCartCon">
                    <div className="headers">
                      <p className="Carttitle">Item</p>
                      <p className="Carttitle">Quantity</p>
                      <p className="Carttitle">Price</p>
                    </div>

                    {cartData.map(eachItem => (
                      <CartItem key={eachItem.id} data={eachItem} />
                    ))}
                    <hr />
                    <div className="cartTotal">
                      <p className="Carttitle">Order Total:</p>
                      <div>
                        <div className="cartPrice">
                          {' '}
                          <BiRupee
                            size={22}
                            style={{marginRight: 5}}
                            className="cartRupee"
                          />
                          <p className="Carttitle" data-testid="total-price">
                            {total}.00
                          </p>
                        </div>
                        <button
                          type="button"
                          className="logoutBtn"
                          onClick={renderPaymentSuccessfull}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </ul>
                  <Footer />
                </>
              )}{' '}
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartListView
