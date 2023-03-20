import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ElectionList from "./components/Elections/ElectionList";
import ElectionState from "./components/context/ElectionState";

function App() {
  return (
    <ElectionState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<ElectionList />} />
        </Routes>
      </Router>
    </ElectionState>
  );
}

export default App;
