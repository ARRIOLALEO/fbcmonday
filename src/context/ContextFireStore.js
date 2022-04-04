import { createContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import * as firebaseApp from "../firebase/configFirebase";
export const FirebaseContext = createContext([]);

const FirebaseProvider = ({ children }) => {
  const refCollection = collection(firebaseApp.bd, "todos");
  const [allTodos, setAllTodos] = useState([]);
  const addTodo = async (newTodo) => {
    try {
      await addDoc(refCollection, { todo: newTodo });
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

  onSnapshot(doc(firebaseApp.bd, "todos", "todo"), async (doc) => {
    getAllTodos();
  });
  const deleteTodo = async (id) => {
    const todoSelected = await doc(firebaseApp.bd, "todos", id);
    const removed = await deleteDoc(todoSelected);
    console.log(removed);
  };
  useEffect(() => {
    getAllTodos();
  }, []);
  const myApp = {
    addTodo: addTodo,
    allTodos: allTodos,
    deleteTodo: deleteTodo,
  };
  return <FirebaseContext.Provider value={myApp}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
