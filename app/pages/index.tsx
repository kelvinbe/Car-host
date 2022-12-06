import Head from 'next/head'
import Image from 'next/image'
import { initFirebase } from '../firebase/firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

export default function Home() {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  if (loading) {
    return <div>Loadding...</div>;
  }

  if (user) {
    router.push("/dashboard");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Divvly - Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://divvly.io">Divvly!</a>
        </h1>

        <p className={styles.description}>
          <button onClick={() => signIn()}>Sign In</button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
