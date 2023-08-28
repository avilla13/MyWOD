import { checkToken } from '../../utilities/users-service';
import { useEffect, useState } from 'react';
import * as mywodsApi from '../../utilities/mywods-api';
// import Wod from '../../../models/wod';

export default function MyWodsPage({ user }){
  const [myWods, setMyWods] = useState([]);

  useEffect(function() {
    async function fetchMyWods() {
      const wods = await mywodsApi.getMyWods();
      setMyWods(wods);
    }
    fetchMyWods();
  }, []);

  async function handleCheckToken(){
    const expDate = await checkToken();
    console.log(expDate);
  }
  return (
    <div>
      <h1>{ user.name }'s WODS </h1>
      <ul>
        {myWods.map((wod, idx) => (
          <li key={idx}>
            <div>
              {wod.name} {wod.type}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}