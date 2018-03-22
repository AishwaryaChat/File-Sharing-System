import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'

import Login from './login'
import Register from './login/register'
import { Layout, PrivateLayout } from './_base/layout'
import Dashboard from './dashboard'
import Organisation from './organisation'
import CreateOrganisation from './organisation/createOrganisation'
import AddFile from './file/addFile'
import ShowFile from './file/showFile'
import ShowPublicFile from './showFile'

const AppRouter = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Layout exact path='/' component={Login} />
        <Layout exact path='/register' component={Register} />
        <PrivateLayout exact path='/dashboard' component={Dashboard} />
        <PrivateLayout exact path='/organisation' component={Organisation} />
        <PrivateLayout exact path='/createorganisation' component={CreateOrganisation} />
        <PrivateLayout exact path='/addfile' component={AddFile} />
        <PrivateLayout exact path='/showfile' component={ShowFile} />
        <Route exact path='/file/:fileId/user/:userId' component={ShowPublicFile} />
      </Switch>
    </Router>
  </Provider>
)

export default AppRouter
