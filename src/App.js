import './App.css';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faArrowDown, faArrowUp, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';



const DEFAULT_BREAK_LENGTH = 5;
const DEFAULT_SESSION_LENGTH = 25;
const SESSION_LABEL = 'Session';
const BREAK_LABEL = 'Break';

function App() {

  const beepAudioClipEl = useRef(null);

  const [isRunning, setIsRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK_LENGTH); // in minutes
  const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_LENGTH); // in minutes
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SESSION_LENGTH * 60); // in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [sessionLabel, setSessionLabel] = useState(SESSION_LABEL);

  const incrementLength = (state, setState) => {
    if (!isRunning) {
      state >= 60 ? setState(60) : setState(state + 1);
    }
  }

  const decrementLength = (state, setState) => {
    if (!isRunning) {
      state <= 1 ? setState(1) : setState(state - 1);
    }
  }

  const reset = () => {
    setBreakLength(DEFAULT_BREAK_LENGTH);
    setSessionLength(DEFAULT_SESSION_LENGTH);
    setTimeLeft(DEFAULT_SESSION_LENGTH * 60);
    setSessionLabel(SESSION_LABEL);
    setIsBreak(false);
    setIsRunning(false);
  }

  const toggleRun = () => {
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });




  useEffect(() => {
    const swap = () => {
      setIsBreak(!isBreak);
      sessionLabel === BREAK_LABEL ? setTimeLeft(sessionLength * 60) : setTimeLeft(breakLength * 60);
      sessionLabel === BREAK_LABEL ? setSessionLabel(SESSION_LABEL) : setSessionLabel(BREAK_LABEL);
    }

    if (timeLeft < 1) {
      // play audio
      beepAudioClipEl.current.play();
      setIsRunning(false);
      const timer = setTimeout(() => {
        setIsRunning(true);
        swap();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, setIsBreak, setTimeLeft, setSessionLabel]);

  useEffect(() => {
    if (!isRunning && isBreak) {
      setTimeLeft(breakLength * 60);
    }
    if (!isRunning && !isBreak) {
      setTimeLeft(sessionLength * 60);
    }
  }, [sessionLength, breakLength, isBreak, isRunning]);



  const formatDisplay = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}`;
  }
  
  const styles = {
    color: 'white',
    width: '100%',
    backgroundColor: '#35db53',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }

  const lengthStyle = {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const breakControlsStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }

  const setupStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const displayStyles = {
    color: timeLeft <= 0 ? 'darkRed' : 'white',
    border: '2px solid white',
    margin: 20,
    padding: 40,
    borderRadius: 20
  }

  return (
    <div className="App" style={styles}>
      <div id="pomodoro-clock" style={{width: 500, backgroundColor: 'black', padding: 50, boxShadow: '5px 5px 0px 0px white', border: '5px solid white'}}>
        <h1>25 + 5 Clock</h1>
        <div id="setup-controls" style={setupStyle}>
          <div id="break-controls" style={breakControlsStyle}>
            <h2 id="break-label">Break Length</h2>
            <div style={lengthStyle}>
              <button onClick={() => {decrementLength(breakLength, setBreakLength)}} id="break-decrement"><FontAwesomeIcon icon={faArrowDown} /></button>
              <span class='length-label' id="break-length">{breakLength}</span>
              <button onClick={() => {incrementLength(breakLength, setBreakLength)}} id="break-increment"><FontAwesomeIcon icon={faArrowUp} /></button>
            </div>
          </div>

          <div id="session-controls" style={breakControlsStyle}>
            <h2 id="session-label">Session Length</h2>
            <div style={lengthStyle}>
              <button onClick={() => {decrementLength(sessionLength, setSessionLength)}} id="session-decrement"><FontAwesomeIcon icon={faArrowDown} /></button>
              <span class='length-label' id="session-length">{sessionLength}</span>
              <button onClick={() => {incrementLength(sessionLength, setSessionLength)}} id="session-increment"><FontAwesomeIcon icon={faArrowUp} /></button>
            </div>
          </div>

        </div>

        <div id="display" style={displayStyles}>
          <h2 id="timer-label" style={{margin: 0}}>{sessionLabel}</h2>
          <p id="time-left" style={{fontSize: '3rem', fontWeight: 'bold', margin: 0}}>{formatDisplay(timeLeft)}</p>
        </div>

        <div id="timer-controls">
          <button id="start_stop" onClick={toggleRun}>
            <FontAwesomeIcon icon={faPlay} />
            <FontAwesomeIcon icon={faPause} />
          </button>
          <button id="reset" onClick={reset}><FontAwesomeIcon icon={faArrowsRotate} /></button>
        </div>

        <audio ref={beepAudioClipEl} id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>


    </div>
  );
}

export default App;
