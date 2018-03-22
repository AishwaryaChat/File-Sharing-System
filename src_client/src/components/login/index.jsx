import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// actions
import { startPostLogin } from '../../actions/login'

// selectors
import { getIsLoggedIn } from '../../reducers/accounts'

class LoginComponent extends React.Component {

  static propTypes = {
    startLogin: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
  }

  handleClick = () => {
    const { startLogin } = this.props
    const email = this.refs.email.value
    const password = this.refs.password.value
    startLogin({email, password})
  }

  render () {
    const { isLoggedIn } = this.props
    if (isLoggedIn) return <Redirect to='/dashboard'/>
    return (
      <div className='vertical-center'>
        <div className="row">
          <div className='col-sm-4 offset-sm-4'>
            <div className="login-border">
              <h2>Login</h2>
              <div className="form-group">
                <label htmlFor="inputEmail1">Email address</label>
                <input className="form-control" type="email" ref="email" aria-describedby="emailHelp" id="inputEmail1"/>
              </div>
              <div  className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" ref="password"id="password"/>
              </div>
              <div  className="form-group">
                <input type="button" className="btn btn-primary hc-button" onClick={this.handleClick} value="login"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = dispatch => ({
  startLogin (data) {
    dispatch(startPostLogin(data))
  }
})

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

export default Login
