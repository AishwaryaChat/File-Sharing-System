import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// selectors
import { getfilesById } from '../../reducers/organisation'
import { getJwt} from '../../reducers/accounts'

// actions
import { emitFile } from '../../actions/file'

const mapStateToProps = state => ({
  filesById: getfilesById(state),
  jwt: getJwt(state)
})

const mapDispatchToProps = dispatch => ({
  setFile (data) {
    dispatch(emitFile(data))
  }
})

class FileListComponent extends React.Component {
  static propTypes = {
    filesById: PropTypes.object.isRequired,
    setFile: PropTypes.func.isRequired,
    jwt: PropTypes.string.isRequired
  }

  handleClick = (e) => {
    const { setFile, history } = this.props
    history.push({
      pathname: '/showfile'
    })
    setFile(e.target.id)
  }

  render () {
    const { filesById, organisation } = this.props
    return (
      <div className='card-body'>
        {organisation.files.map((id, index) => {
          if (filesById[id]) {
            return (
              <div className='row card-header' key={index}>
                <div className='col-sm-7 card-text' onClick={this.handleClick} id={id}>{filesById[id].name}</div>
                <div className='col-sm-2'>
                  <button className='btn btn-info'>Get Link</button>
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }
}

const FileList = withRouter(connect(mapStateToProps, mapDispatchToProps)(FileListComponent))

export default FileList
