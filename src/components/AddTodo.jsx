import { useContext, useState } from "react";
import { FirebaseContext } from "../context/ContextFireStore";

function AddTodo() {
  const { addTodo, allTodos, deleteTodo } = useContext(FirebaseContext);
  const [newTodo, setNewTodo] = useState("");
  const [image,setImage] = useState("")
  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="this is my new Todo"
      />{" "}
      <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
      <button onClick={() => addTodo(newTodo,image)}>Add This think to do </button>
      <div>
        {allTodos.map(({ data, id }) => {
          return (
            <div>
              <h1 onClick={() => deleteTodo(id)}> {data.todo} </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AddTodo;
