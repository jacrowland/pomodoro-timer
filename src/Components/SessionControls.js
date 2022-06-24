import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";

export function SessionControls(props) {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <div id="session-controls" style={styles}>
      <h2 id="session-label">Session Length</h2>
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            props.decrementLength(props.sessionLength, props.setSessionLength);
          }}
          id="session-decrement"
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <span className="length-label" id="session-length">
          {props.sessionLength}
        </span>
        <button
          onClick={() => {
            props.incrementLength(props.sessionLength, props.setSessionLength);
          }}
          id="session-increment"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
}
