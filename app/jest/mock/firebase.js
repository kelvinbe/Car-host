const initializeApp= (arg) => {}
const auth= () => ({
    signInWithEmailAndPassword: () => Promise.resolve(),
    createUserWithEmailAndPassword: () => Promise.resolve(),
    onAuthStateChanged: () => {},
    signOut: () => Promise.resolve(),
    signInWithPopup: (arg)=>{},
    signInWithCustomToken:(arg)=>{},
    getAuth: (arg)=>{},
    User: {},
    GoogleAuthProvider: {}
  })
  const firestore= () => ({
    collection: () => ({
      doc: () => ({
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
        get: () => Promise.resolve(),
        delete: () => Promise.resolve(),
      }),
      add: () => Promise.resolve(),
      get: () => Promise.resolve(),
      where: () => ({
        get: () => Promise.resolve(),
      }),
    }),
  })

  const storage= () => ({
    ref: () => ({
      child: () => ({
        put: () => Promise.resolve(),
        getDownloadURL: () => Promise.resolve('https://example.com/image.jpg'),
        delete: () => Promise.resolve(),
      }),
    }),
  })

  const getStorage= (arg)=>{}
  
  const onAuthStateChanged= () => {}
    const signOut= () => Promise.resolve()
    const signInWithPopup= (arg)=>{}
    const signInWithCustomToken=(arg)=>{}
    const getAuth= (args)=>{}
    const sendPasswordResetEmail=(...args)=>Promise.resolve()
export {
    initializeApp,
    auth,
    firestore,
    getStorage,
    storage,
    signInWithCustomToken,
    signInWithPopup,
    signOut,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
  };
  
 