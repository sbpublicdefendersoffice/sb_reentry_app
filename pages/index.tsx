import Head from 'next/head'

import PwaTags from '../components/PwaTags'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <>
      <PwaTags />
      <Head>
        <title>Santa Barbara Reentry</title>
      </Head>
      <main className={styles.container}>
        SB App
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img
            src="./images/vercel.svg"
            alt="Vercel Logo"
            className={styles.logo}
          />
        </a>
      </main>
    </>
  )
}

export default Home
