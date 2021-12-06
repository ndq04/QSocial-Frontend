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
    <Router>
      <DataProvider>
        <StatusContextProvider>
          <AccountContextProvider>
            <App />
          </AccountContextProvider>
        </StatusContextProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
