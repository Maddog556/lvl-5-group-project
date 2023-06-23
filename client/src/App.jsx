import React,{useContext} from "react"
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Auth from './components/authComponents/Auth.jsx'
import SavedLikes from './components/SavedLikes'
import './App.css'
import AddLikesform from './components/AddLikesForm'
import ProtectedRoute from "./components/authComponents/ProtectedRoute"
import NavBar from "./components/nav/Navbar"
import { UserContext } from './components/context/UserProvider.jsx'


function App() {
  const { token, logout } = useContext(UserContext)

  return (
    <div className='App'>
    {/* conitional veiw hides the navbar and have to login to see the site  */}
    { token && <NavBar logout={logout} token={token} />}
    
    <Routes>
    
      <Route path='/' index element={<Auth/>}/>
  
      <Route path='/AddLikesForm' element={<ProtectedRoute token={token}redirectTo='/'>
        <AddLikesform />  
      </ProtectedRoute>}/>

      <Route path='/SavedLikes' element={<ProtectedRoute token={token}redirectTo='/'>
        <SavedLikes/>
      </ProtectedRoute>}/>
      
    </Routes>
    </div>
  )
}

export default App