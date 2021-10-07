import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(config);

const db = getFirestore(app);

async function getData() {
  try {
    const names = collection(db, "questionNames");
    const documents = await getDocs(names);
    const list = documents.docs.map((doc) => doc.data());
    return list;
  } catch (e) {
    return e;
  }
}

export default getData;
