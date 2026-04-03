import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Layout from "./layouts/Layout";
import ExplorePage from "./pages/ExplorePage";
import ExploreCourses from "./pages/ExploreCourses";
import RegisterPage from "./pages/Register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore-course/:id" element={<ExploreCourses />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
