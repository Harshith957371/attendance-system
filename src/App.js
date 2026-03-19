import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teacher from "./Teacher";
import Scanner from "./Scanner";
import Login from "./Login";

function App() {
  return (
   <Routes>
  <Route path="/" element={<Teacher />} />
  <Route path="/teacher" element={<Teacher />} />
  <Route path="/student" element={<Scanner />} />
  <Route path="/login" element={<Login />} />
</Routes>
  );
}

export default App;