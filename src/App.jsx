import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Download from './pages/Download'
import DownloadCsv from './pages/DownloadCsv'

const App = () => {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/download' element={<Download/>}/>
        <Route path='/download/excel' element={<DownloadCsv/>}/>

    </Routes>
    
    
    </>
  )
}

export default App
