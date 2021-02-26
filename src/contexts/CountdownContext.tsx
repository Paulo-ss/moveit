import React from 'react';
import { ChallengeContext } from './ChallengeContext';

// Tipando as props
interface Props {
  children: React.ReactNode;
}

// Tipando os dados retornados pelo contexto
interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

// Criando o conexto
export const CountdownContext = React.createContext({} as CountdownContextData);

// let para armazenar countdown
let countdownTimeout: NodeJS.Timeout;

const CountdownProvider = ({children}: Props) => {
  // Dados do conexto de challenge
  const { startNewChallenge } = React.useContext(ChallengeContext);

  // Definindo o estado do countdown
  const [time, setTime] = React.useState(25 * 60);
  // Estado se o coundown está ativo ou não
  const [isActive, setIsActive] = React.useState(false);
  // Estado se o coundown finalizou
  const [hasFinished, setHasFinished] = React.useState(false);

  // Minutos e segundos do countdown
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Função para inicar o countdown
  const startCountdown = () => {
    setIsActive(true);
  }

  // Função para resetar o countdown
  const resetCountdown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
    setHasFinished(false);
  }

  // effect para diminuir os segundo do countdown
  React.useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}

export default CountdownProvider;
