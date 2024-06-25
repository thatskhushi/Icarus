import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FillAnswer from "../Question/FillAnswer";
import Question from "../Question/Question";
import Edit_question from "../Question/Edit_question";


export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("gender");
    localStorage.removeItem("user_id");
    localStorage.removeItem("currentIndex");
    navigate("/");
    location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 mb-6"
      >
        Log Out
      </button>
      <div className="w-full max-w-xs">
        <Link
          to="/"
          element={<FillAnswer />}
          className="block bg-blue-500 text-white py-2 px-4 rounded text-center mb-4 hover:bg-blue-600 transition duration-300"
        >
          Fill Answer
        </Link>
        <Link
          to="/set-question"
          element={<Question />}
          className="block bg-green-500 text-white py-2 px-4 rounded text-center mb-4 hover:bg-green-600 transition duration-300"
        >
          Add Question
        </Link>
        <Link
          to="/edit-question"
          element={<Edit_question />}
          className="block bg-yellow-500 text-white py-2 px-4 rounded text-center hover:bg-yellow-600 transition duration-300"
        >
          Edit Question
        </Link>
      </div>
    </div>
  );
}
