import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as mywodsApi from '../../utilities/mywods-api';

export default function WodDetailPage({ user }) {
  const [wod, setWod] = useState(null);
  let { myWodId } = useParams();

  useEffect(function() {
    async function fetchWod() {
      const fetchedWod = await mywodsApi.getWodById(myWodId);
      setWod(fetchedWod);
    }
    fetchWod();
  }, [myWodId]);

  return (
    <div>
      <h1>WodDetailPage</h1>
      { wod ? (
      <>
      <h3>{wod.name ? wod.name :`(WOD not named)` }</h3>
      <h2>{wod.type} </h2>
      <div>{ wod.rounds ? `${wod.rounds} Rounds of:` : `in ${wod.duration} minutes:` }</div>
      <ul>
        {wod.movements && wod.movements.map((movement, idx) => (
          <li key={idx} >
            {movement.reps} {movement.movement} {movement.weight ? `(${movement.weight})` : `` }
          </li>
        ))}
      </ul>
      </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
