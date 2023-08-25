import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', toShowErrorMsg: false, errorMsg: ''}

  getSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  getFailure = errorMsg => {
    this.setState({toShowErrorMsg: true, errorMsg})
  }

  getAccessToLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok === true) {
      this.getSuccess(data.jwt_token)
    } else {
      this.getFailure(data.error_msg)
    }
  }

  inputUsername = e => {
    this.setState({username: e.target.value})
  }

  inputPassword = e => {
    this.setState({password: e.target.value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="user-details-card">
        <label className="users" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input-ele"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={this.inputUsername}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="user-details-card">
        <label className="users" htmlFor="Password">
          PASSWORD
        </label>
        <input
          className="input-ele"
          id="Password"
          type="password"
          placeholder="password"
          value={password}
          onChange={this.inputPassword}
        />
      </div>
    )
  }

  renderSubmitFromToLogin = () => {
    const {toShowErrorMsg, errorMsg} = this.state
    return (
      <>
        <form className="login-card" onSubmit={this.getAccessToLogin}>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          {this.renderUsername()}
          {this.renderPassword()}
          <button className="submit-btn" type="submit">
            Login
          </button>
          {toShowErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        {this.renderSubmitFromToLogin()}
      </div>
    )
  }
}

export default Login
