// utilities/mywods-api.js
import sendRequest from "./send-request";

// All paths here lead to: /api/mywods
const BASE_URL = '/api/mywods';

export function getMyWods() {
  return sendRequest(`${BASE_URL}`);  
}

export function getWodById(id) {
  return sendRequest(`${BASE_URL}/${id}`);  
}

export function updateWod(id, updatedWod) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', updatedWod);  
}

export function deleteWod(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');  
}
