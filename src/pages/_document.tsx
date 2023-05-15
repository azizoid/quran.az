import { Html, Head, Main, NextScript } from 'next/document'

// eslint-disable-next-line import/no-default-export
export default function Document() {
  return (
    <Html lang="az">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="author" content="Aziz" />
        <meta httpEquiv="content-language" content="az,ru" />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap"
          rel="stylescheet"
        />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
