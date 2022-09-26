import { Routes, Route } from "react-router-dom";
import List from "./componets/List";
import "./App.css";
import Landing from "./componets/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<List />}></Route>
      </Routes>
    </div>
  );
}

export default App;
