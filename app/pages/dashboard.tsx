import { initFirebase } from '../firebase/firebaseApp'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

export default function Dashboard() {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const signOut = async () => {
    auth.signOut();
  }

  const callApi = async () => {
    const token = await user?.getIdToken();
    const requestInfo = {
        headers: {
            token: "Bearer " + token,
        },
    };

    const response = await fetch('/api/hello', requestInfo);
    const responseBody = await response.json();
    console.log(responseBody);
  }

  if (loading) {
    return <div>Loadding...</div>;
  }

  if (user) {
    callApi();
    return <>
      <div>Welcome {user.displayName}</div>
      <button onClick={() => signOut()}>Sign Out!</button>
    </>
  }

  if (!user) {
    router.push('/');
  }
}
