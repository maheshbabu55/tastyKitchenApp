import {Link} from 'react-router-dom'
import CartContext from '../../Context/CartContext'
import './index.css'

const PaymentSuccessfull = props => (
  <CartContext.Consumer>
    {value => {
      const {deleteAllItem} = value
      const {goToHome} = props
      const onDeleteAllItem = () => {
        deleteAllItem()
      }
      return (
        <div className="paymentSuccessfullCon">
          <div className="paymentSuccessInnerCon">
            <img
              src="https://i.postimg.cc/B6vnWzp4/Vector-1.png"
              alt="payment Successful"
            />
            <h1 className="paysussTitle">Payment Successful</h1>
            <p style={{textAlign: 'center'}}>
              {' '}
              Thank you for ordering. Your payment <br /> is successfully
              completed.
            </p>
            <Link to="/">
              <button
                type="button"
                className="logoutBtn"
                onClick={(goToHome, onDeleteAllItem)}
              >
                Go To Home
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default PaymentSuccessfull
