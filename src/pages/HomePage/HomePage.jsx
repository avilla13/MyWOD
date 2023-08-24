import React from 'react';
import { useState } from 'react';
import './HomePage.css';
import * as aiwodsApi from '../../utilities/aiwods-api';

export default function HomePage({ user }) {
  const [aiWod, setAiWod] = useState(null);

  async function handleClick(){
    const response = await aiwodsApi.createAIWod();
    console.log(response.WodResult);
    setAiWod(response.WodResult);
  }
  return (
    <>
      <h1>Home WOD</h1>
      <div className='home-container'>
        <div className='wod-ai'>
          <p>{ aiWod }</p>
        </div>
        <button onClick={handleClick} >Generate WOD</button>
      </div>
    </>
  )
}
