// lib/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API = {
  signin: `${BASE_URL}/users/signin`,
  signup: `${BASE_URL}/users/signup`,
  tweetList: `${BASE_URL}/tweet`,
  deleteTweet: `${BASE_URL}/tweet`,
  likeTweet: `${BASE_URL}/tweet/like`,
  publishTweet: `${BASE_URL}/tweet`
};