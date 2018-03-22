import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { PrivateHeader, Header } from './header'
import { getIsLoggedIn } from '../../reducers/accounts'

export const Layout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className='bg-color'>
          <Header />
          <Component {...matchProps} />
        </div>
      )}
    />
  )
}

export const Private = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className='bg-color'>
          <PrivateHeader />
          <Component {...matchProps} />
        </div>
      )}
    />
  )
}

const PrivateLayoutComponent = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => {
  if (isLoggedIn) {
    return <Private {...rest} component={Component} />
  } else return <Redirect to='/' />
}

PrivateLayoutComponent.props = {
  isLoggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
})

export const PrivateLayout = connect(mapStateToProps)(PrivateLayoutComponent)
