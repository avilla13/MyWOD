import React from 'react';
import { useState } from 'react';
import './HomePage.css';
import * as aiwodsApi from '../../utilities/aiwods-api';

export default function HomePage({ user }) {
  const [aiWod, setAiWod] = useState({});

  async function handleClick(){
    const response = await aiwodsApi.createAIWod();
    console.log(response.WodResult);
    console.log(response.aiGeneratedWod);
    setAiWod(response.aiGeneratedWod);
  }
  return (
    <>
      <h1>Home WOD</h1>
      <div className='home-container'>        
        <div className='wod-ai'>
          <h2>{ aiWod.type }</h2>
          { aiWod.rounds ? `${aiWod.rounds} Rounds of:` : `in ${aiWod.duration} minutes:` } <br />
          <ul>
            {aiWod.movements.map((movement, idx) => (
              <li key={idx} >
                {movement.reps} {movement.movement} {movement.weight ? `(${movement.weight})` : `` }
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleClick} >Generate WOD</button>
      </div>
    </>
  )
}
