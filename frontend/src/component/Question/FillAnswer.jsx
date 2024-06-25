import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Question from "./Question";

export default function FillAnswer() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentIndex");
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  const [phase, setPhase] = useState("general"); // 'general' or 'gender-specific'
  const [gender, setGender] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3333/get-questions");
        const sortedQuestions = response.data.sort((a, b) => a.order - b.order);
        const GeneralQuestions = sortedQuestions
          .filter((question) => question.flow === "general")
          .filter(
            (question) => question.dependedQuestion === "" || question.dependedQuestion === null
          );
        setQuestions(GeneralQuestions);
      } catch (e) {
        console.log(e);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentIndex", currentIndex);
  }, [currentIndex]);

  const onSubmit = async (data) => {
    data.id = localStorage.getItem("user_id");
    await axios.post("http://localhost:3333/fill-answer", data);

    if (phase === "general") {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        reset();
      } else {
        console.log("All general questions answered");
        await fetchAnswers();
        navigate('/fill-answer-mode');
      }
    } else {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        reset();
      } else {
        console.log("All gender-specific questions answered");
        navigate('/other');  
      }
    }
  };

  const fetchAnswers = async () => {
    try {
      const id = localStorage.getItem("user_id");
      const response = await axios.get("http://localhost:3333/get-Answer", { params: { id } });
      response.data.forEach((dataItem) => {
        if (Array.isArray(dataItem.qa)) {
          dataItem.qa.forEach((answer) => {
            if (answer.question === "What is your current gender identity or how do you identify yourself?") {
              setGender(answer.answer);
              localStorage.setItem("gender", answer.answer);
            }
          });
        }
      });
    } catch (e) {
      console.log("err" + e);
    }
  };

  const loadGenderSpecificQuestions = async () => {
    const gender = localStorage.getItem("gender");
    try {
      const response = await axios.get("http://localhost:3333/get-questions");
      const sortedQuestions = response.data.sort((a, b) => a.order - b.order);
      const GenderQuestions = sortedQuestions
        .filter((question) => question.flow === gender)
        .filter(
          (question) => question.dependedQuestion === "" || question.dependedQuestion === null
        );
      setQuestions(GenderQuestions);
      setCurrentIndex(0);
      setPhase("gender-specific");
    } catch (e) {
      console.log(e);
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
      <h1 className="text-3xl font-bold mb-4">General Questions</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-white p-8 rounded shadow-md">

        <div className="mb-4">
          {questions.length > 0 ? (
            questions.map(
              (question, index) =>
                index === currentIndex && (
                  <div key={question.qId} className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Question: {question.question}</h2>
                    <input type="hidden" {...register("question")} value={question.question} />
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
                    {errors.Answer && <span className="text-red-500 text-xs italic">This field is required</span>}
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
