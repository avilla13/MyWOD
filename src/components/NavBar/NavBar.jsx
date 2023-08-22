import { Link } from "react-router-dom"
import AuthPage from '../../pages/AuthPage/AuthPage';
import * as userService from '../../utilities/users-service';

export default function NavBar({user, setUser}) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  function handleSignIn(){
    alert('Sign Up/Login has been clicked!');
  }

  return (
    <nav className="navbar">
      <h2>MyWOD</h2>
      { user ? 
      <>
        <Link to="/wods">My WODS</Link>
        &nbsp; | &nbsp;
        <Link to="/wods/new">New WOD</Link>
        &nbsp;&nbsp;
        <span>Welcome, {user.name}</span>
        &nbsp;&nbsp;<Link to="" onClick={handleLogOut} >Log Out</Link>
      </>
      :
      <Link to="/auth" >Sign Up/Log In</Link>      
      }
    </nav>
  )
}
