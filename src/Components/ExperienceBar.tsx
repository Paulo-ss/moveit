import React from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from "../styles/Components/ExperienceBar.module.css";

const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel } = React.useContext(ChallengeContext);

  // Porcentagem pro próximo level que define
  // o tamanho da experienceBar
  const perrcentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span> 0 xp </span>
      <div>
        <div style={{ width: `${perrcentToNextLevel}%` }}></div>
        <span className={styles.currentExperience} style={{ left: `${perrcentToNextLevel}%` }}> {currentExperience} xp </span>
      </div>
      <span> {experienceToNextLevel} xp </span>
    </header>
  )
}

export default ExperienceBar;
