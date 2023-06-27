import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import AddCategory from "./components/AddCategory";
import DeleteCategory from "./components/Delete";
import AddCandidates from "./components/AddCandidates";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Search from "./components/Search";
import Match from "./components/Match";
import SuccessMessage from "./components/SuccessMessage";
import AddCandidateTags from "./components/AddCandidateTags";
import Categories from "./components/Categories";
import Tags from "./components/Tags";
import UserPreferences from "./components/UserPreferences";
import EditPassword from "./components/EditPassword";
import ProfilePage from "./components/ProfilePage";

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
      <Route exact path="/delete_category" element={<DeleteCategory />} />
      <Route exact path="/add_candidates" element={<ProtectedRoute />}>
        <Route exact path="/add_candidates" element={<AddCandidates />} />
      </Route>
      <Route exact path="/add_candidate_tags" element={<ProtectedRoute />}>
        <Route
          exact
          path="/add_candidate_tags"
          element={<AddCandidateTags />}
        />
      </Route>
      <Route exact path="/categories" element={<ProtectedRoute />}>
        <Route exact path="/categories" element={<Categories />} />
      </Route>
      <Route exact path="/tags" element={<ProtectedRoute />}>
        <Route exact path="/tags" element={<Tags />} />
      </Route>
      <Route exact path="/user_preferences" element={<ProtectedRoute />}>
        <Route exact path="/user_preferences" element={<UserPreferences />} />
      </Route>
      <Route exact path="/search" element={<ProtectedRoute />}>
        <Route exact path="/search" element={<Search />} />
      </Route>
      <Route exact path="/match" element={<ProtectedRoute />}>
              <Route exact path="/match" element={<Match />} />
            </Route>
      <Route exact path="/success_message" element={<ProtectedRoute />}>
        <Route exact path="/success_message" element={<SuccessMessage />} />
      </Route>
      <Route exact path="/edit_password" element={<ProtectedRoute />}>
              <Route exact path="/edit_password" element={<EditPassword />} />
      </Route>
      <Route exact path="/profile_page" element={<ProtectedRoute />}>
                    <Route exact path="/profile_page" element={<ProfilePage />} />
            </Route>
    </Routes>
  );
}

export default App;
