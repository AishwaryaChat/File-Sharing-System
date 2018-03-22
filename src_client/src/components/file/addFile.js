import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// actions
import { startPostFile } from '../../actions/file'

// selectors
import { getJwt } from '../../reducers/accounts'

const mapStateToProps = state => ({
  jwt: getJwt(state)
})

const mapDispatchToProps = dispatch => ({
  postFile (data, cb) {
    dispatch(startPostFile(data, cb ))
  }
})

class AddFileComponent extends React.Component {
  handleClick = () => {
    const name = this.refs.filename.value
    const content = this.refs.content.value
    const { jwt, postFile, history } = this.props
    postFile({name, content, jwt}, () => {
      history.push({
        pathname: '/dashboard'
      })
    })
  }

  render () {
    return (
      <div className='vertical-center-createfile'>
        <div className="row">
          <div className='col-sm-8 offset-sm-2'>
            <div className="login-border">
              <h2>Create New File</h2>
              <div className="form-group form-group-createfile">
                <label htmlFor='filename'>Filename</label>
                <input className="form-control" id='filename' type='text' ref="filename" placeholder='Type filename' />
              </div>
              <div className="form-group form-group-createfile">
                <label htmlFor='content'>File Content</label>
                <textarea className="form-control" rows='10' cols='50' name='content' ref="content" placeholder='Type file content here' />
              </div>
              <div className="form-group form-group-createfile">
                <button className="btn btn-primary hc-button" onClick={this.handleClick}>Save File</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const AddFile = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddFileComponent))

export default AddFile
