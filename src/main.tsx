import React from 'react'

import ReactDOM from 'react-dom/client'

import './styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
