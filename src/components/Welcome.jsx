import React from "react";
import { Link } from "react-router-dom";

export default function Welcome(){
    return(
        <div className="welcome-container">
        <h1 className="title">Quizzical</h1>
        <h2 className="title-headline">Place to test your Knowledge</h2>
        <Link to="/quiz" className="btn">Start</Link>
        </div>
    )
}