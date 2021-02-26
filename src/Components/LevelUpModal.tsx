import React from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from "../styles/Components/LevelUpModal.module.css";

const LevelUpModal = () => {
  const { level, closeLevelUpModal } = React.useContext(ChallengeContext);

  return (
  <div className={styles.overlay}>
    <div className={styles.container}>
      <header> {level} </header>
      <strong> Parabéns </strong>
      <p> Você alcançou um novo level </p>
      <button type="button" onClick={closeLevelUpModal}>
        <img src="icons/close.svg" alt="Ícone de X para fechar o modal"/>
      </button>
    </div>
  </div>
  )
}

export default LevelUpModal;
