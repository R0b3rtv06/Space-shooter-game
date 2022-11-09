import axios from "axios";
import { API_URL } from "../constants";

/**
 * Make api request for all the users' scores
 * @returns
 */
export default function updateHighScore(id, score, deaths, kills, name) {
  const data = {
    _id: id, 
    score: score,
    deaths: deaths,
    kills: kills,
    name: name,
  }
    const url = API_URL + "/update-score" ;
  return axios.put(url, data)
}