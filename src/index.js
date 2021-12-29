import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import AccountContextProvider from './contexts/AccountContext'
import NotifyContextProvider from './contexts/NotifyContext'
import PostContextProvider from './contexts/PostContext'
import ProfileContextProvider from './contexts/ProfileContext'
import StatusContextProvider from './contexts/StatusContext'
import './index.css'
import DataProvider from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <ProfileContextProvider>
        <StatusContextProvider>
          <PostContextProvider>
            <AccountContextProvider>
              <NotifyContextProvider>
                <Router>
                  <App />
                </Router>
              </NotifyContextProvider>
            </AccountContextProvider>
          </PostContextProvider>
        </StatusContextProvider>
      </ProfileContextProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
