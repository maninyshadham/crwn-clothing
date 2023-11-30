import  {initializeApp} from 'firebase/app';
import {getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider} from 'firebase/auth';

import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDndPfvMedcI5M3Tkwqojcx_hEqypd08TE",
    authDomain: "crown-db-dc097.firebaseapp.com",
    projectId: "crown-db-dc097",
    storageBucket: "crown-db-dc097.appspot.com",
    messagingSenderId: "470762986049",
    appId: "1:470762986049:web:b6632c111f80b8317584c0"
  };
  
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt : "select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => {
    return signInWithPopup(auth,provider);
  }

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,'users',userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName , email, createdAt
            })
        } 
        catch(error){
            console.log('error creating the user')
        }
    }

    return userDocRef;
  }