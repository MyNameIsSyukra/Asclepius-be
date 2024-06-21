const { initializeApp } = require("@firebase/app");
const { getFirestore } = require("@firebase/firestore");
const { setDoc, doc, addDoc, collection } = require("@firebase/firestore");
const firebaseConfig = require("../firebaseconfig");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storeData = async (id, data) => {
  try {
    await setDoc(doc(db, "results", id), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "results"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

module.exports = storeData;
