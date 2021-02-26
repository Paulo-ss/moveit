import Document, { Html, Head, Main, NextScript } from "next/document";

// O arquivo _document dentro Next, representa como se
// fosse o index.html do create-react-app. Ele será a
// estrutura base de todas as páginas do site. Tem que
// retornar um subclasse do Document do Next e, tudo o
// que for estático fica dentro dele
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        {/* O componente Head, tudo o que for colocado dentro dele,
        será colcado pelo Next na tag head do html do site */}
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          {/* O Main renderiza o app */}
          <Main />
          {/* Scripts que o Next injeta no app */}
          <NextScript />
        </body>
      </Html>
    )
  }
}
