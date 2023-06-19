import React, { useEffect, useState } from "react";
import decode from "../assets/decode";
import { nanoid } from 'nanoid'
import Question from "./Question";


export default function Quiz(){
    const [questions, setQuestions] = useState([])

    let disableBtn = questions.every((question) => question.selectedAnswer)
    


  useEffect(() => {

    async function getQuiz(){
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple")
        const data = await res.json()
        setQuestions(data.results.map((question)=> {
            const questionn = question.question

            const correctAnswer = {
                correctAnswerId : nanoid(),
                answer : decode(question.correct_answer) 
            }

            const incorrectAnswer = {
                incorrectAnswerId : nanoid(),
                answer : decode(question.incorrect_answers)
            }

            let allAnswers = []
            allAnswers.push(...question.incorrect_answers)
            allAnswers.push(question.correct_answer)
            allAnswers.sort(()=> Math.random() - 0.5)
            allAnswers = allAnswers.map((ans) => ({
                answerId: nanoid(),
                answer : decode(ans),
                correctAnswer : correctAnswer,
                incorrectAnswer : incorrectAnswer
            }))

            return{
                ...question,
                id : nanoid(),
                question : questionn,
                allAnswers : allAnswers,
                correctAnswer : correctAnswer,
                incorrectAnswer : incorrectAnswer,
                selectedAnswer : null
            }
        }))
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
        setQuestions = {setQuestions}
        />
  ))


    return(
       <>
          {quizElement}
          <button 
              disabled={!disableBtn} 
              className="block"
            >
                {disableBtn ? 
                "Check Answers" : 
                "Select your Answers"}
            </button>
        </>
    )
}