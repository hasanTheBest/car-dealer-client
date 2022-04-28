import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
    </Routes>
  );
}

export default App;
