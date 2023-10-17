import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import ImageDetails from "./components/ImageDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/details/:id"} element={<ImageDetails />} />
      </Routes>
    </>
  );
}

export default App;
