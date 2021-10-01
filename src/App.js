import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import CartContext from './Context/CartContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'

class App extends Component {
  state = {cartData: []}

  cartAddItem = product => {
    console.log(product)
    const {cartData} = this.state
    const productObject = cartData.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    console.log(productObject)

    if (productObject) {
      this.setState(prevState => ({
        cartData: prevState.cartData.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartData, product]
      this.setState({cartData: updatedCartList})
    }
  }

  cartDeleteItem = id => {
    const {cartData} = this.state
    const filterData = cartData.filter(eachItem => eachItem.id !== id)
    this.setState({cartData: filterData})
  }

  cartQuantityIncrement = id => {
    this.setState(prevState => ({
      cartData: prevState.cartData.map(eachItem => {
        if (id === eachItem.id) {
          const UpdatedQuantiy = eachItem.quantity + 1
          return {...eachItem, quantity: UpdatedQuantiy}
        }
        return eachItem
      }),
    }))
  }

  cartQuantityDecrement = id => {
    const {cartData} = this.state
    const productObject = cartData.find(eachItem => eachItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartData: prevState.cartData.map(eachItem => {
          if (id === eachItem.id) {
            const UpdatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: UpdatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.cartDeleteItem(id)
    }
  }

  deleteAllItem = () => {
    this.setState({cartData: []})
  }

  render() {
    const {cartData} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartData,
            cartAddItem: this.cartAddItem,
            cartDeleteItem: this.cartDeleteItem,
            cartQuantityIncrement: this.cartQuantityIncrement,
            cartQuantityDecrement: this.cartQuantityDecrement,
            deleteAllItem: this.deleteAllItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
