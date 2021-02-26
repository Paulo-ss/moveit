import CompletedChallenges from "../Components/CompletedChallenges";
import Countdown from "../Components/Countdown";
import ExperienceBar from "../Components/ExperienceBar";
import Profile from "../Components/Profile";
import styles from "../styles/Pages/Home.module.css";
import Head from "next/head";
import ChallengeBox from "../Components/ChallengeBox";
import CountdownProvider from "../contexts/CountdownContext";
// TIpagem do Next.js
import { GetServerSideProps } from "next";
// Contexto de challenges
import ChallengesProvider from "../contexts/ChallengeContext";

// Tipagem das props
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

// O index.js retorna o HTML que será carregado
// como a home do site
export default function Home({ 
  level, 
  currentExperience, 
  challengesCompleted
}: HomeProps) {
  return (
    <ChallengesProvider 
      level={level} 
      currentExperience={currentExperience} 
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        {/* Definindo o título de página */}
        <Head>
          <title> Início | move.it </title>
        </Head>

        <ExperienceBar />

        {/* Context do countdown */}
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // A função de SSR do Next recebe como argumento
  // o context. Através dele, é possível acesar os
  // cookies da aplicação
  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
