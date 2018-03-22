import React from 'react'
import { connect } from 'react-redux'

// selectors
import { getFile } from '../reducers/publicReducer'

// actions
import { startFetchPublicFile, startPatchPublicFile, emitFile } from '../actions/publicAction'

const mapStateToProps = state => ({
  activeFile: getFile(state)
})

const mapDispatchToProps = dispatch => ({
  setFile (data) {
    dispatch(emitFile(data))
  },
  fetchFile (data) {
    dispatch(startFetchPublicFile(data))
  },
  patchPublicFile (data) {
    dispatch(startPatchPublicFile(data))
  }
})

class ViewFileComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.activeFile.name,
      content: this.props.activeFile.content
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeFile.name !== this.props.activeFile.name) {
      this.setState({name: nextProps.activeFile.name})
    }

    if (nextProps.activeFile.content !== this.props.activeFile.content) {
      this.setState({content: nextProps.activeFile.content})
    }
  }

  componentWillUnmount () {
    const { setFile } = this.props
    setFile({})
  }

  componentDidMount () {
    const { fetchFile } = this.props
    const { userId, fileId } = this.props.match.params
    fetchFile({ fileId, userId })
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleClick = () => {
    const { userId, fileId } = this.props.match.params
    const { patchPublicFile } = this.props
    const { name, content } = this.state
    patchPublicFile({fileId, name, content, userId})
  }

  render () {
    const { activeFile } = this.props
    return (
      <div>
        {
          Object.keys(activeFile).length !== 0
            ? (
              <div className='vertical-center-createfile'>
                <div className="row">
                  <div className='col-sm-8 offset-sm-2'>
                    <div className="login-border">
                      <h5>Read/Write</h5>
                      <div className="form-group form-group-createfile">
                        <label htmlFor='filename'>Filename</label>
                        <input className="form-control" id='name' type='text' onChange={this.handleChange} placeholder='Type filename' value={this.state.name}/>
                      </div>
                      <div className="form-group form-group-createfile">
                        <label htmlFor='content'>File Content</label>
                        <textarea className="form-control" rows='10' cols='50' id='content' onChange={this.handleChange} placeholder='Type file content here' defaultValue={this.state.content} />
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

const ViewFile = connect(mapStateToProps, mapDispatchToProps)(ViewFileComponent)

export default ViewFile
