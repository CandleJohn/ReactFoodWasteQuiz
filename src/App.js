import React, { useState } from "react";
import "./App.css";
import quizQuestions from "./questions.js";
import Popup from "./components/Popup";
import Axios from "axios";
import background_1 from  "./images/Backgrounds/background_1.png";
import background_2 from  "./images/Backgrounds/background_2.png";
import background_3 from  "./images/Backgrounds/background_3.png";
import background_4 from  "./images/Backgrounds/background_4.png"

const url = "https://react-food-waste-quiz.herokuapp.com";

function App() {
  const [wrongPopup, setWrongPopup] = useState(false);
  const [showFinalResults, setFinalResults] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [learningPoint, setLearningPoint] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [pLeaderboard, setPLeaderboard] = useState([]);
  const [scoreMulti, setScoreMulti] = useState(1);
  const [background, setBackground] = useState(0);
  const [happy, setHappy] = useState("");
  const [sad, setSad] = useState("");

  const IMAGES = [
    background_1,
    background_2,
    background_3,
    background_4
  ];

  // functions

  const characterPicked = (character) => {
    if(character === 1){
      setHappy("./images/characters/happyBroc.png");
      setSad("./images/characters/sadBroc.png")
    }else if(character === 2){
      setHappy("./images/characters/happyCarrot.png");
      setSad("./images/characters/sadCarrot.png")
    }else if(character === 3){
      setHappy("./images/characters/happyChicken.png");
      setSad("./images/characters/sadChicken.png")
    }else{
      setHappy("./images/characters/happySteak.png");
      setSad("./images/characters/sadSteak.png")
    }

    setShowIntroduction(false);
  }

  const changeBG = () => {
    document.body.style.backgroundImage = `url("${IMAGES[background]}")`;
    setBackground(background >= 3 ? 0 : background + 1);
  }

  const answerClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10 * scoreMulti);
      setScoreMulti(scoreMulti + 1);
    } else {
      setWrongPopup(true);
      setScoreMulti(1);
    }
    if (currentQuestion + 1 < quizQuestions.length) {
      setLearningPoint(quizQuestions[currentQuestion].learningPoint);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLearningPoint(quizQuestions[currentQuestion].learningPoint);
      setFinalResults(true);
    }

    changeBG();
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
    setShowLeaderboard(false);
    setShowIntroduction(true);
    setScoreMulti(1);
    setPLeaderboard([]);
  };



  const submitInfo = () => {
    Axios.post(`${url}/insert`, {
      playerName: playerName,
      playerEmail: playerEmail,
      playerScore: score,
    })
      .then(() => {
        Axios.get(`${url}/leaderboard`).then((response) => {
          setPLeaderboard(response.data);
          console.log(response.data);
          setShowLeaderboard(true);
        });
      })
      .catch((error) => console.error(`Error: ${error}`));

    setShowLeaderboard(true);
  };

  return (
    <div className="App">
      <div className="Title">
      {/* 1. Header */}
      <h1>What a waste quiz</h1>
      {/* 2. Current Score */}
      <h2>
        Your Score: {score}
      </h2>
      <h2>Score Multiplier: {scoreMulti}x</h2>
      </div>
      {/* Preloading background images here as it is a single page app and not using components to display background
      therefore cannot use componentDidMount method to render page and preload images. */}
      <div style={{display: 'none'}}>
        <img src={IMAGES[0]}></img>
        <img src={IMAGES[1]}></img>
        <img src={IMAGES[2]}></img>
        <img src={IMAGES[3]}></img>
      </div>

      {showLeaderboard ? (
        <div className="leaderboard">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>

            <tbody>
              {pLeaderboard.map((player, index) => {
                return (
                  <tr key={player.id}>
                    <td>{index + 1}</td>
                    <td>{player.name}</td>
                    <td>{player.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={() => restartQuiz()}>Restart Game</button>
        </div>
      ) : showFinalResults ? (
        <div className="final-results">
          <h1>Add Your Score to the leaderboard</h1>
          <img src={happy}></img>
          <div className="form">
            <label>Your name:</label>
            <input
              type="text"
              name="playerName"
              required
              onChange={(e) => {
                setPlayerName(e.target.value);
              }}
            />
            <label>Email address:</label>
            <input
              type="email"
              name="playerEmail"
              required
              onChange={(e) => {
                setPlayerEmail(e.target.value);
              }}
            />
            <button onClick={() => submitInfo()}>Submit Form</button>
          </div>
          <button onClick={() => restartQuiz()}>Restart Game</button>
        </div>
      ) : showIntroduction ? (
        <div className="intro-card">
          
          <div className="intro-text">
            <h2>Welcome</h2>
            <p>
              Households in Ireland produce almost a quarter of a million tonnes of food waste each year, costing them around €700.
              Bread, vegetables, fruit and salad are the most common types of food thrown out by households. As students, we might not know 
              what the best when it comes to dates on food packaging, ugly foods, and where to store food. This quiz will teach you 
              some of these skills. Just click on a character below to start the quiz. 
            </p>
          </div>
          <div className="intro-image">
            <img src="./images/characters/happyBroc.png" alt="Brassica Broccoli" onClick={() => characterPicked(1)}></img>
            <img src="./images/characters/happyCarrot.png" alt="Cooper Carrot" onClick={() => characterPicked(2)}></img>
            <img src="./images/characters/happyChicken.png" alt="Callie Chicken" onClick={() => characterPicked(3)}></img>
            <img src="./images/characters/happySteak.png" alt="Sterling Steak" onClick={() => characterPicked(4)}></img>
          </div>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </h2>
          <h3 className="question-text">
            {quizQuestions[currentQuestion].question}
          </h3>
          <img src={quizQuestions[currentQuestion].image}></img>
          <ul>
            {quizQuestions[currentQuestion].answers.map((answer) => {
              return (
                <li
                  onClick={() => answerClicked(answer.isCorrect)}
                  key={answer.id}
                >
                  {answer.text}
                </li>
              );
            })}
          </ul>
        </div>
        
      )}

      <Popup trigger={wrongPopup} setTrigger={setWrongPopup}>
        <h3>Wrong!</h3>
        <img src={sad}></img>
        <p>{learningPoint}</p>
      </Popup>
    </div>


  );
}

export default App;
