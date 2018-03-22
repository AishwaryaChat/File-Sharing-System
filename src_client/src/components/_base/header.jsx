import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// actions
import { startLogout } from '../../actions/login'

// selectores
import { getJwt } from '../../reducers/accounts'

export const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar-brand">File Sharing System</div>
      <ul className="navbar-nav ml-auto">
        <li><Link to='/' className="nav-item nav-link">Login</Link></li>
        <li><Link to='/register' className="nav-item nav-link">Register</Link></li>
      </ul>
    </nav>
  </header>
)

class PrivateHeaderComponent extends React.Component {
  handleClick = () => {
      const { logout, jwt } = this.props
      logout({ jwt })
  }

  render () {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-brand">File Sharing System</div>
          <ul className="navbar-nav ml-auto">
            <li>
              <Link to="/dashboard" className="nav-item nav-link">DashBoard</Link>
            </li>
            <li>
              <Link to="/organisation" className="nav-item nav-link">Organisation</Link>
            </li>
            <li>
              <button type='button' className="nav-item nav-link btn btn-primary" onClick={this.handleClick}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      )
    }
}

PrivateHeaderComponent.props = {
  logout: PropTypes.func.isRequired,
  jwt: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  jwt: getJwt(state)
})

const mapDispatchToProps = dispatch => ({
  logout (data) {
    return dispatch(startLogout(data))
  }
})

export const PrivateHeader = connect(mapStateToProps, mapDispatchToProps)(
  PrivateHeaderComponent
)
