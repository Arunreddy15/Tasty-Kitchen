import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div>
      <div className="footer-container">
        <h1 className="footer-heading">Tasty Kitchens </h1>
        <p className="footer-description">
          The only thing we are serious about it Food.
          <br />
          Contact us on
        </p>
        <ul className="icons-container">
          <li className="icon-footer">
            <FaPinterestSquare size={26} testid="pintrest-social-icon" />
          </li>
          <li className="icon-footer">
            <FaInstagram size={26} testid="instagram-social-icon" />
          </li>
          <li className="icon-footer">
            <FaTwitter size={26} testid="twitter-social-icon" />
          </li>
          <li className="icon-footer">
            <FaFacebookSquare size={26} testid="facebook-social-icon" />
          </li>
        </ul>
      </div>
    </div>
  )
}
