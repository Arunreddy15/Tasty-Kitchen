import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = error => {
    this.setState({showErrorMsg: true, errorMsg: error})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  renderFormContainer = () => {
    const {username, password, showErrorMsg, errorMsg} = this.state
    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        <div className="input-username">
          <label htmlFor="username" className="labels">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div className="input-password">
          <label htmlFor="password" className="labels">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
        {showErrorMsg && <p className="errorMsg">{errorMsg}</p>}
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-container-desktop">
          <div className="details-container">
            <div className="container">
              <img
                src="https://res.cloudinary.com/imagelinks/image/upload/v1636799192/Frame_274_xmzte1.png"
                alt="website logo"
                className="logo-pic"
              />
              <p className="logo-text">Tasty Kitchens</p>
              <h1 className="login-text">Login</h1>

              {this.renderFormContainer()}
            </div>
          </div>
          <div className="image-container">
            <img
              src="https://res.cloudinary.com/imagelinks/image/upload/v1636798203/Rectangle_1456_xwkqpk.png"
              alt="website login"
              className="login-pic"
            />
          </div>
        </div>
        <div className="login-container">
          <div className="image-mobile-login">
            <div className="log-image">
              <img
                src="https://res.cloudinary.com/imagelinks/image/upload/v1638259954/res-console.cloudinary_p68k4u.png"
                alt="mobile"
                className="pic"
              />
            </div>
          </div>
          <h1 className="login-text">Login</h1>
          {this.renderFormContainer()}
        </div>
      </>
    )
  }
}
export default Login
