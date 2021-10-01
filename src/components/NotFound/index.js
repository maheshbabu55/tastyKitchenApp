import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="notFoundCon">
      <img src="https://i.postimg.cc/sgQfZ9KZ/erroring-1.png" alt="not found" />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="logoutBtn">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
