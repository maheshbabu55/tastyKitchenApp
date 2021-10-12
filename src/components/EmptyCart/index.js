import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div className="emptyCart">
    <img
      src="https://i.postimg.cc/L85C18nS/cooking-1.png"
      alt="empty cart"
      className="mobileEmptyCartImage"
    />
    <p className="emptyCartDes">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="logoutBtn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCart
