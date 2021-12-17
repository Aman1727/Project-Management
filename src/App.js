import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// styles
import './App.css'

//pages and components
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Create from './pages/create/Create'
import Error from './pages/error/Error'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'

function App() {

  const {user, authIsReady} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar/>}
          <div className="container">
            <Navbar/>
            <Routes>
              <Route path = "/" element={!user ? <Navigate to="/login" />:<Dashboard/> } />
              <Route path = "/create" element = {!user ? <Navigate to="/login" />:<Create/>} />
              <Route path = "/projects/:id" element = {!user ? <Navigate to="/login" />:<Project/>} />
              <Route path = "/login" element={user ? <Navigate to="/" /> :<Login/>} />
              <Route path = "/signup" element={user ? <Navigate to="/" /> : <Signup/>} />
              <Route path = "*" element={<Error/>} />
            </Routes>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
