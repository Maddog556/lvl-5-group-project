import { useState } from 'react'
import Login from './components/Login'
import AddLikes from './components/AddLikes'
import SavedLikes from './components/SavedLikes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
 <Router>
    <Routes>
    
      <Route path='/' index element={<Login />}/>
      <Route path='/AddLikes' element={<AddLikes />}/>
      <Route path='/SavedLikes' element={<SavedLikes />}/>
    
    </Routes>
  </Router>
    </div>
  )
}

