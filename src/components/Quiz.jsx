import React, { useEffect, useState } from "react";
import decode from "../assets/decode";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Quiz() {
  // to show questions from API
  const [questions, setQuestions] = useState([]);
  // state to manage after the game is over
  const [gameOver, setIsGameOver] = useState(true);
  // reset the game
  const [reset, setReset] = useState(false);
  let score = 0;

  // to check each question for correct answer and update the score
  questions.forEach((q) => {
    q.selectedAnswer === q.correctAnswer ? (score = score + 1) : score;
  });

  // disable button to see if all the answers have been selected
  let disableBtn = questions.every((question) => question.selectedAnswer);

  // checking the answers when the game is over
  function checkAnswers() {
    setIsGameOver((prevState) => !prevState);
  }

  useEffect(() => {
    async function getQuiz() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
      );
      const data = await res.json();

      setQuestions(
        data.results.map((question) => {
          const questionn = question.question;

          const correctAnswer = {
            id: nanoid(),
            answer: question.correct_answer,
          };

          let allAnswers = [];
          allAnswers.push(...question.incorrect_answers);
          allAnswers.push(question.correct_answer);
          allAnswers.sort(() => Math.random() - 0.5);
          allAnswers = allAnswers.map((ans) => ({
            answerId: nanoid(),
            answer: decode(ans),
          }));

          return {
            ...question,
            id: nanoid(),
            question: questionn,
            allAnswers: allAnswers,
            selectedAnswer: null,
            correctAnswer: correctAnswer.answer,
          };
        })
      );
    }
    getQuiz();
  }, [reset]);

  // reset the game
  function resetGame() {
    setReset((prevState) => !prevState);
    setIsGameOver(true);
  }

  const quizElement = questions.map((q) => (
    <Question
      key={q.id}
      questionId={q.id}
      question={q.question}
      correctAnswer={q.correctAnswer}
      allAnswers={q.allAnswers}
      selectedAnswer={q.selectedAnswer}
      setQuestions={setQuestions}
      GameOver={gameOver}
    />
  ));

  return (
    <>
      <div className="quiz-container">
        <div className="question-container">{quizElement}</div>
        {gameOver && (
          <button
            disabled={!disableBtn}
            className="check-answers-btn"
            onClick={checkAnswers}
            type="submit"
          >
            {disableBtn ? "Check Answers" : "Select your Answers"}
          </button>
        )}
        {!gameOver && (
          <h2 className="score">
            You Scored {score} / {questions.length}
          </h2>
        )}
        {!gameOver && (
          <button className="reset-btn" onClick={resetGame}>
            {score === questions.length ? "New Game😄" : "Play Again😟"}
          </button>
        )}
      </div>
    </>
  );
}
