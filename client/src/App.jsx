import { Box } from "@mui/material";
import Login from "./auth/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "./redux/actions/googleSignIn";
import Home from "./components/Home";
import EditTodoList from "./components/EditTodoList";

export default function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();


  const { userData, isLoggedIn } = useSelector((state) => state.signin || {});

  console.log("user", userData, "is", isLoggedIn)
  useEffect(() => {
    if (userData) {
      console.log("verifying token");
      localStorage.setItem("jwt", userData?.jwtToken);
    }
  }, [userData]);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      dispatch(verifyToken(token));
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <Box>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit/:id" element={ <EditTodoList /> } />
      </Routes>
    </Box>
  );
}
