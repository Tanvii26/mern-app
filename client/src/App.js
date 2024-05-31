import { useContext } from "react";
import "./App.scss"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {AuthContext} from './authContext/AuthContext'

function App() {

  /* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL.*/

            const {user} = useContext(AuthContext);
  return (
    <Router>

      <Routes>

        <Route exact path="/" element={user ? <Home/>: <Navigate to="/register"></Navigate> }/>
        <Route path="/register" element={!user ? <Register/>: <Navigate to="/"></Navigate>}/>
        <Route path="/login" element={!user ? <Login/>: <Navigate to="/"></Navigate>}/>
        {
          user && (<>
        <Route path="/movies" element={<Home type="movie"/>}/>
        <Route path="/series" element={<Home type="series"/>}/>
        <Route path="/watch" element={<Watch/>}/>
          </>)
        }
        
      </Routes>

    </Router>
  )
}

export default App;
