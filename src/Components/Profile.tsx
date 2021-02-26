import React from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from "../styles/Components/Profile.module.css";

const Profile = () => {
  const { level } = React.useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/76018697?s=460&v=4" alt="Minha foto de perfil"/>
      <div>
        <strong> Paulo Silveira </strong>
        <p>
          {/* Como a pasta icon está dentro de public, o next
          torna ela pública a todos os níveis */}
          <img src="icons/level.svg" alt="Ícone de level up"/>
          Level {level} 
        </p>
      </div>
    </div>
  )
}

export default Profile;
