import {Component} from 'react'

import Context from '../../context/Context'
import './index.css'
import EmptyCart from '../EmptyCart'

class Cart extends Component {
  render() {
    return (
      <Context.Consumer>
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
      </Context.Consumer>
    )
  }
}

export default Cart
