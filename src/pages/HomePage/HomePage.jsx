import React, { useEffect, useState } from 'react';
import './HomePage.css';
import * as aiwodsApi from '../../utilities/aiwods-api';

export default function HomePage({ user }) {
  const [aiWod, setAiWod] = useState(null);
  
  // useEffect hook to trigger new aiWod at render
  useEffect(() => {
    generateAiWod();
  }, []);

  async function saveAiWod(){
    try {
      const response = await aiwodsApi.saveAIWod({ wod: aiWod, userId: user._id });
      alert('WOD successfully saved to your WODS!')
    } catch (error) {
      console.error('Oops! Error in saving WOD:', error);
      alert('Failed to save :(');
    }
  }

  async function generateAiWod(){
    const response = await aiwodsApi.createAIWod();
    // console.log(response.WodResult);
    setAiWod(response.aiGeneratedWod);
  }

  return (
    <>
      <h1>Home WOD</h1>
      <div className='home-container'>        
        <div className='wod-ai'>
          { aiWod ?
          <>
            <h2>{ aiWod.type }</h2>
            <div>{ aiWod.rounds ? `${aiWod.rounds} Rounds of:` : `in ${aiWod.duration} minutes:` }</div>
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
        {user ? 
          <button onClick={saveAiWod} className='save-btn'>Save WOD</button>        
        :        
          ''        
        }
      </div>
    </>
  )
}
