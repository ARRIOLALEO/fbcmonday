import { useContext, useState } from "react";
import { GeneralAuthContext } from "./context/GeneralAuthContext";
import AddTodo from "./components/AddTodo";
import "./App.css";

function App() {
  const { singUpWithEmail, user, logOut, loginWithEmail } = useContext(GeneralAuthContext);
  const [newUser, setNewUser] = useState({ email: "", password: "" });
  const [logUser, setLogin] = useState({ email: "", password: "" });
  console.log(user);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="add your email"
          />
          <input
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="this is my Email"
          />
          <button onClick={() => singUpWithEmail(newUser.email, newUser.password)}>
            {" "}
            sign Up{" "}
          </button>
        </div>
        <div>
          <button onClick={() => logOut()}>Log out {user?.email}</button>
        </div>
        <div>
          <input
            onChange={(e) => setLogin({ ...logUser, email: e.target.value })}
            placeholder="add your email to add"
          />
          <input
            onChange={(e) => setLogin({ ...logUser, password: e.target.value })}
            placeholder="add your password"
          />
          <button onClick={() => loginWithEmail(logUser.email, logUser.password)}>
            Log me please{" "}
          </button>
        </div>
        <AddTodo />
      </header>
    </div>
  );
}

export default App;
