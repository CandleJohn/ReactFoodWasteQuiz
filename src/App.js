import React, { useEffect, useState } from "react";
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
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [learningPoint, setLearningPoint] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [pLeaderboard, setPLeaderboard] = useState([]);
  const [scoreMulti, setScoreMulti] = useState(1);
  const [background, setBackground] = useState(0);

  const IMAGES = [
    background_1,
    background_2,
    background_3,
    background_4
  ];

  // functions

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
    console.log(background);
    console.log(IMAGES[background]);
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
    setShowLeaderboard(false);
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
        });
      })
      .catch((error) => console.error(`Error: ${error}`));

    setShowLeaderboard(true);
  };

  return (
    <div className="App">
      <div className="Title">
      {/* 1. Header */}
      <h1>Food Quiz</h1>
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
      ) : (
        <div className="question-card">
          <h2>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </h2>
          <h3 className="question-text">
            {quizQuestions[currentQuestion].question}
          </h3>
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
        <p>{learningPoint}</p>
      </Popup>
    </div>


  );
}

export default App;
