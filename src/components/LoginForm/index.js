import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', displayError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({displayError: true, errorMsg})
  }

  onUserName = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginForm = () => {
    const {errorMsg, displayError} = this.state
    return (
      <div className="mainCon">
        <div className="textCon">
          <form className="loginForm" onSubmit={this.onLogin}>
            <img
              src="https://i.postimg.cc/QCwhDDMC/Frame-274.png"
              alt="website logo"
              className="logoEdit"
            />
            <h1 className="title">Tasty Kitchens</h1>
            <p className="Login">Login</p>
            <div className="inputCon">
              <label htmlFor="userName" className="loginLabel">
                USERNAME
              </label>{' '}
              <br />
              <input
                type="text"
                className="loginInput"
                id="userName"
                placeholder="Username"
                onChange={this.onUserName}
              />
            </div>
            <div className="inputCon">
              <label htmlFor="password" className="loginLabel">
                PASSWORD
              </label>{' '}
              <br />
              <input
                type="password"
                className="loginInput"
                id="password"
                placeholder="Password"
                onChange={this.onPassword}
              />
            </div>
            <button type="submit" className="loginBnt">
              Login
            </button>
            {displayError && (
              <div>
                {' '}
                <p className="errorMsg">*{errorMsg}</p>
              </div>
            )}
          </form>
        </div>
        <img
          src="https://i.postimg.cc/05GKPHGQ/Rectangle-1456-1x.png"
          alt="website login"
          className="frontPageEdit"
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginForm()
  }
}
export default LoginForm
