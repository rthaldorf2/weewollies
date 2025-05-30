import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log('Starting application...')

try {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  )
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  
  console.log('Application rendered successfully')
} catch (error) {
  console.error('Error rendering application:', error)
} 