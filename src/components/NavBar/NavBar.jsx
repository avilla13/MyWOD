import { Link } from "react-router-dom"
import AuthPage from '../../pages/AuthPage/AuthPage';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({user, setUser}) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <nav className="navbar">
      <Link to="/" >
        <h2>MyWOD</h2>
      </Link>
      { user ? 
      <>
        <Link to="/wods">MyWODS</Link>
        &nbsp; | &nbsp;
        <Link to="/wods/new">New WOD</Link>
        &nbsp;&nbsp;
        <div className="right">
          <span>Welcome, {user.name}</span>
          &nbsp;&nbsp;<Link to="" onClick={handleLogOut} >Log Out</Link>
        </div>
      </>
      :
      <div className="right">
        <Link to="/auth" >Sign Up/Log In</Link>      
      </div>
      }
    </nav>
  )
}
