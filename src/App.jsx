import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(1800);
  const [timerOn, setTimerOn] = useState(false);
  const [endTime, setEndTime] = useState(nowPlus(time));
  const resetTime = useRef(null);
  // if the timer is on
  useEffect(() => {
    if (timerOn && time != 0) {
      const timeout = setTimeout(() => {
        setTime(time - 1); // subtract 1 second
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [time, timerOn]);

  // update endTime if the timers is off
  useEffect(() => {
    if (!timerOn) {
      const timeout = setTimeout(() => {
        setEndTime(endTime + 1);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [timerOn, endTime]);

  function handleReset() {
    // get hours and minutes from time input
    const [hours, minutes] = resetTime.current.value.split(":");
    // convert to seconds
    const inSeconds = hours * 60 * 60 + minutes * 60;
    // update states
    setTime(inSeconds);
    setEndTime(nowPlus(inSeconds));
  }
  return (
    <>
      <h1>{toHHMMSS(time).string}</h1>
      <div>{toHHMMSS(endTime - 43200).string}</div>
      <button onClick={() => setTimerOn(!timerOn)}>
        {timerOn ? "Stop" : "Start"}
      </button>
      <input ref={resetTime} type="time" onChange={handleReset} />
    </>
  );
}

function nowPlus(secs) {
  let nowSecs = new Date().getTime();
  nowSecs += new Date().getTimezoneOffset() * 60 * 1000;
  return (nowSecs + secs * 1000) / 1000;
}
/**
 * Converts seconds to HH:MM:SS format
 * @param {number} secs - The number of seconds to convert
 * @returns {string} The time in HH:MM:SS format
 */
function toHHMMSS(secs) {
  // Convert secs to integer
  const sec_num = parseInt(secs, 10);
  console.log(parseInt(secs, 10));
  // Calculate hours
  const hours = Math.floor(sec_num / 3600) % 24;

  // Calculate minutes
  const minutes = Math.floor(sec_num / 60) % 60;

  // Calculate seconds
  const seconds = sec_num % 60;
  const formattedTime = { seconds, hours, minutes };
  // Format hours, minutes, and seconds to have leading zeros if necessary
  formattedTime.string = [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");

  return formattedTime;
}
export default App;
