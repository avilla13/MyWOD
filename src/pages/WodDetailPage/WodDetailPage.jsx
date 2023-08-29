import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as mywodsApi from '../../utilities/mywods-api';
import WodEditForm from "../../components/WodEditForm/WodEditForm";
import './WodDetailPage.css';

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
    <>
      <h1 className="wod-header">WodDetailPage</h1>
      <div className="wod-detail-container">
        {wod ? (
          <div className="wod-detail">
            <h3 className="wod-name">{wod.name ? wod.name : '(WOD not named)'}</h3>
            <h2 className="wod-type">{wod.type}</h2>
            <div className="wod-rounds-duration">
              {wod.rounds ? `${wod.rounds} Rounds of:` : `in ${wod.duration} minutes:`}
            </div>
            <ul className="movements-list">
              {wod.movements &&
                wod.movements.map((movement, idx) => (
                  <li key={idx} className="movement-item">
                    {movement.reps} {movement.movement}{' '}
                    {movement.weight ? `(${movement.weight})` : ''}
                  </li>
                ))}
            </ul>
            {editing && <WodEditForm wod={wod} onUpdate={handleUpdate} />}
            <div className="button-group">
              <button className="edit-button" onClick={toggleEdit}>
                {editing ? 'Cancel' : 'Edit'}
              </button>
              {editing ? 
              '' :               
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
              }
            </div>
          </div >
        ) : (
          <p className="loading-message">Loading...</p>
        )}
    </div>
  </>
  )
}
