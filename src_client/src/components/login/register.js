import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// actions
import { startPostRegister} from '../../actions/login'

// selectors
import { getIsRegistered } from '../../reducers/accounts'

class RegisterComponent extends React.Component {

  static propTypes = {
    startRegister: PropTypes.func.isRequired,
    isRegistered: PropTypes.bool.isRequired
  }

  handleClick = () => {
    const { startRegister } = this.props
    const email = this.refs.email.value
    const password = this.refs.password.value
    startRegister({email, password})
  }

  render () {
    const { isRegistered } = this.props
    console.log()
    if (isRegistered) return <Redirect to='/' />
    return (
      <div className='vertical-center'>
        <div className="row">
          <div className='col-sm-4 offset-sm-4'>
            <div className="login-border">
              <h2>Register</h2>
              <div className="form-group">
                <label htmlFor="inputEmail1">Email address</label>
                <input className="form-control" type="email" ref="email" aria-describedby="emailHelp" id="inputEmail1"/>
              </div>
              <div  className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" type="password" ref="password"id="password"/>
              </div>
              <div  className="form-group">
                <input type="button" className="btn btn-primary hc-button" onClick={this.handleClick} value="Register"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isRegistered: getIsRegistered(state)
})

const mapDispatchToProps = dispatch => ({
  startRegister (data) {
    dispatch(startPostRegister(data))
  }
})

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)

export default Register
