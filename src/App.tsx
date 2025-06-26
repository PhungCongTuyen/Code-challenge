import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Problem1 from "./pages/problem1";
import Problem2 from "./pages/problem2";
import Problem3 from "./pages/problem3";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="problem-1" element={<Problem1 />} />
        <Route path="problem-2" element={<Problem2 />} />
        <Route path="problem-3" element={<Problem3 />} />
      </Route>
    </Routes>
  );
}

export default App;
