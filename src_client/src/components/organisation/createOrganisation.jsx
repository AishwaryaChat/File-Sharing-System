import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// ations
import { startPostOrganisation } from '../../actions/organisation'

// selectors
import { getJwt } from '../../reducers/accounts'

const mapStateToProps = state => ({
  jwt: getJwt(state)
})

const mapDispatchToProps = dispatch => ({
  createOrganisation (data, cb) {
    dispatch(startPostOrganisation(data, cb))
  }
})

class CreateOrganisationComponent extends React.Component {
  static propTypes = {
    createOrganisation: PropTypes.func.isRequired,
    jwt: PropTypes.string.isRequired
  }

  handleClick = () => {
    const { createOrganisation, jwt, history } = this.props
    const name = this.refs.name.value
    createOrganisation({name, jwt}, () => {
      history.push({
        pathname: '/dashboard'
      })
    })
  }

  render () {
    return (
      <div className='vertical-center'>
        <div className="row">
          <div className='col-sm-8 offset-sm-2'>
            <div>
              <h2>Create New Organisation</h2>
              <div className="form-group form-group-createfile">
                <label htmlFor='name'>Organisation Name</label>
                <input className="form-control" id='name' type='text' ref='name'/>
              </div>
              <div className="form-group form-group-createfile">
                <button className="btn btn-primary" onClick={this.handleClick}>Create Organisation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const CreateOrganisation = withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateOrganisationComponent))

export default CreateOrganisation
