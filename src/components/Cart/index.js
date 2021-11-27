import {Component} from 'react'
import {Link} from 'react-router-dom'
import Context from '../../context/Context'
import './index.css'
import EmptyCart from '../EmptyCart'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartItem from '../CartItem'

class Cart extends Component {
  cartListView = () => (
    <Context.Consumer>
      {value => {
        const {cartList} = value
        return (
          <ul>
            {cartList.map(each => (
              <CartItem eachItem={each} />
            ))}
          </ul>
        )
      }}
    </Context.Consumer>
  )

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {cartList} = value
          const showEmptyView = cartList.length === 0

          return (
            <div className="">
              <Navbar />
              <div className="cart-container">
                {showEmptyView ? (
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
                )}
              </div>
              <Footer />
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Cart
