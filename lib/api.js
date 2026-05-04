// lib/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API = {
  signin: `${BASE_URL}/users/signin`,
  signup: `${BASE_URL}/users/signup`,
};