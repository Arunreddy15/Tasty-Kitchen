import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import './App.css'
import RestaurantItems from './components/RestaurantItems'
import Context from './context/Context'

class App extends Component {
  state = {cartList: []}

  addCartItem = product => {
    const {cartList} = this.state
    const productObj = cartList.find(each => each.id === product.id)
    if (productObj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === product.id) {
            const updateQuantity = each.quantity + product.quantity
            return {...each, quantity: updateQuantity}
          }
          return each
        }),
      }))
    } else {
      const upCart = [...cartList, product]
      this.setState({cartList: upCart})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <Context.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantItems}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/bad-path" component={NotFound} />
          <ProtectedRoute component={NotFound} />
        </Switch>
      </Context.Provider>
    )
  }
}
export default App
