import './index.css'
import {Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'

const SuccessPayment = () => (
  <div className="success-payment-page">
    <div className="success-container">
      <AiFillCheckCircle size={34} className="fill-check" />
      <h1 className="payment-heading">Payment Success</h1>
      <p className="payment-description">
        Thank you for ordering <br /> Your payment is successfully completed
      </p>
      <Link to="/" className="nav-link">
        <button type="button" className="error-page-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  </div>
)
export default SuccessPayment
