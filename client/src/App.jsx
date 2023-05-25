import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import Login from './components/Login'
import AddLikes from './components/AddLikesForm'
import SavedLikes from './components/SavedLikes'
import './App.css'

function App() {

  return (
    <div className='App'>
 <Router>
    <Routes>
    
      <Route path='/' index element={<Login />}/>
      <Route path='/AddLikesForm' element={<AddLikes />}/>
      <Route path='/SavedLikes' element={<SavedLikes />}/>
    
    </Routes>
  </Router>
    </div>
  )
}

export default App