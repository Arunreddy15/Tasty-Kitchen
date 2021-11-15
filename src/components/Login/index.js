/* eslint-disable react/self-closing-comp */
import {Component} from 'react'
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
    // console.log(jwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
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
      console.log(data.jw_token)
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
    return (
      <div className="login-container">
        <div className="details-container">
          <div className="container">
            <img
              src="https://res.cloudinary.com/imagelinks/image/upload/v1636799192/Frame_274_xmzte1.png"
              alt="logo"
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
            alt="food-item"
            className="login-pic"
          />
        </div>
      </div>
    )
  }
}
export default Login
