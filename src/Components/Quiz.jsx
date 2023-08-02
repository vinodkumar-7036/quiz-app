import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [displayanswer, setDisplayAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple"
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
      setDisplayAnswer(questions[currentQuestion].correct_answer);
    } else {
      setErrorMessage(true);
      setDisplayAnswer(questions[currentQuestion].correct_answer);
    }
  };
  const handlePreviousQuestion = () => {
    const prevQuestion = currentQuestion + 1;
    if (prevQuestion > 0) {
      setCurrentQuestion(prevQuestion);
    }
  };
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }
  console.log("::::>", currentQuestion);
  return (
    <div className="quiz-container">
      {currentQuestion < questions.length ? (
        <>
          <div className="question-section">
            <div className="question-count">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            <div>
              {questions[currentQuestion].incorrect_answers.map((option) => (
                <button key={option} onClick={() => handleAnswerClick(option)}>
                  {option}
                </button>
              ))}
            </div>
            <div>{errorMessage && `errorMessage`}</div>
            <div>
              {displayanswer && `Your Correct answer is ${displayanswer}`}
            </div>
          </div>
          <div>
            <button onClick={handlePreviousQuestion}>Prev</button>
          </div>
          <div>
            <button onClick={handleNextQuestion}>Next</button>
          </div>
        </>
      ) : (
        <div className="score-section">
          <h2>Your Score: {score}</h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
