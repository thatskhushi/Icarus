import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function EditQuestion4() {
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
        const response = await axios.get(
          "http://localhost:3333/get-questions2"
        );
        setQuestions(response.data);
        console.log(response.data);
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
      console.log(data.Option);
        if (Array.isArray(data.nextOptionQ)) {
            data.nextOptionQ = data.nextOptionQ.join(",");
          }
          if (Array.isArray(data.nextKeywordQ)) {
            data.nextKeywordQ = data.nextKeywordQ.join(",");
          }
          data.multipleAnswer = data.multipleAnswer === "true";
          data.display = data.display === "true";
      const response = await axios.post(
        "http://localhost:3333/edit-question2",
        data
      );
      if(response.data.message==="success"){
        alert("Question is edited");
        location.reload();
      }
      else{
        console.log(response);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  const answerMode = watch("Answer_Mode");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <table className="w-full max-w-10xl  bg-white rounded shadow-md p-4">
        <thead>
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
              <td className="p-4 text-center">{index + 1}</td>
              <td className="p-4 text-center">{question.question}</td>
              <td className="p-4 text-center">
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 p-4 overflow-auto ">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-80">
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
                      <option value="TEXT-INPUT">TEXT-INPUT</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {questions[currentIndex].answerMode === "Other" && (
                    <>
                      <div className="mb-4">
                        <label
                          htmlFor="SR_NO"
                          className="block text-gray-700 mb-2"
                        >
                          Enter Option[seperate by ","]
                        </label>
                        <input
                          type="text"
                          defaultValue={questions[currentIndex].options || ""}
                          {...register("Option")}
                          className="w-full p-2 border border-gray-300 rounded"
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor=""
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Allow multiple Answers
                        </label>
                        <label htmlFor="" className="mr-4">
                          <input
                            type="radio"
                            value="true"
                            className="mr-2"
                            {...register("multipleAnswer")}
                            defaultChecked={
                              questions[currentIndex].ismultipleanswer === 1
                            }
                          />
                          Yes
                        </label>
                        <label htmlFor="">
                          <input
                            type="radio"
                            value="false"
                            className="mr-2"
                            {...register("multipleAnswer")}
                            defaultChecked={
                              questions[currentIndex].ismultipleanswer === 0
                            }
                          />
                          No
                        </label>
                      </div>
                    </>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="nextKeywordQ"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Choose Keyword question:
                    </label>
                    <select
                      id="nextKeywordQ"
                      {...register("nextKeywordQ")}
                      multiple
                      className="w-full p-2 border border-gray-300 rounded"
                      defaultValue={
                        questions[currentIndex].nextkeywordQue || ""
                      }
                    >
                      {questions.map((q) => (
                        <option key={q.id} value={q.qId}>
                          {q.question}
                        </option>
                      ))}
                    </select>
                    
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="nextOptionQ"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Select next Option Questions :
                    </label>
                    <select
                      id="nextOptionQ"
                      {...register("nextOptionQ")}
                      className="w-full p-2 border border-gray-300 rounded"
                      multiple
                      defaultValue={questions[currentIndex].nextpotionQue || ""}
                    >
                      {questions.map((q) => (
                        <option key={q.id} value={q.qId}>
                          {q.question}
                        </option>
                      ))}
                    </select>
                   
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="Keywords"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Enter Keywords[saperated by coma]:
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-full p-2 border border-gray-300 rounded"
                      {...register("Keywords")}
                      defaultValue={questions[currentIndex].keywords || ""}
                    />
                  </div>
                 
                  <div className="mb-4">
                    <label
                      htmlFor="action"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Do you want to Set this Question Display byDefault..?
                    </label>
                    <div>
                      <label className="mr-4">
                        <input
                          type="radio"
                          value="true"
                          name="display"
                          {...register("display", {
                            required: "Action is required",
                          })}
                          className="mr-2"
                          defaultChecked={
                            questions[currentIndex].isdisplay === 1
                          }
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="false"
                          name="display"
                          {...register("display", {
                            required: "Action is required",
                          })}
                          className="mr-2"
                          defaultChecked={
                            questions[currentIndex].isdisplay === 0
                          }
                        />
                        No
                      </label>
                    </div>
                    {errors.display && (
                      <p className="text-red-500 text-xs italic">
                        {errors.display.message}
                      </p>
                    )}
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
