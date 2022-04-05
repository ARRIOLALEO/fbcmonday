import { createContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot  } from "firebase/firestore";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import * as firebaseApp from "../firebase/configFirebase";
export const FirebaseContext = createContext([]);

const FirebaseProvider = ({ children }) => {
  const refCollection = collection(firebaseApp.bd, "todos");
  const [allTodos, setAllTodos] = useState([]);


  onSnapshot(doc(firebaseApp.bd, "todos", "todo"), async (doc) => {
    getAllTodos();
  });

  const uploadImage = async(image) =>{
    try{
      const metadata = {
        contentType: 'image/jpeg',
      };
    const referenceImage = await ref(firebaseApp.storage,`images/${image}`,metadata) 
    const  imageToUpload = await uploadBytes(referenceImage,image)
    const  uploadedImage = await imageToUpload
    const url = await getDownloadURL(ref(firebaseApp.storage, `images/${image}`))
    return url
    }catch(err){
      console.log(err.message)
    }
  }
  const deleteTodo = async (id) => {
    const todoSelected = await doc(firebaseApp.bd, "todos", id);
    const removed = await deleteDoc(todoSelected);
    console.log(removed);
  };

  const addTodo = async (newTodo,image) => {
    
    try {
      const imageUrl = await uploadImage(image.name)
      await addDoc(refCollection, { todo: newTodo,url:imageUrl });
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
    uploadImage:uploadImage,
    deleteTodo: deleteTodo,
  };
  return <FirebaseContext.Provider value={myApp}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
