import React, { useEffect, useState } from "react";
import decode from "../assets/decode";
import { nanoid } from 'nanoid'
import Question from "./Question";


export default function Quiz(){
    const [questions, setQuestions] = useState([])
    const [gameOver, setIsGameOver] = useState(true)
    let score = 0

    questions.forEach((q) => {
        q.selectedAnswer === q.correctAnswer ? score = score + 1 : score
    })
    

    let disableBtn = questions.every((question) => question.selectedAnswer)

    function checkAnswers(){
        setIsGameOver(prevState => !prevState)
    }

    function resetGame(){
        setQuestions(questions)
    }
    

  useEffect(() => {

    async function getQuiz(){
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple")
        const data = await res.json()
            
            const updatedQuestions = data.results.map((question)=> {
            const questionn = question.question

            const correctAnswer = {
                id: nanoid(),
                answer : question.correct_answer
            } 

            const incorrectAnswer = question.incorrect_answers.map((incorrect) => ({
                id : nanoid(),
                answer : incorrect
            }))

            let allAnswers = []
            allAnswers.push(...question.incorrect_answers)
            allAnswers.push(question.correct_answer)
            allAnswers.sort(()=> Math.random() - 0.5)
            allAnswers = allAnswers.map((ans) => ({
                answerId: nanoid(),
                answer : decode(ans),
            }))

            return{
                ...question,
                id : nanoid(),
                question : questionn,
                allAnswers : allAnswers,
                selectedAnswer : null,
                correctAnswer : correctAnswer.answer,
                incorrectAnswer: incorrectAnswer
            }
        })
        setQuestions(() => updatedQuestions)
    }
    console.log(questions);
   getQuiz()
  }, [])


  const quizElement = questions.map((q) => (
        <Question 
        key = {q.id}
        questionId = {q.id}
        question = {q.question}
        correctAnswer = {q.correctAnswer}
        incorrectAnswerId = {q.incorrectAnswerId}
        allAnswers = {q.allAnswers}
        selectedAnswer = {q.selectedAnswer}
        questions = {questions}
        setQuestions = {setQuestions}
        GameOver = {gameOver}
        />
  ))


    return(
       <>
       <div className="quiz-container">
        <div className="question-container">
          {quizElement}
          </div>
          {gameOver && <button 
              disabled={!disableBtn} 
              className="check-answers-btn"
              onClick={checkAnswers}
              type="submit"
            >
                {disableBtn ? 
                "Check Answers" : 
                "Select your Answers"}
            </button>}
            {!gameOver && <h2 className="score">You Scored {score} / {questions.length}</h2>}
            {!gameOver && <button className="reset-btn" onClick={resetGame}>{score === questions.length ? "New Game" : "Play Again"}</button>}
        </div>
        </>
    )
}