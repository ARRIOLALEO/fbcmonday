import { createContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as firebaseApp from "../firebase/configFirebase";
export const FirebaseContext = createContext([]);

const FirebaseProvider = ({ children }) => {
  const refCollection = collection(firebaseApp.bd, "todos");
  const [allTodos, setAllTodos] = useState([]);
  const [newImageUrl, setnewImageUrl] = useState("");
  const [progressImageUpload, setProgressImageUpload] = useState(0);

  onSnapshot(doc(firebaseApp.bd, "todos", "todo"), async (doc) => {
    getAllTodos();
  });

  const uploadImage = (image, todo) => {
    console.log(image);
    const referenceImage = ref(firebaseApp.storage, `images/${image.name}`);
    const uploadImage = uploadBytesResumable(referenceImage, image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.bytesTransferred);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`the image is % ${progress}`);
      },
      (err) => {
        console.log(err.message);
      },
      () =>
        getDownloadURL(uploadImage.snapshot.ref).then((url) =>
          addDoc(refCollection, { todo: todo, url: url })
        )
    );
  };
  const deleteTodo = async (id) => {
    const todoSelected = await doc(firebaseApp.bd, "todos", id);
    const removed = await deleteDoc(todoSelected);
    console.log(removed);
  };

  const addTodo = async (newTodo, image) => {
    try {
      const imageUrl = await uploadImage(image, newTodo);
    } catch (err) {
      console.log(err.message);
    }
  };
  const getAllTodos = async () => {
    const todos = await getDocs(refCollection);
    setAllTodos(
      todos.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }))
    );
  };
  useEffect(() => {
    getAllTodos();
  }, []);
  const myApp = {
    addTodo: addTodo,
    allTodos: allTodos,
    uploadImage: uploadImage,
    deleteTodo: deleteTodo,
  };
  return <FirebaseContext.Provider value={myApp}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
