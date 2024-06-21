import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "../Login/Login";
import Registration from "../Login/Registration";
import Dashboard from "../Main/Dashboard";
import Question from "../Question/Question";
import FillAnswer from "../Question/FillAnswer";
import FillAnswer_Mode from "../Question/FillAnswer_Mode";
import FillAnswer_Other from "../Question/FillAnswer_Other";
import Edit_question from "../Question/Edit_question";
import FillAnswer2 from "../Question/FillAnswer2";
import FillAnswer3 from "../Question/FillAnswer3";
import FillAnswer4 from "../Question/FillAnswer4";
import DashboardUI from "../Dashboard/DashboardUI";
export default function Routing() {
  const NotFound = () => <h1>404 Page Not Found</h1>;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.post("http://localhost:3333/get-token", {
            token,
          });
          if (response.data.message === "success") {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error during token verification:", error);
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <FillAnswer /> : <Login />}
          />

          <Route path="/user-register" element={<Registration />} />
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/set-question" element={<Question />} />
              <Route path="/edit-question" element={<Edit_question />} />
              {/* <Route path="/fill-answer" element={<FillAnswer />} /> */}
              <Route path="/fill-answer-mode" element={<FillAnswer_Mode />} />
              <Route path="/other" element={<FillAnswer_Other />} />
              <Route path="/testing" element={<FillAnswer2 />} />
              <Route path="/testing2" element={<FillAnswer3 />} />
              <Route path="/testing3" element={<FillAnswer4 />} />
              <Route path="/dashui" element={<DashboardUI />}/>
              </>
        )}
              <Route path="*" element={<NotFound />} />
            </Routes>
      </BrowserRouter>
    </>
  );
}
