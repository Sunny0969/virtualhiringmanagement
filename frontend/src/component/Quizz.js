import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './Quizz.css';
import Reactquestions from './QuizzDataReact';
import QuizzResult from './QuizzResult';

import { FaceMesh } from "@mediapipe/face_mesh";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";


const QuizzWithFaceDetection = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizStarted, setQuizStarted] = useState(false);
  const [shouldQuitQuiz, setShouldQuitQuiz] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [moveAwayCount, setMoveAwayCount] = useState(0);
  const [screenLocked, setScreenLocked] = useState(false);
  let camera = null;
  let timer;
  // let moveStartTime;
  function onResults(results) {
    // const lockDelayInSeconds = 5; // Delay in seconds before locking the screen
    if (!webcamRef.current || !webcamRef.current.video) {
      // Return or handle the case where webcamRef.current or webcamRef.current.video is null
      return;
    }

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 1) {
      // Multiple faces detected, cancel or lock the quiz
      setScreenLocked(true);
      alert("Multiple faces detected. Test locked.");
      setShowResult(true);
    } else if (results.multiFaceLandmarks && results.multiFaceLandmarks.length === 1) {
      // Single face detected, continue with the quiz
      setScreenLocked(false);
    } else {
      // No face detected or face too small, take appropriate actions
      setMoveAwayCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount >= 2 && !screenLocked) {
          // Lock the screen or take appropriate actions
          setScreenLocked(true);
          alert("You moved away from the camera too many times. Test locked.");
          setShowResult(true);
        }
        return newCount;
      });
    }
    canvasCtx.restore();
  } 
  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults(onResults);
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 200, // Adjust the width as needed
        height: 240, // Adjust the height as needed
      });
      camera.start();
    }
    if (quizStarted && !showResult && !shouldQuitQuiz) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            handleNextOption();
            return 15;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (shouldQuitQuiz) {
      // Quit the quiz if shouldQuitQuiz is true
      clearInterval(timer);
      setShowResult(true);
    }
    return () => {
      if (camera) {
        camera.stop();
      }
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentQuestion, quizStarted, showResult, shouldQuitQuiz, screenLocked, moveAwayCount]);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearInterval(timer);
      setShowResult(true);
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  const startRecording = async () => {
    setQuizStarted(true);
    try {
      await webcamRef.current.stream.getVideoTracks()[0].applyConstraints({
        advanced: [{ focusMode: 'continuous' }],
      });
    } catch (error) {
      console.error('Error applying constraints:', error);
    }
    // captureFaceMovement();
  };
  const handleStartQuiz = () => {
    startRecording();
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAns(0);
    setShowResult(false);
    setTimeLeft(15);
    setQuizStarted(false);
    // setFaceDirection(null);
  };
  const handleAnswerOption = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 5);
      setCorrectAns(correctAns + 1);
    }
    setClicked(true);
    clearInterval(timer);
    setTimeout(() => {
      handleNextOption();
    }, 90000); // Adjust the delay as needed
  };
  const handleNextOption = () => {
    setClicked(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Reactquestions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(15);
      // setFaceDirection(faceDirection);
    } else {
      setShowResult(true);
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  return (
    <div className="app">
      {showResult ? (
        <QuizzResult
          score={score}
          correctAns={correctAns}
          handlePlayAgain={handlePlayAgain}
        />
      ) : (
        <>          
        <div className="question-container">
          <div className="question-section">
            <h5>Score: {score}</h5>
            <div className="question-count">
              <span>
                <b>
                  Question {currentQuestion + 1} of {Reactquestions.length}
                </b>
              </span>
              <div className="timer">Time Left: {formatTime(timeLeft)}</div>
            </div>
            <div className="question-text">
              {Reactquestions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
    {quizStarted ? (
      <>
        {Reactquestions[currentQuestion].answerOptions.map((ans, i) => {
          return (
            <div className="button-row" key={i}>
            <button
              className={`buttonchecked ${
                clicked && ans.isCorrect ? 'correct' : 'button'
              }`}
              disabled={clicked}
              key={i}
              onClick={() => handleAnswerOption(ans.isCorrect)}
            >
              {ans.answerText}
            </button>
            </div>
          );
        })}
        <div className="actions">
          <button onClick={handlePlayAgain}>Quit</button>
          <button disabled={!clicked} onClick={handleNextOption}>
            Next
          </button>
        </div>
      </>
            ) : (
              <button onClick={handleStartQuiz}>Start Quiz</button>
            )}
          </div>
          </div>
        </>
      )}

<center>
      <div className="faceMovement">
        {screenLocked ? (
          <div>
            <p className="movementparagraph">Screen is locked. You can't take the test.</p>
          </div>
        ) : (
          <div>
            <Webcam
              ref={webcamRef}
              mirrored={true}

              style={{
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                height:"250px",
              }}
            />
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            ></canvas>
          </div>
        )}
      </div>
    </center>
    </div>
  );
};
export default QuizzWithFaceDetection;
