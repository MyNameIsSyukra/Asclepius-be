const { initializeApp } = require("@firebase/app");
const { getFirestore } = require("@firebase/firestore");
const { setDoc, doc, addDoc, getDocs, collection } = require("@firebase/firestore");
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
    history: doc.data(),
  }));
  // console.log(data);
  return data;
};
// console.log(getData());

module.exports = { storeData, getData };
