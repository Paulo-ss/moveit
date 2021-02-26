import React from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from "../styles/Components/ChallengeBox.module.css";
import { CountdownContext } from "../contexts/CountdownContext";

const ChallengeBox = () => {
  // Challenge ativo do momento
  const { activeChallenge, resetChallenge, completeChallenge } = React.useContext(ChallengeContext);
  // Context do countdown
  const { resetCountdown } = React.useContext(CountdownContext);

  // Função que o usuário falhar o desafio
  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  }

  // Função quando o usuário completar o desafio
  const handleChallengeSucceeded = () => {
    completeChallenge();
    resetCountdown();
  }
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header> Ganhe {activeChallenge.amount} xp </header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Ícone de exercício"/>
            <strong> Novo desafio </strong>
            <p> {activeChallenge.description} </p>
          </main>
          <footer>
            <button type="button" onClick={handleChallengeFailed} className={styles.challengeFailedButton}> Falhei </button>
            <button type="button" onClick={handleChallengeSucceeded} className={styles.challengeSucceededButton}> Completei </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Inicie e finalize um ciclo para receber um desafio
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="Ícone de level-up"/>
            Avançe de level completando desafios
          </p>
        </div>
      )} 
    </div>
  )
}

export default ChallengeBox;
