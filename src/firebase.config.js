import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJv5DzCuuZGcsjeMHZzmfas_3Z35wWLGM',
  authDomain: 'fir-project-7ce25.firebaseapp.com',
  projectId: 'fir-project-7ce25',
  storageBucket: 'fir-project-7ce25.appspot.com',
  messagingSenderId: '911862072463',
  appId: '1:911862072463:web:b8de847140163a10ce1cfa',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
