import React, { useEffect, useState } from 'react';
import './HomePage.css';
import * as aiwodsApi from '../../utilities/aiwods-api';

export default function HomePage({ user }) {
  const [aiWod, setAiWod] = useState(null);

  async function generateAiWod(){
    const response = await aiwodsApi.createAIWod();
    console.log(response.WodResult);
    console.log(response.aiGeneratedWod);
    setAiWod(response.aiGeneratedWod);
  }
  // useEffect hook to trigger new aiWod at render
  useEffect(() => {
    generateAiWod();
  }, []);

  return (
    <>
      <h1>Home WOD</h1>
      <div className='home-container'>        
        <div className='wod-ai'>
          { aiWod ?
          <>
            <h2>{ aiWod.type }</h2>
            { aiWod.rounds ? `${aiWod.rounds} Rounds of:` : `in ${aiWod.duration} minutes:` } <br />
            <ul>
              {aiWod.movements && aiWod.movements.map((movement, idx) => (
                <li key={idx} >
                  {movement.reps} {movement.movement} {movement.weight ? `(${movement.weight})` : `` }
                </li>
              ))}
            </ul>
          </>
          :
          <h3>Click on button to Generate new WOD</h3>
          }
        </div>
        <button onClick={generateAiWod} className='generate-btn'>Generate WOD</button>
      </div>
    </>
  )
}
