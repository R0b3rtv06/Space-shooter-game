import useAllHighScores from "../../hooks/useAllHighScores";
import styled from "styled-components";
import bgImg from "../../assets/background.png";
import useEditScore from "../../hooks/useEditScore";
import { useState } from "react";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${bgImg});
  background-repeat: repeat;
  background-position: 0 0;
  background-size: auto 100%;
  /*adjust s value for speed*/
  animation: animatedBackground 500s linear infinite;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  
`;

const ScoreWrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  text-align: center;
  width: 275px;
  height: 80px;
  margin-bottom: 50px;
  opacity: 0.75;
  transition: all ease-in-out 300ms;
 
  //display: flex;

  p {
    margin: 0;
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Header = styled.h1`
  color: #fff;
  font-size 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
  
`;

const DeleteButton = styled.button`
  color: #fff;
  background-color: red;
  border-radius: 4px;
  padding: 0.10rem 0.10rem;
  outline: none;
  border-color: navy;
  border-style: solid;
  margin-top: 10px;
  margin-right: 2px;

  &:hover {
    cursor: pointer;
  }
  display: flex;
`;

const UpdateButton = styled.button`
  color: #fff;
  background-color: orange;
  border-radius: 4px;
  padding: 0.10rem 0.10rem;
  outline: none;
  border-color: navy;
  border-style: solid;

  &:hover {
    cursor: pointer;
  }
  display: flex;
`;
export default function HighScores() {
  const  [userScore, setUserScore] =  useState(0);
  const  [userName, setUserName] =  useState('');
  const  [userId, setUserId] =  useState('');
  const  [userKills, setUserKills] =  useState(0);
  const  [userDeaths, setUserDeaths] =  useState(0);
  // object destructuring
  const { allScores, deleteScore, isDeleting, setAllScores } = useAllHighScores();
  const {isUpdating, setIsUpdating, updateScore} = useEditScore();
  const handleSubmit = event => {
    console.log ('handleSubmit ran')
    window.location.reload()
    console.log()

    setUserScore(0);
    setUserName('');
    setUserId('');
    setUserDeaths(0);
    setUserKills(0);

    setIsUpdating(false);
    submitUpdate()
  }

  async function submitUpdate(id, score, deaths, kills, name){
    try{
      score = userScore
      name = userName
      id = userId
      deaths = userDeaths
      kills = userKills
      updateScore( id, score, deaths, kills, name )
    } catch(e){
      console.log(e)
    }
  }  
  return (
    <PageWrapper>
      <Header>Space Shooter Scores</Header>
      {allScores.map((score, i) => (
        <ScoreWrapper key={i}>
          <p>{score.name}</p>
          <p>{score.score}</p>
          <p>{score.kills}</p>
          <p>{score.deaths}</p>
          <DeleteButton
            onClick={() => {
              console.log("hit delete");
              deleteScore(score._id);
            }}
          >
            {isDeleting === true ? "Is Deleting" : "Delete"}
          
          </DeleteButton>
          <UpdateButton onClick={()=>{
            console.log('hit update')
            const id = score._id
            setAllScores(allScores.filter((score) => score._id === id));
            setIsUpdating(true);
            setUserId(score._id);
            setUserScore(score.score);
            setUserDeaths(score.deaths);
            setUserKills(score.kills);
            setUserName(score.name)
          }}>
            update 
          </UpdateButton>
          {isUpdating === true ?
            <form onSubmit={handleSubmit}>
              
              <input
                id="userName"
                name="userName"
                type="text"
                onChange={event => setUserName(event.target.value)}
                value={userName}
              />
              <input
                id="user_score"
                name="user_score"
                type="number"
                onChange={event => setUserScore(event.target.value)}
                value={userScore}
              />
              <input
                id="userkills"
                name="userkills"
                type="number"
                onChange={event => setUserKills(event.target.value)}
                value={userKills}
              />
                <input
                id="userdeaths"
                name="userdeaths"
                type="text"
                onChange={event => setUserDeaths(event.target.value)}
                value={userDeaths}
              />
              <button type='submit'> Done </button>
            </form> : null}
          
        </ScoreWrapper>
      ))}
    </PageWrapper>
  );
}
// const quecumber =''