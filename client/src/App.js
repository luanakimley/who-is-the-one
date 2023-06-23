import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import AddCategory from "./components/AddCategory";
import AddCandidates from "./components/AddCandidates";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/add_category" element={<AddCategory />} />
      <Route path="/add_candidates" element={<AddCandidates />} />
    </Routes>
  );
}

export default App;
