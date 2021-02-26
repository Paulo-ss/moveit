import React from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from "../styles/Components/CompletedChallenges.module.css";

const CompletedChallenges = () => {
  const { challengesCompleted } = React.useContext(ChallengeContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span> Desafios completos </span>
      <span> {challengesCompleted} </span>
    </div>
  )
}

export default CompletedChallenges;
