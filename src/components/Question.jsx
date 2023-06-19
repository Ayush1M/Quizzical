import React from "react";
import decode from "../assets/decode";


export default function Question(props){


    function handleClick(id, selectedAnswer){
        props.setQuestions(prevQuestion => {
            return prevQuestion.map(question => {
                if(question.id === id){
                    return {...question,
                        selectedAnswer}
                }else{
                  return question
                }           
            })
        })
    }


    const answerElement = props.allAnswers.map((ans) => {

        return (
            <>
            <input 
            className="hidden"
            type="radio"
            name={props.questionId}
            id={ans.answerId}
            value={ans.answer}
            onChange={() => handleClick(props.questionId, ans.answer)}/>
            <label className={`text-lg rounded border-2 mr-4 px-4 ${props.selectedAnswer === ans.answer ? "bg-light-gray" : ""}`} htmlFor={ans.answerId}>{ans.answer}</label>
            </>
        )
    })

    return(
       <>
       <h2>{decode(props.question)}</h2>
       <div>{answerElement}</div>
       </>
    )
}