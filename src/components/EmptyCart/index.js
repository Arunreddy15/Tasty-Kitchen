import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div className="cart-page">
    <div className="cart-image-container">
      <img
        src="https://res.cloudinary.com/imagelinks/image/upload/v1636977387/cooking_1_gd8tle.png"
        alt="empty-cart"
        className="cart-empty-pic"
      />
      <h1 className="empty-cart-heading">No Orders yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from menu.
      </p>
      <Link to="/" className="nav-link">
        <button type="button" className="error-page-btn">
          Order Now
        </button>
      </Link>
    </div>
  </div>
)
export default EmptyCart
