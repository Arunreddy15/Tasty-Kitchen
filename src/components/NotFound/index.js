import {Link} from 'react-router-dom'
import './index.css'
import Navbar from '../Navbar'

const NotFound = () => (
  <>
    <Navbar />
    <div className="error-page">
      <img
        src="https://res.cloudinary.com/imagelinks/image/upload/v1636974844/erroring_1_nahgya.png"
        alt="not found"
        className="error-pic"
      />
      <h1 className="error-heading">Page Not Found</h1>
      <p className="error-description">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/" className="nav-link">
        <button type="button" className="error-page-btn">
          Home Page
        </button>
      </Link>
    </div>
  </>
)
export default NotFound
