import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import App from './App'
import StatusContextProvider from './contexts/StatusContext'
import AccountContextProvider from './contexts/AccountContext'
import DataProvider from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <StatusContextProvider>
        <AccountContextProvider>
          <Router>
            <App />
          </Router>
        </AccountContextProvider>
      </StatusContextProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
