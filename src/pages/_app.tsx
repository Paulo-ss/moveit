// Importando os estilos gerais
import "../styles/global.css";

// O componente app é responsável por renderizar
// todos os componentes fixos do site em todas as
// rotas do app
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
