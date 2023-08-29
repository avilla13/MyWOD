import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";;
import './AuthPage.css';

export default function AuthPage({setUser}) {
  const [isNewUser, setIsNewUser] = useState(true);

  function handleClick() {
    setIsNewUser(!isNewUser);
  }

  return (
    <>
      { isNewUser ?
      <>
        <br />
        <h2>Create new account and signup</h2><br />
        <SignUpForm setUser={setUser}/>
      </>  
      :
      <>
        <br />
        <h2>Login into your account</h2><br />
        <LoginForm setUser={setUser}/>
      </>
      }
      <button onClick={handleClick} className="auth-btn">{isNewUser ? 'Already a member? Click here to Log In' : 'New? Create a new account'}</button>
    </>
  )
}