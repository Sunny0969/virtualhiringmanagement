import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const FaceMovementRecorder = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [faceDirection, setFaceDirection] = useState(null);

  useEffect(() => {
    async function loadFaceAPI() {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    }

    loadFaceAPI();
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    captureFaceMovement();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setFaceDirection(null);
  };

  const captureFaceMovement = async () => {
    if (isRecording) {
      const videoEl = webcamRef.current.video;
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 30 });
      const detection = await faceapi.detectSingleFace(videoEl, options).withFaceLandmarks().withFaceDescriptor();

      if (detection) {
        const faceLandmarks = detection.landmarks_positions;
        const noseX = faceLandmarks[10].x; // X-coordinate of the nose tip

        // Detect if the face moves left or right
        if (noseX < 100) {
          setFaceDirection('Left');
        } else if (noseX > 100) {
          setFaceDirection('Right');
        } else {
          setFaceDirection('Center');
        }
      }

      setTimeout(captureFaceMovement, 100); // Capture every 100 milliseconds
    }
  };

  return (
    <div>
      <h1>Face Movement Detector</h1>
      <Webcam
      className="faceMovement"
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
      />
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div>
        {faceDirection && <p>Face is moving: {faceDirection}</p>}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default FaceMovementRecorder;
