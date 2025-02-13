import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import questions from "./QuizzDataReact";
import interviewfrom from "./InterviewForm";
const QuizzResult = (props) => {
  return (
    <div className="score-section">
      <h2>Completed!</h2>
      <h4>Total Score {props.score}/30</h4>
      <h4>
        Your correct question {props.correctAns} out of {questions.length}
      </h4>
      {props.score > 20 ? (
        <Link to="/InterviewForm" className="startAgainButton">
          Schedule Time
        </Link>
      ) : (
        <Link to="/home" className="startAgainButton">
          Go to Home
        </Link>
      )}
    </div>
  );
};
export default QuizzResult;
