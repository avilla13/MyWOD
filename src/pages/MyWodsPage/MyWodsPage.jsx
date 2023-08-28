import { checkToken } from '../../utilities/users-service';
import { useEffect, useState } from 'react';
import * as mywodsApi from '../../utilities/mywods-api';
import MyWodCard from '../../components/MyWodCard/MyWodCard';
import './MyWodsPage.css';
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
    <main>
      <h1>{ user.name }'s WODS </h1>
      <div className='myWods-grid'>
        { myWods.map((myWod, idx) => (
        <MyWodCard key={ idx } myWod={ myWod } user={ user } />
        ))}
      </div>
    </main>
  )
}