import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {CopyToClipboard} from 'react-copy-to-clipboard'

// selectors
import { getById, getAllIds } from '../../reducers/file'
import { getJwt, getUserId } from '../../reducers/accounts'

// actions
import { emitFile } from '../../actions/file'
import { startAddFile } from '../../actions/organisation'

const mapStateToProps = state => ({
  filesById: getById(state),
  filesAllIds: getAllIds(state),
  jwt: getJwt(state),
  userId: getUserId(state)
})

const mapDispatchToProps = dispatch => ({
  setFile (data) {
    dispatch(emitFile(data))
  },
  addFileToOrganisation (data) {
    dispatch(startAddFile(data))
  }
})

class FileListComponent extends React.Component {
  static propTypes = {
    filesById: PropTypes.object.isRequired,
    filesAllIds: PropTypes.array.isRequired,
    setFile: PropTypes.func.isRequired,
    jwt: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  }

  handleClick = (e) => {
    const { setFile, history } = this.props
    history.push({
      pathname: '/showfile'
    })
    setFile(e.target.id)
  }

  getDisable = () => {
    const { organisation } = this.props
    if (Object.keys(organisation).length === 0) return true
    return false
  }

  handleAddFile = (e) => {
    const { organisation, jwt, addFileToOrganisation } = this.props
    if (Object.keys(organisation).length !== 0) {
      addFileToOrganisation({id: organisation.id, fileId: e.target.id, jwt})
    }
  }

  getUrl = id => {
    const { userId } = this.props
    return `${process.env.REACT_APP_SERVER}/file/${id}/user/${userId}`
  }

  render () {
    const { filesById, filesAllIds } = this.props
    return (
      <div className='card-body'>
        {filesAllIds.map((id, index) => (
          <div className='row card-header' key={index}>
            <div className='col-sm-7 card-text' onClick={this.handleClick} id={id}>{filesById[id].name}</div>
            <div className='col-sm-2'>
              <CopyToClipboard
                text={this.getUrl(id)}
                onCopy={() => this.setState({copied: true})}>
                <button className='btn btn-info'>Get Link</button>
              </CopyToClipboard>
            </div>
            <div className='col-sm-2'>
              <button
                className='btn btn-info'
                disabled={this.getDisable()}
                id={id}
                onClick={this.handleAddFile}
                >
                  Add to Organisation
                </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const FileList = withRouter(connect(mapStateToProps, mapDispatchToProps)(FileListComponent))

export default FileList
