import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import AddCategory from "./components/AddCategory";
import AddCandidates from "./components/AddCandidates";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import LogOut from "./components/LogOut";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<ProtectedRoute />}>
        <Route exact path="/" element={<Home />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LogIn />} />
      <Route exact path="/add_category" element={<ProtectedRoute />}>
        <Route exact path="/add_category" element={<AddCategory />} />
      </Route>
      <Route exact path="/add_candidates" element={<ProtectedRoute />}>
        <Route exact path="/add_candidates" element={<AddCandidates />} />
      </Route>
      <Route exact path="/logout" element={<ProtectedRoute />}>
        <Route exact path="/logout" element={<LogOut />} />
      </Route>
    </Routes>
  );
}

export default App;
