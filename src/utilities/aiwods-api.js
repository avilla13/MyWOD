// utilities/aiwods-api.js
import sendRequest from "./send-request";

// All paths here lead to: /api/aiwods
const BASE_URL = '/api/aiwods';

export function createAIWod() {
  return sendRequest(`${BASE_URL}/create`);
}

export async function saveAIWod(wodAndUserId) {
  try {
    const response = await fetch(`${BASE_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wodAndUserId),      
    });
    if (response.ok) {return await response.json();}
  } catch(error) {
    console.error('Error in saveAIWod (api):', error);
    throw error;
  }
}
