import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause, faArrowsRotate
} from "@fortawesome/free-solid-svg-icons";

export function TimerControls(props) {
  return (
    <div id="timer-controls">
      <button id="start_stop" onClick={props.play}>
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button id="reset" onClick={props.reset}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
}