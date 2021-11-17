import {Component} from 'react'

import CartContext from '../../Context/CartContext'
import './index.css'
import EmptyCart from '../EmptyCart'

class Cart extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const showEmptyView = cartList.length === 0
          // TODO: Update the functionality to remove all the items in the cart

          return (
            <>
              <div className="cart-container">
                {showEmptyView ? (
                  <EmptyCart />
                ) : (
                  <div className="cart-content-container">
                    <h1 className="cart-heading">My Cart</h1>
                  </div>
                )}
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
