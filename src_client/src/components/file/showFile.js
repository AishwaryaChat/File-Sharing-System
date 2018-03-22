import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// selectors
import { getById, getActiveFile } from '../../reducers/file'
import { getJwt } from '../../reducers/accounts'

// actions
import { emitFile, startPatchFile } from '../../actions/file'

const mapStateToProps = state => ({
  filesById: getById(state),
  activeFile: getActiveFile(state),
  jwt: getJwt(state)
})

const mapDispatchToProps = dispatch => ({
  setFile (data) {
    dispatch(emitFile(data))
  },
  patchFile (data, cb) {
    dispatch(startPatchFile(data, cb))
  }
})

class ViewFileComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.filesById[this.props.activeFile].name,
      content: this.props.filesById[this.props.activeFile].content
    }
  }

  componentWillUnmount () {
    const { setFile } = this.props
    setFile('')
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleClick = () => {
    const { patchFile, activeFile, jwt, history } = this.props
    const { name, content } = this.state
    patchFile({id: activeFile, name, content, jwt }, () => {
      history.push({
        pathname: '/dashboard'
      })
    })
  }

  render () {
    const { filesById, activeFile } = this.props
    return (
      <div>
        {
          filesById[activeFile]
            ? (
              <div className='vertical-center-createfile'>
                <div className="row">
                  <div className='col-sm-8 offset-sm-2'>
                    <div className="login-border">
                      <h2>Edit File</h2>
                      <div className="form-group form-group-createfile">
                        <label htmlFor='filename'>Filename</label>
                        <input
                          className="form-control"
                          id='name'
                          type='text'
                          placeholder='Type filename'
                          onChange={this.handleChange}
                          value={this.state.name}
                        />
                      </div>
                      <div className="form-group form-group-createfile">
                        <label htmlFor='content'>File Content</label>
                        <textarea
                          className="form-control"
                          rows='10' cols='50'
                          id="content"
                          placeholder='Type file content here'
                          value={this.state.content}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group form-group-createfile">
                        <button className="btn btn-primary hc-button" onClick={this.handleClick}>Edit File</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : null
        }
      </div>
    )
  }
}

const ViewFile = withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewFileComponent))

export default ViewFile
