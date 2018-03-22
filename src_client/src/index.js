import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import AppRouter from './components/router.jsx'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './helpers/configureStore'

import 'bootstrap/dist/css/bootstrap.css'

const store = configureStore()

ReactDOM.render(<AppRouter store={store} />, document.getElementById('root'))
registerServiceWorker()
