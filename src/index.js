import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import App from './App'
import StatusContextProvider from './contexts/StatusContext'
import DataProvider from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <StatusContextProvider>
        <Router>
          <App />
        </Router>
      </StatusContextProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
