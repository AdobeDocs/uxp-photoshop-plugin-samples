import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

const app = initializeApp(config);

const db = getFirestore(app);

async function getData() {
  try {
    const names = collection(db, process.env.COLLECTION_NAME);
    const documents = await getDocs(names);
    const list = documents.docs.map((doc) => doc.data());
    return list;
  } catch (e) {
    return e;
  }
}

export default getData;
