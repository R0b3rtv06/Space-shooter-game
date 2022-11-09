import { useEffect, useState } from "react";
import deleteHighScore from "../api/deleteHighScore";
import getHighScores from "../api/getHighScores";
import updateHighScore from "../api/updateHighScore";

/**
 * React hook that fetchs the data from server
 * @returns
 */
export default function useEditScore() {
 const [isUpdating, setIsUpdating] = useState(false)
  // makes api req to edit
  const updateScore = async (id, score, deaths, kills, name) => {
    try {
      const response = await updateHighScore(id, score, deaths, kills, name);
      console.log(response)
      console.log("successfully updated the score");
      setIsUpdating(false)
    } catch (e) {
      console.log(e);
      setIsUpdating(false)
    }
  };

  return {
    isUpdating, 
    setIsUpdating,
    updateScore,
  };
}
