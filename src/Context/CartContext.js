import React from 'react'

const CartContext = React.createContext({
  cartData: [],
  cartAddItem: () => {},
  cartDeleteItem: () => {},
  cartQuantityIncrement: () => {},
  cartQuantityDecrement: () => {},
  deleteAllItem: () => {},
})
export default CartContext
