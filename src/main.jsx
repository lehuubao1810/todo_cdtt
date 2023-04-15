import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ThemeProvider from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </AuthProvider>
)
