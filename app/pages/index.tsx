import Head from 'next/head'
import Image from 'next/image'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import LoadingComponent from '../components/molecules/feedback/LoadingComponent';
import ErrorComponent from '../components/molecules/feedback/ErrorComponent';
import { app } from '../firebase/firebaseApp';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const signIn =  ( isAdmin?: boolean ) => {
    signInWithPopup(auth, provider).then((result)=>{
      if(isAdmin){
        localStorage.setItem("admin", "true")
        router.push("/dashboard")
      }else{
        router.push("/dashboard")
      }
    }).catch((e)=>{
      console.log(e)
    })
  };

  return (
    <div className="flex flex-col items-center flex-1 h-full justify-center">
        {
          loading ? <LoadingComponent/> : error ? <ErrorComponent
            error={error?.message}
          /> : <div className="flex flex-col items-center justify-center">
              <a 
                onClick={()=>signIn()}
                className="bg-blue-500 cursor-pointer mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign In with Google
              </a>
              <a 
                onClick={()=>signIn(true)}
                className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign In with Google as Admin
              </a>
          </div> 
        }
    </div>
  )
}
