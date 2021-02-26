import React from "react";
// JSON com uma array com os challenges
import challenges from "../../challenges.json";
// Library externa para facilitar a manipulação
// de cookies do navegador
import Cookies from "js-cookie";
import LevelUpModal from "../Components/LevelUpModal";

// Tipagem das props do componente
interface ChallengesProviderProps {
  children: React.ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

// Tipagem dos dados do objeto de um desafio
interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

// Tipagem do value do context
interface ChallengeContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () =>  void;
  closeLevelUpModal: () => void;
}

// Criando o contexto
export const ChallengeContext = React.createContext({} as ChallengeContextData);

// Componente com o provider do contexto
// renderizando as children
const ChallengesProvider = ({ 
  children,
  ...rest
}: ChallengesProviderProps) => {
  // Estado do level do usuário
  const [level, setLevel] = React.useState(rest.level ?? 1);
  // Estado da experienca atual do usuário
  const [currentExperience, setCurrentExperience] = React.useState(rest.currentExperience ?? 0);
  // Estado com o total de desafios completados
  const [challengesCompleted, setChallengesCompleted] = React.useState(rest.challengesCompleted ?? 0);
  // Estado do desafio atual
  const [activeChallenge, setActiveChallenge] = React.useState(null);
  // Estado do modal de level up
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = React.useState(false);

  // Quanto de xp falta para o próximo level
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  // effect para pedir permissão para o
  // usuário pra mostrar notificações
  React.useEffect(() => {
    // Esse método do construtor Notification faz
    // aquele mensagem de notificações do browser
    // aparecer
    Notification.requestPermission();
  }, []);

  // effect para salvar os dados do usuário nos cookies
  React.useEffect(() => {
    // usando a library js-cookies para salvar os cookies
    // O set recebe o nome da cookie e depois seu valor
    Cookies.set("level", JSON.stringify(level));
    Cookies.set("currentExperience", JSON.stringify(currentExperience));
    Cookies.set("challengesCompleted", JSON.stringify(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  // Função que fecha o modal de levelUp
  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  }

  // Função que aumenta um level
  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  // Função que através de um index aleatório,
  // retorna um challenge e joga pro estado
  // do challenge ativo do momento
  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    // Tocando um audio quando um novo desafio
    // for iniciado. Audio é uma API nativa do
    // browser, e recebe como arg o arquivo de
    // som, o o play() é o método que toca esse
    // arquivo
    new Audio('/notification.mp3').play();

    // Se o usuário der permissões para enviar
    // notificações, uma notificação no sistema é
    // disparada toda vez que um novo desafio
    // for iniciado
    if (Notification.permission === "granted") {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} de XP`,
      })
    }
  }

  // Função que reseta o challenge quando
  // o usuário falhar
  const resetChallenge = () => {
    setActiveChallenge(null);
  }

  // Função quando um challenge é completado
  const completeChallenge = () => {
    if (!activeChallenge) {
      return;
    }

    // Quantidade de XP que o desafio da
    const { amount } = activeChallenge;

    // Experience do usuário de depois que
    // o desafio for completado
    let finalExperience = currentExperience + amount;

    // Upando o usuário de level
    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    // Atualizando a XP atual do usuário
    setCurrentExperience(finalExperience);
    // Removendo o desafio
    setActiveChallenge(null);
    // Atualizando o valor de desafios totais completados
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengeContext.Provider value={{ 
      level, 
      levelUp, 
      currentExperience,
      experienceToNextLevel,
      challengesCompleted, 
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal,
    }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
};

export default ChallengesProvider;
