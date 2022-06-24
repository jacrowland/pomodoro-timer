import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";

export function BreakControls(props) {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  };

  return <div id="break-controls">
    <h2 id="break-label">Break Length</h2>
    <div style={styles}>
      <button
        onClick={() => {
          props.decrementLength(props.breakLength, props.setBreakLength);
        }}
        id="break-decrement"
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <span className="length-label" id="break-length">
        {props.breakLength}
      </span>
      <button
        onClick={() => {
          props.incrementLength(props.breakLength, props.setBreakLength);
        }}
        id="break-increment"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  </div>;
}
