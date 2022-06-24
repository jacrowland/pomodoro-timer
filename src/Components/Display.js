export function Display(props) {
  const styles = {
    color: props.timeLeft <= 0 ? "darkRed" : "white",
    border: "2px solid white",
    margin: 20,
    padding: 40,
    borderRadius: 20,
  };

  const formatDisplay = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}`;
  };

  return (
    <div id="display" style={styles}>
      <h2 id="timer-label" style={{ margin: 0 }}>
        {props.sessionLabel}
      </h2>
      <p
        id="time-left"
        style={{ fontSize: "3rem", fontWeight: "bold", margin: 0 }}
      >
        {formatDisplay(props.timeLeft)}
      </p>
    </div>
  );
}
