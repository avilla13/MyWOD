// utilities/aiwods-api.js
import sendRequest from "./send-request";

// All paths here lead to: /api/aiwods
const BASE_URL = '/api/aiwods';

export function createAIWod() {
  return sendRequest(`${BASE_URL}/create`);
}