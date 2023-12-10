import  {initializeApp} from 'firebase/app';
import {getAuth,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth';

import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDndPfvMedcI5M3Tkwqojcx_hEqypd08TE",
    authDomain: "crown-db-dc097.firebaseapp.com",
    projectId: "crown-db-dc097",
    storageBucket: "crown-db-dc097.appspot.com",
    messagingSenderId: "470762986049",
    appId: "1:470762986049:web:b6632c111f80b8317584c0",
  };
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt : "select_account"
  });

    export const auth = getAuth();
    export const signInWithGooglePopup = () => {
        return signInWithPopup(auth,googleProvider);
    }

    export const db = getFirestore();

    export const addCollectionsAndDocuments = async (collectionKey,objectsToAdd) => {
        const collectionRef = collection(db,collectionKey);
        const batch = writeBatch(db);
        objectsToAdd.forEach((object) => {
            const docRef = doc(collectionRef,object.title.toLowerCase());
            batch.set(docRef,object);
        });
        await batch.commit();
        console.log("done");
    }

    export const getCategoriesAndDocuments = async () => {
        const collectionRef = collection(db,'categories');
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);
        const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
            const {title,items} = docSnapshot.data();
            acc[title.toLowerCase()] = items;
            return acc; 
        },{});

        return categoryMap;
    }

    export const createUserDocumentFromAuth = async (userAuth,additionalInformation = {}) => {
        if(!userAuth) return;
        
        const userDocRef = doc(db,'users',userAuth.uid);
        
        const userSnapshot = await getDoc(userDocRef);
        console.log(userSnapshot);
        if(!userSnapshot.exists()){
            const {displayName, email} = userAuth;
            const createdAt = new Date();

            try{
                await setDoc(userDocRef,{
                    displayName , email, createdAt,...additionalInformation
                })
            } 
            catch(error){
                console.log('error creating the user')
            }
        }

        return userDocRef;
    }

    export const createAuthUserWithEmailAndPassword = async (email,password) => {
        if(!email || !password) return;

        return await createUserWithEmailAndPassword(auth,email,password);
    }

    export const signInAuthUserWithEmailAndPassword = async (email,password) => {
        if(!email || !password) return;

        return await signInWithEmailAndPassword(auth,email,password);
    }

    export const signOutUser = async () => {
       return await signOut(auth);
    }

    export const onAuthStateChangedListener = (callback) => {
        onAuthStateChanged(auth,callback);
    }