import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewWodPage from '../NewWodPage/NewWodPage';
import WodHistoryPage from '../WodHistoryPage/WodHistoryPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <h1></h1>
      { user ?
        <>
          <Routes>          
            <Route path="/wods/new" element={<NewWodPage user={user} />} />
            <Route path="/wods" element={<WodHistoryPage user={user} />} />
          </Routes>
        </>
        :
        <>
          <Routes>          
            <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          </Routes>
        </>        
      }
    </main>
  );
}