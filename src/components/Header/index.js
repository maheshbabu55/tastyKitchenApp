import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const getColor = current => {
    const {history} = props
    if (history.location.pathname === current) {
      console.log(history.location.pathname)
      return '#f7931e'
    }
    return '#334155'
  }

  return (
    <nav className="navCon">
      <Link to="/" className="linkEdit">
        <div className="iconCon">
          <img
            src="https://i.postimg.cc/QCwhDDMC/Frame-274.png"
            alt="website logo"
            className="homeLogo"
          />
          <h1 className="homeHead">Tasty Kitchens</h1>
        </div>
      </Link>
      <ul className="ulCon">
        <Link to="/" className="linkEdit">
          <li className="unselected" style={{color: getColor('/')}}>
            Home
          </li>
        </Link>
        <Link to="/cart" className="linkEdit">
          <li className="unselected" style={{color: getColor('/cart')}}>
            Cart
          </li>
        </Link>
        <li>
          <button type="button" className="logoutBtn" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
