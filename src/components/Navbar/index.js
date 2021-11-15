import './index.css'

const Navbar = () => (
  <nav className="nav-container">
    <div className="navbar">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/imagelinks/image/upload/v1636799192/Frame_274_xmzte1.png"
          alt="logo"
          className="nav-logo-pic"
        />
        <p className="nav-logo-text">Tasty Kitchens</p>
      </div>
      <ul className="links-container">
        <li>Home</li>
        <li>Cart</li>
        <li>
          <button type="button" className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
)
export default Navbar
