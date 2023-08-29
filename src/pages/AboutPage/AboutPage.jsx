import React, { useEffect, useState } from 'react';
import './AboutPage.css';

export default function AboutPage({ user }) {
  return (
    <div className="about-page">
      <h1>About MyWOD</h1>
      <div>
        <h2>What is MyWOD?</h2>
        <p>
          MyWOD is your go-to app for generating quick and effective CrossFit Workouts of the Day (WODs). <br />
          Powered by OpenAI's third-party API, MyWOD aims to provide workout options to better achieve your fitness goals.
        </p>
      </div>
      <div>
        <h2>Benefits of CrossFit</h2>
        <ul>
          <li><strong>Full-body Workout:</strong> Engages multiple muscle groups for hypertrophic results.</li>
          <li><strong>Functional Strength:</strong> Builds strength you can use in everyday activities through compound movements.</li>
          <li><strong>Variety:</strong> Diverse exercises keep workouts engaging.</li>
        </ul>
      </div>
      <div>
        <h2>Types of WODs</h2>
        <dl>
          <dt><strong>EMOM (Every Minute On the Minute):</strong></dt>
          <dd>Perform a specific movement(s) at the start of every minute, resting until the next minute begins.</dd>
          <br />          
          <dt><strong>AMRAP (As Many Rounds As Possible):</strong></dt>
          <dd>Complete as many rounds as possible of a circuit in a given time frame.</dd>
          <br />        
          <dt><strong>For Time:</strong></dt>
          <dd>Complete the given exercises as quickly as possible.</dd>
        </dl>
      </div>
    </div>
  );
}
