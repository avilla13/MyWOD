// utilities/mywods-api.js
import sendRequest from "./send-request";

// All paths here lead to: /api/mywods
const BASE_URL = '/api/mywods';

export function getMyWods() {
  return sendRequest(`${BASE_URL}`);  
}

// export async function getMyWods() {
//   const response = await fetch(`${BASE_URL}`);
//   if (response.ok) return response.json();
//   throw new Error('Failed to fetch WODs.');
// }