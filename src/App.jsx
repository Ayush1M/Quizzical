import React from "react"
import { Routes, Route } from "react-router-dom"
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"

function App() {
 

  return (
    <>
     <>
      <Routes>
        <Route>
          <Route path="/" element={ <Welcome /> } />
          <Route path="/quiz" element={ <Quiz /> } />
        </Route>
      </Routes>
    </>
    </>
  )
}

export default App
