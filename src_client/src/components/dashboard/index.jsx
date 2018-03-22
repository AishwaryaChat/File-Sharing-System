import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import FileList from '../file/fileList'

// actions
import { startFetchFiles } from '../../actions/file'
import { startFetchOrganisation } from '../../actions/organisation'

// selectors
import { getJwt } from '../../reducers/accounts'
import { getOrganisation } from '../../reducers/organisation'

const mapStateToProps = state => ({
  jwt: getJwt(state),
  organisation: getOrganisation(state)
})

const mapDispatchToProps = dispatch => ({
  fetchFiles (data) {
    dispatch(startFetchFiles(data))
  },
  fetchOrganisation (data) {
    dispatch(startFetchOrganisation(data))
  }
})

class DashboardComponent extends React.Component {
  componentDidMount () {
    const { jwt, fetchFiles, fetchOrganisation } = this.props
    fetchFiles({ jwt })
    fetchOrganisation({ jwt })
  }

  render () {
    const { organisation } = this.props
    return (
      <div className='col-sm-10 offset-sm-1 dashboard-wrapper'>
        <div className='row'>
          <div className='col-sm-6'>
            <h3>Dashboard</h3>
          </div>
          <div className='col-sm-2 offset-sm-4'>
            <Link className='btn btn-dark' to='/addfile'>Create File</Link>
          </div>
        </div>
        <div className='card'>
          <span className='card-header'><h4>My files</h4></span>
          <FileList
            organisation={organisation}
          />
        </div>
      </div>
    )
  }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

export default Dashboard
