import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";;

export default function AuthPage({setUser}) {
  const [isNewUser, setIsNewUser] = useState(true);

  function handleClick() {
    setIsNewUser(!isNewUser);
  }

  return (
    <>
      <h1>AuthPage</h1>
      <button onClick={handleClick}>{isNewUser ? 'Already have an account? Log in' : 'Create a new account'}</button>
      { isNewUser ?
      <>
        <SignUpForm setUser={setUser}/>
      </>  
      :
      <>
        <LoginForm setUser={setUser}/>
      </>
      }
    </>
  )
}