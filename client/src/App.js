import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}

export default App;
