import React from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from "../styles/Components/Countdown.module.css";

const Countdown = () => {
  // Context do countdown
  const { 
    minutes, 
    seconds, 
    isActive, 
    hasFinished, 
    startCountdown, 
    resetCountdown 
  } = React.useContext(CountdownContext);

  // Array com os dois dígitos dos minutos
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  // Array com os dois dígitos dos segundos
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span> {minuteLeft} </span>
          <span> {minuteRight} </span>
        </div>
        <span> : </span>
        <div>
          <span> {secondLeft} </span>
          <span> {secondRight} </span>
        </div>
      </div>

      {hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton} 
        > 
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
              onClick={resetCountdown}
            > 
              Abandonar ciclo 
            </button>
          ) : (
            <button 
              type="button" 
              className={styles.countdownButton} 
              onClick={startCountdown}
            > 
              Iniciar um ciclo 
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Countdown;
