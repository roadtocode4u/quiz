import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login/Login'
import Quiz from './Quiz/Quiz'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1 className='text-center mt-5'>Quiz Not Started Yet</h1>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
