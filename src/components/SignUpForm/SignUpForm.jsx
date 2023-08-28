import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { signUp } from '../../utilities/users-service';

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''    
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError('');
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {      
      const user = await signUp(formData);
      setUser(user);
      // Navigate user to HomePage
      navigate("/");    
    } catch(error) {
      setError('Sign Up Failed- Please Try Again' );
      console.error(`Sign Up Error`, error);
    }
  };

  const disable = formData.password !== formData.confirm;
  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );  
}