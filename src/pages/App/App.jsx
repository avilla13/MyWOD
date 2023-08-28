import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewWodPage from '../NewWodPage/NewWodPage';
import MyWodsPage from '../MyWodsPage/MyWodsPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import WodDetailPage from '../WodDetailPage/WodDetailPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <h1></h1>
      { user ?
        <>
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />       
            <Route path="/mywods" element={<MyWodsPage user={user} />} />
            <Route path="/mywods/new" element={<NewWodPage user={user} />} />
            <Route path="/mywods/:myWodId" element={<WodDetailPage user={user} />} />
          </Routes>
        </>
        :
        <>
          <Routes>          
            <Route path="/auth" element={<AuthPage setUser={setUser} />} />
            <Route path="/" element={<HomePage user={user} />} />
          </Routes>
        </>        
      }
    </main>
  );
}