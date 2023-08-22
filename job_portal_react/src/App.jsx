import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import "./App.css";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Public from "./utils/PublicRoute";
import Private from "./utils/PrivateRoute";
import Navigationbar from "./components/Navigationbar";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currUser"));
    const token = localStorage.getItem("token");
    // console.log("after get token:", token);

    if (user && token) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token },
      });
    }
  }, []);

  // console.log("isLoggedIn: ", isLoggedIn !== null);

  return (
    <>
      <ToastContainer theme="colored" />
      <BrowserRouter>
        {isLoggedIn !== null && <Navigationbar />}
        <Routes>
          <Route
            path="/"
            element={
              <Public>
                <LandingPage />
              </Public>
            }
          />
          <Route
            path="/login"
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="/signup"
            element={
              <Public>
                <Registration />
              </Public>
            }
          />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
