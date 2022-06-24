import "./App.css";
import { useState, useEffect, useRef } from "react";
import { TimerControls } from "./Components/TimerControls";
import { Display } from "./Components/Display";
import { SessionControls } from "./Components/SessionControls";
import { BreakControls } from "./Components/BreakControls";

const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SESSION_LENGTH = 25;
const SESSION_LABEL = "Session";
const BREAK_LABEL = "Break";

function App() {
  const beepAudioClipEl = useRef(null);
  const [hasRan, setHasRan] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK_LENGTH); // in minutes
  const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_LENGTH); // in minutes
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION_LENGTH * 60); // in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [sessionLabel, setSessionLabel] = useState(SESSION_LABEL);

  const incrementLength = (state, setState) => {
    if (!isRunning) {state >= 60 ? setState(60) : setState(state + 1);}
  };

  const decrementLength = (state, setState) => {
    if (!isRunning) {state <= 1 ? setState(1) : setState(state - 1);}
  };

  const reset = () => {
    setBreakLength(DEFAULT_BREAK_LENGTH);
    setSessionLength(DEFAULT_SESSION_LENGTH);
    setTimeLeft(DEFAULT_SESSION_LENGTH * 60);
    setSessionLabel(SESSION_LABEL);
    setIsBreak(false);
    setIsRunning(false);
    setHasRan(false);
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    if (timeLeft < 1) {
      beepAudioClipEl.current.play();
      setIsRunning(false);
      const timer = setTimeout(() => {
        setIsRunning(true);
        setIsBreak(!isBreak);
        sessionLabel === BREAK_LABEL
          ? setTimeLeft(sessionLength * 60)
          : setTimeLeft(breakLength * 60);
        sessionLabel === BREAK_LABEL
          ? setSessionLabel(SESSION_LABEL)
          : setSessionLabel(BREAK_LABEL);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [
    timeLeft,
    breakLength,
    sessionLength,
    sessionLabel,
    isBreak,
    setIsBreak,
    setTimeLeft,
    setSessionLabel,
  ]);

  useEffect(() => {
    if (!isRunning && isBreak && !hasRan) {
      setTimeLeft(breakLength * 60);
    }
    if (!isRunning && !isBreak && !hasRan) {
      setTimeLeft(sessionLength * 60);
    }
  }, [sessionLength, breakLength, isBreak, isRunning, timeLeft, hasRan]);

  const styles = {
    color: "white",
    width: "100%",
    backgroundColor: "#35db53",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const setupStyle = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const play = () => {
    setHasRan(true);
    setIsRunning(!isRunning);
  };

  return (
    <div className="App" style={styles}>
      <div
        id="pomodoro-clock"
        style={{
          width: 500,
          backgroundColor: "black",
          padding: 50,
          boxShadow: "5px 5px 0px 0px white",
          border: "5px solid white",
        }}
      >
        <h1>25 + 5 Clock</h1>
        <div id="setup-controls" style={setupStyle}>
          <BreakControls decrementLength={decrementLength} breakLength={breakLength} setBreakLength={setBreakLength} incrementLength={incrementLength}/>
          <SessionControls decrementLength={decrementLength} sessionLength={sessionLength} setSessionLength={setSessionLength} incrementLength={incrementLength}/>
        </div>
        <Display timeLeft={timeLeft} />
        <TimerControls play={play} reset={reset} />

        <audio
          ref={beepAudioClipEl}
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </div>
  );
}

export default App;


