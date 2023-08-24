import React from 'react';
import './HomePage.css';
import * as aiwodsApi from '../../utilities/aiwods-api';

export default function HomePage({ user }) {
  
  async function handleClick(){
    const aiWod = await aiwodsApi.createAIWod();
    console.log(aiWod);
  }
  return (
    <>
      <h1>Home WOD</h1>
      <div className='home-container'>
        <div className='wod-ai'>
          <p></p>
          <button onClick={handleClick} >Generate Wod</button>
        </div>
      </div>
    </>
  )
}
