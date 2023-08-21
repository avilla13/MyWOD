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
      <h1>MyWOD</h1>
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>          
            <Route path="/orders/new" element={<NewWodPage />} />
            <Route path="/orders" element={<WodHistoryPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}