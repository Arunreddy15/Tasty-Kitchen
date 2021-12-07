import {Component} from 'react'
// import {Link} from 'react-router-dom'

import './index.css'
import EmptyCart from '../EmptyCart'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartItem from '../CartItem'

class Cart extends Component {
  state = {}

  componentDidMount() {
    const item = localStorage.getItem('cartList')
    console.log(item)
    this.setState({cartItems: item})
  }
  // const showEmptyView=cartList.length===0

  // const cartListItems = localStorage.getItem('cartItem')

  cartListView = () => {
    const {cartItems} = this.state
    return (
      <ul>
        {cartItems.map(each => (
          <CartItem eachItem={each} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="">
        <Navbar />
        <div className="cart-container">
          <EmptyCart />
          {/* {cartListItems.length ? (
            <EmptyCart />
          ) : (
            <div className="cart-content-container">
              <div className="heads">
                <p>Item</p>
                <p>Quantity</p>
                <p>Price</p>
              </div>
              {this.cartListView()}

              <div className="order-amount-container">
                <p className="order-tag">Order Total:</p>
                <div className="amount-btn">
                  <p>₹amount/-</p>
                  <button
                    className="place-order-btn"
                    type="button"
                    onClick={this.onClickPlace}
                  >
                    <Link to="/success" className="place-link">
                      Place Order
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Cart
