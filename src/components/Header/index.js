import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onclickBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <div className="header-sm-website-link-logout-btn-cards">
        <Link className="sm-link" to="/">
          <img
            className="header-sm-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="link-sm-direction-container">
          <li className="link-sm-cards">
            <Link className="sm-link" to="/">
              <AiFillHome />
            </Link>
          </li>
          <li className="link-sm-cards">
            <Link to="/jobs" className="sm-link">
              <BsBriefcaseFill />
            </Link>
          </li>
          <li className="link-sm-cards">
            <button
              className="header-sm-logout-btn"
              type="button"
              onClick={onclickBtn}
            >
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>
      <div className="header-lg-website-link-logout-btn-cards">
        <Link className="sm-link" to="/">
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="link-direction-container">
          <li className="link-cards">
            <Link className="link" to="/">
              <p>Home</p>
            </Link>
          </li>
          <li className="link-cards">
            <Link to="/jobs" className="link">
              <p>Jobs</p>
            </Link>
          </li>
        </ul>
        <button
          className="header-logout-btn"
          type="button"
          onClick={onclickBtn}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
