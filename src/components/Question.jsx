import React from "react";
import decode from "../assets/decode";
import classNames from "classnames";

export default function Question(props) {
    
  function handleClick(id, selectedAnswer) {
    props.setQuestions((prevQuestion) => {
      return prevQuestion.map((question) => {
        if (question.id === id) {
          return { ...question, selectedAnswer };
        } else {
          return question;
        }
      });
    });
  }

  const answerElement = props.allAnswers.map((ans) => {
    return (
      <>
        <input
          
          className="answer-item"
          type="radio"
          name={props.questionId}
          id={ans.answerId}
          value={ans.answer}
          onChange={() => handleClick(props.questionId, ans.answer)}
        />
        <label
          className={classNames(
            "answer-label",
            {
              "answer-label--selected":
              props.GameOver && ans.answer === props.selectedAnswer,
            },
            {
              "answer-label--correct":
              !props.GameOver && ans.answer === props.correctAnswer,
            },
            {
              "answer-label--incorrect":
              !props.GameOver && ans.answer !== props.correctAnswer,
            },
            {
              "answer-label--unselected":
                !props.GameOver &&
                ans.answer !== props.correctAnswer &&
                ans.answer !== props.selectedAnswer,
            }
          )}
          htmlFor={ans.answerId}
        >
          {ans.answer}
        </label>
      </>
    );
  });

  return (
    <>
    <div>
      <h2 className="question-list">{decode(props.question)}</h2>
      <div className="answer-container">{answerElement}</div>
      </div>
    </>
  );
}
