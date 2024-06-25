import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function EditQuestion() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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
    setSelectedQuestion(questions[index]);
    setShowModal(true);
  };

  const handleCancle = () => {
    setCurrentIndex(null);
    setSelectedQuestion(null);
    setShowModal(false);
    reset();
  };

  const registration = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3333/edit-question",
        data
      );
      alert("Question is edited");
      location.reload();
    } catch (e) {
      console.log("error", e);
    }
  };
  const answerMode = watch("Answer_Mode");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <table className="w-full max-w-10xl  bg-white rounded shadow-md p-4">
        <thead >
          <tr>
            {/* <th className="py-2">ID</th> */}
            <th className="py-2">Sr_No</th>
            <th className="py-2">Question</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question.qId} className="border-t">
              {/* <td className="py-2">{question.qId}</td> */}
              <td className="p-4">{index+1}</td>
              <td className="p-4">{question.question}</td>
              <td className="p-4">
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 p-4 overflow-auto">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <form onSubmit={handleSubmit(registration)}>
              {questions.length > 0 && (
                <div key={questions[currentIndex].qId}>
                  <h3 className="text-xl font-bold mb-4">
                    Question ID: {questions[currentIndex].qId}
                    <input
                      type="hidden"
                      defaultValue={questions[currentIndex].qId}
                      {...register("ID")}
                    />
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="question"
                      className="block text-gray-700 mb-2"
                    >
                      Question
                    </label>
                    <textarea
                      id="question"
                      rows="3"
                      defaultValue={questions[currentIndex].question}
                      {...register("question")}
                      className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="SR_NO" className="block text-gray-700 mb-2">
                      SR_NO
                    </label>
                    <input
                      type="number"
                      defaultValue={questions[currentIndex].srNo}
                      {...register("SR_NO")}
                      className="w-full p-2 border border-gray-300 rounded"
                    ></input>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="flow" className="block text-gray-700 mb-2">
                      Flow
                    </label>
                    <select
                      id="flow"
                      defaultValue={questions[currentIndex].flow || ""}
                      {...register("flow")}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Answer_Mode"
                      className="block text-gray-700 mb-2"
                    >
                      Answer Mode
                    </label>
                    <select
                      id="Answer_Mode"
                      defaultValue={questions[currentIndex].answerMode || ""}
                      {...register("Answer_Mode")}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="YES-NO">YES-NO</option>
                      <option value="TEXT-INPUT">TEXT-INPUT</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {answerMode === "Other" && (
                    <div className="mb-4">
                      <label
                        htmlFor="SR_NO"
                        className="block text-gray-700 mb-2"
                      >
                        Enter Option[seperate by ","]
                      </label>
                      <input
                        type="text"
                        defaultValue={questions[currentIndex].option|| ""}
                        {...register("Option")}
                        className="w-full p-2 border border-gray-300 rounded"
                      ></input>
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      htmlFor="dependencies"
                      className="block text-gray-700 mb-2"
                    >
                      Dependent Question
                    </label>
                    <select
                      id="dependencies"
                      defaultValue={
                        questions[currentIndex].dependedQuestion || ""
                      }
                      {...register("dependencies")}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">No dependencies</option>
                      {questions.map(
                        (q) =>
                          questions[currentIndex].qId !== q.qId && (
                            <option key={q.qId} value={q.question}>
                              {q.question}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="dependencies"
                      className="block text-gray-700 mb-2"
                    >
                     Option Dependent Question
                    </label>
                    <select
                      id="dependencies"
                      defaultValue={
                        questions[currentIndex].optionDependent || ""
                      }
                      {...register("optionDependencies")}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">No dependencies</option>
                      {questions.map(
                        (q) =>
                          questions[currentIndex].qId !== q.qId && (
                            <option key={q.qId} value={q.question}>
                              {q.question}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancle()}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
