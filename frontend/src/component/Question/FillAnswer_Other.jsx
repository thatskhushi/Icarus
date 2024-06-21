import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Fill_other_Answer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentIndexOther");
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  const [dependentQuestions, setDependentQuestions] = useState({});
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const id = localStorage.getItem("user_id");
        const response = await axios.get("http://localhost:3333/get-Answer", {
          params: { id },
        });
        const newDependentQuestions = {};
        response.data.forEach((dataItem) => {
          if (Array.isArray(dataItem.qa)) {
            dataItem.qa.forEach((answer) => {
              newDependentQuestions[answer.question] =
                answer.answer === "Yes";
            });
          }
        });
        setDependentQuestions(newDependentQuestions);
      } catch (e) {
        console.log("err" + e);
      }
    };

    const fetchQuestions = async () => {
      const gender = localStorage.getItem("gender");
      try {
        const response = await axios.get("http://localhost:3333/get-questions");
        const sortedQuestions = response.data.sort((a, b) => a.order - b.order);
        const GeneralQuestions = sortedQuestions.filter(
          (question) => question.dependedQuestion !== null
        ).filter((question) => question.flow === "general" || question.flow === gender);
        setQuestions(GeneralQuestions);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAnswers();
    fetchQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentIndexOther", currentIndex);
  }, [currentIndex]);

  const onSubmit = async (data) => {
    data.id = localStorage.getItem("user_id");
    await axios.post("http://localhost:3333/fill-answer", data);

    const newAnswers = {
      ...answers,
      [questions[currentIndex].question]: data.Answer,
    };
    setAnswers(newAnswers);
    if (questions[currentIndex].dependedQuestion) {
      setDependentQuestions((prevState) => ({
        ...prevState,
        [questions[currentIndex].dependedQuestion]: data.Answer === "Yes",
      }));
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      reset();
    } else {
      console.log("All questions answered");
      navigate("/dashboard");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          {questions.length > 0 ? (
            questions.map(
              (question, index) =>
                index === currentIndex &&
                (!question.dependedQuestion ||
                  dependentQuestions[question.dependedQuestion]) && (
                  <div key={question.qId} className="mb-6">
                    <h2 className="text-xl font-bold mb-2">
                      Question: {question.question}
                    </h2>
                    <input
                      type="hidden"
                      {...register("question")}
                      value={question.question}
                    />
                    {question.answerMode === "TEXT-INPUT" ? (
                      <input
                        type="text"
                        {...register("Answer", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      <select
                        {...register("Answer", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    )}
                    {errors.Answer && (
                      <span className="text-red-500 text-xs italic">
                        This field is required
                      </span>
                    )}
                  </div>
                )
            )
          ) : (
            <p>Loading questions...</p>
          )}
        </div>

        <div className="flex justify-between">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
              disabled={isSubmitting}
            >
              Prev
            </button>
          )}
          {currentIndex < questions.length ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Next
            </button>
          ) : (
            <p>All questions answered</p>
          )}
        </div>
      </form>
    </div>
  );
}
