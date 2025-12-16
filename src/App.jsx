import { useState } from "react";
import { questions } from "./questions";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(Array(questions.length).fill(0));
  const [showScore, setShowScore] = useState(false);

  const handleScoreChange = (score) => {
    const newScores = [...scores];
    newScores[currentQuestion] = score;
    setScores(newScores);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetTest = () => {
    setScores(Array(questions.length).fill(0));
    setCurrentQuestion(0);
    setShowScore(false);
  };

  const totalScore = scores.reduce((acc, curr) => acc + curr, 0);

  const getInterpretation = (score) => {
    if (score >= 0 && score <= 21) {
      return "Low anxiety. These ups and downs are considered normal.";
    } else if (score >= 22 && score <= 35) {
      return "Moderate anxiety. Your physical symptoms may be causing you some distress. Consider seeking a professional opinion.";
    } else {
      return "High anxiety. Your physical symptoms are likely causing you significant distress. It is important to seek a professional opinion.";
    }
  };

  return (
    <div className="app-container">
      <div className="app">
        {showScore ? (
          <div className="results-section">
            <h2>Your Results</h2>
            <p>
              Your total score is: <strong>{totalScore}</strong>
            </p>
            <p>
              Interpretation: {getInterpretation(totalScore)}
            </p>
            <button onClick={resetTest}>Take Again</button>
          </div>
        ) : (
          <div className="question-section">
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
            <h2>
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <p>{questions[currentQuestion].text}</p>
            <div className="options">
              {[
                { score: 0, label: "Not at all" },
                { score: 1, label: "Mildly, but it didn’t bother me much" },
                { score: 2, label: "Moderately – it wasn’t pleasant at times" },
                { score: 3, label: "Severely – it bothered me a lot" },
              ].map(({ score, label }) => (
                <label key={score}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={score}
                    checked={scores[currentQuestion] === score}
                    onChange={() => handleScoreChange(score)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="navigation">
              <button onClick={prevQuestion} disabled={currentQuestion === 0}>
                Previous
              </button>
              <button onClick={nextQuestion}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
