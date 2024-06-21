import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function EditQuestion() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false); // Add state to control whether to show the edit form

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3333/get-questions");
        setQuestions(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchQuestions();
  }, []);

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setShowEditForm(true); // Show the edit form when edit button is clicked
  };

  const registration = async (data) => {
    try {
      const questionData = Object.values(data.questions).map((q) => ({
        ID: q.ID,
        question: q.question,
        flow: q.flow,
        dependencies: q.dependencies,
        Answer_Mode: q.Answer_Mode,
      }));
      console.log(questionData);
      // Example for sending the first question (modify as needed)
      const response = await axios.post(
        "http://localhost:3333/edit-question",
        questionData[0]
      );
      alert("Question is edited");
      location.reload();
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {showEditForm ? (
        <form
          onSubmit={handleSubmit(registration)}
          className="w-full max-w-3xl bg-white p-8 rounded shadow-md"
        >
          {/* Your existing form code */}
        </form>
      ) : (
        <table className="w-full max-w-3xl bg-white p-8 rounded shadow-md">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.qId}>
                <td>{question.qId}</td>
                <td>{question.question}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showEditForm && (
        <>
        
        </>
      )}
    </div>
  );
}
