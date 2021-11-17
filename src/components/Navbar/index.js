import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiMenu} from 'react-icons/hi'
import './index.css'

class Navbar extends Component {
  state = {menu: false}

  onClickMenu = () => this.setState(prevState => ({menu: !prevState.menu}))

  render() {
    const {menu} = this.state
    const onClickLogout = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    return (
      <div>
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
              <li>
                <Link to="/" className="nav-links">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="nav-links">
                  Cart
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="logout-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <HiMenu
              size={24}
              className="icon-mobile"
              onClick={this.onClickMenu}
            />
          </div>
        </nav>

        {menu ? (
          <ul className="links-container-mobile">
            <li>
              <Link to="/" className="nav-links">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="nav-links">
                Cart
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
    )
  }
}
export default withRouter(Navbar)
