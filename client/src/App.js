import "./App.css";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/login" element={ isAuthenticated ? <Navigate to="/" /> : <Login /> } />
        <Route path="/signup" element={ isAuthenticated ? <Navigate to="/" /> : <SignUp /> } />
      </Routes>
      
      <Toaster reverseOrder={false} /> {/*  position="top-right"  */}
    </div>
  );
}

export default App;

// FIXME: change icon -> icon-image { SearchInput.jsx }
// FIXME: change icon -> send-image { MessageInput/jsx }
