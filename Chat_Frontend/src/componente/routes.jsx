import React from 'react'
import App from '../App'
import {Route,Routes} from 'react-router'
import ChatPage from './ChatPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatPage/>} />
    </Routes>
  )
}

export default AppRoutes