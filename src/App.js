import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import View from "./pages/view/View";
import Home from "./pages/home/Home";
import Header from "./common/header/Header";
import Layout from "./common/layout/Layout";
import Write from "./pages/write/Write";
import Sidebar from "./common/sidebar/Sidebar";
import Update from "./pages/write/update/Update";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      {!["/user/login", "/user/register"].includes(location.pathname) && (
        <Sidebar />
      )}
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="write" element={<Write />} />
          <Route path="view/:id" element={<View />} />
          <Route path="update/:id" element={<Update />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
