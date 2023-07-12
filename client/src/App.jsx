import React,{ useContext} from "react"
import { Routes,Route,Navigate} from 'react-router-dom'
import ProtectedRoute from "./components/authComponents/ProtectedRoute"
import Auth from './components/authComponents/Auth.jsx'
import SavedLikes from './components/SavedLikes'
import './App.css'
import Home from './components/Home'
import AddLikesform from './components/AddLikesForm'
import NavBar from "./components/nav/Navbar"
import { UserContext } from './components/context/UserProvider.jsx'


function App() {
  const { token,logout } = useContext(UserContext)

  return (
    <div className='App'>
    {/* conitional veiw hides the navbar and have to login to see the site  */}
  {token && <NavBar logout ={logout} />}
    
    <Routes>
    
      <Route path='/' element={token ? <Home/> : <Auth/>}/>
      
  
      <Route path='/savedLikes' element={<ProtectedRoute token={token} >
        <SavedLikes/>
      </ProtectedRoute>}/>

      <Route path='/addLikesForm' element={<ProtectedRoute token={token} >
        <AddLikesform />  
      </ProtectedRoute>}/>
      
    </Routes>
    </div>
  )
}

export default App