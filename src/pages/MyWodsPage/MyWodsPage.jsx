import { checkToken } from '../../utilities/users-service';
import { useEffect, useState } from 'react';
import * as mywodsApi from '../../utilities/mywods-api';
import MyWodCard from '../../components/MyWodCard/MyWodCard';
import './MyWodsPage.css';

export default function MyWodsPage({ user }){
  const [myWods, setMyWods] = useState([]);

  useEffect(function() {
    async function fetchMyWods() {
      const wods = await mywodsApi.getMyWods();
      setMyWods(wods);
    }
    fetchMyWods();
  }, []);

  
  return (
    <main>
      <h1>{ user.name }'s WODS </h1>
      {myWods.length ? (
      <div className='myWods-grid'>
        { myWods.map((myWod, idx) => (
        <MyWodCard key={ idx } myWod={ myWod } user={ user } />
        ))}
      </div>
      ) : 
      <h3>No WODS have been saved yet</h3>
      }
    </main>
  )
}