import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pokedex</title>
        <meta name="description" content="pokedex: pokemon index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        body {
          background: #202020;
        }
      `}</style>

      <div className='justify-content-center'>
        {children}
      </div>
    </>
  )
}