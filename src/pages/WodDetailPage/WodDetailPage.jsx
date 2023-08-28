import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as mywodsApi from '../../utilities/mywods-api';
import WodEditForm from "../../components/WodEditForm/WodEditForm";

export default function WodDetailPage({ user }) {
  const [wod, setWod] = useState(null);
  const { myWodId } = useParams();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(function() {
    async function fetchWod() {
      const fetchedWod = await mywodsApi.getWodById(myWodId);
      setWod(fetchedWod);
    }
    fetchWod();
  }, [myWodId]);

  async function handleUpdate(updatedWod) {
    const updated = await mywodsApi.updateWod(myWodId, updatedWod);
    setWod(updated);
    console.log(updated);
    setEditing(false);
  }

  async function handleDelete() {
    await mywodsApi.deleteWod(myWodId);
    navigate("/mywods");
  }

  function toggleEdit() {
    setEditing(!editing);
  }

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
      {editing && <WodEditForm wod={wod} onUpdate={handleUpdate} />}
      <button onClick={toggleEdit}>{editing ? 'Cancel' : 'Edit'}</button>
      <button onClick={handleDelete} >Delete</button>
      </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
