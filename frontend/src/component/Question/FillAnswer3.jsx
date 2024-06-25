import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FillAnswer3() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedQuestions, setAddedQuestions] = useState({});
  const [answers, setAnswers] = useState({});

  const setGeneralQuestions = (data) => {
    let data2 = data
      .filter(
        (item) =>
          item.flow === "general" &&
          (item.dependedQuestion === "" || item.dependedQuestion === null) &&
          item.optionDependent === null
      )
      .sort((a, b) => b.sr_no - a.sr_no);

    return data2;
  };

  const getQuestions = async (data) => {
    try {
      const response = await axios.get("http://localhost:3333/get-questions");
      setAllQuestions(response.data);

      // Filter questions based on general conditions
      const filteredQuestions = setGeneralQuestions(response.data);
      let filteredQuestionsArray = [...filteredQuestions];

      if (data !== undefined) {
        // Iterate through response.data to find dependent questions
        response.data.forEach((e) => {
          if (
            e.question ===
            "What is your current gender identity or how do you identify yourself?"
          ) {
            const genderIdentity = data[e.question];

            // Check for gender-specific questions
            if (genderIdentity === "female" || genderIdentity === "male") {
              response.data.forEach((genderQuestion) => {
                if (genderQuestion.flow === genderIdentity) {
                  // Find the index of the gender identity question
                  const index = filteredQuestionsArray.findIndex(
                    (q) => q.qId === e.qId
                  );
                  if (index !== -1) {
                    // Insert the gender-specific question after the gender identity question
                    filteredQuestionsArray.splice(index + 1, 0, genderQuestion);
                  }
                }
              });
            }
          }

          if (data[e.question] === "Yes") {
            response.data.forEach((e1) => {
              if (e1.dependedQuestion === e.question) {
                // Push dependent question after e.question
                const index = filteredQuestionsArray.findIndex(
                  (q) => q.qId === e.qId
                );
                if (index !== -1) {
                  filteredQuestionsArray.splice(index + 1, 0, e1);
                  setAddedQuestions((prev) => ({
                    ...prev,
                    [e.qId]: prev[e.qId] ? [...prev[e.qId], e1.qId] : [e1.qId],
                  }));
                }
              }
            });
          }

          if (e.optionDependent) {
            e.question = e.question.replace(
              /<[^>]*>/,
              `<${data[e.optionDependent]}>`
            );
          }
        });
      }

      // Update state with the final filtered questions
      setQuestions(filteredQuestionsArray);
      return filteredQuestionsArray;
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const id = localStorage.getItem("user_id");
      const response = await axios.get("http://localhost:3333/get-Answer", {
        params: { id },
      });
      const answersMap = response.data[0].qa.reduce((acc, item) => {
        acc[item.question] = item.answer;
        return acc;
      }, {});

      setAnswers(answersMap);

      return answersMap;
      // return answersMap,response.data[0].qa;
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const findFirstUnansweredIndex = (questions, answers) => {
    return questions.findIndex((question) => !answers[question.question]);
  };

  useEffect(() => {
    const initialize = async () => {
      const fetchedAnswers = await fetchAnswers();
      const fetchedQuestions = await getQuestions(fetchedAnswers);

      //  console.log(allQuestions);
      //  console.log(questions);
      //  console.log(answers);

      if (fetchedQuestions.length > 0) {
        //  console.log(fetchedAnswers);
        const unansweredIndex = findFirstUnansweredIndex(
          fetchedQuestions,
          fetchedAnswers
        );
        if (unansweredIndex !== -1) {
          // console.log(unansweredIndex);
          setCurrentIndex(unansweredIndex);
        }else{
          setCurrentIndex(fetchedQuestions.length-1)
          console.log(currentIndex);
        }
      }
    };

    initialize();
  }, []);


  const onSubmit = async (data) => {
    // data.id = localStorage.getItem("user_id");
    // await axios.post("http://localhost:3333/fill-answer", data);

    const currentQuestion = questions[currentIndex];

    const payload = {
      id: localStorage.getItem("user_id"),
      question: currentQuestion.question,
      Answer: data.Answer,
      flow: currentQuestion.answerMode,
      qId: currentQuestion.qId,
    };

    // console.log(payload);

    await axios.post("http://localhost:3333/fill-answer", payload);
    let dependentQuestions = [];

   
    // console.log(payload.flow);
    if (payload.flow === "Other") {
      questions
        .filter((qu) => qu.optionDependent === currentQuestion.question)
        .forEach((question) => {
          question.question = question.question.replace(
            /<[^>]*>/,
            `<${data.Answer}>`
          );
          // console.log(question);
        });
    }

    if (data.Answer === "Yes") {
      dependentQuestions = allQuestions.filter(
        (question) => question.dependedQuestion === currentQuestion.question
      );
      // console.log(dependentQuestions);
    }

    if (
      currentQuestion.question ===
      "What is your current gender identity or how do you identify yourself?"
    ) {
   
      let forDelete = [];
      if (payload.Answer === "male" || payload.Answer === "female") {
        dependentQuestions = allQuestions.filter(
          (question) => question.flow === payload.Answer
        );
        console.log(dependentQuestions);
        const qIdsToDelete = []; // Initialize the array to store qIds
        if (payload.Answer === "male") {
          forDelete = allQuestions.filter(
            (question) => question.flow === "female"
          );
        
          forDelete.forEach((question) => {
            qIdsToDelete.push(question.qId); // Add each qId to the qIdsToDelete array
          });
          console.log(qIdsToDelete);
          // location.reload();
        }
        if (payload.Answer === "female") {
          forDelete = allQuestions.filter(
            (question) => question.flow === "male"
          );
          // setQuestions((prevQuestions) =>
          //   prevQuestions.filter((question) => question.flow !== "female")
          // );

          forDelete.forEach((question) => {
            qIdsToDelete.push(question.qId); 
          });
          console.log(qIdsToDelete);
          // location.reload();
        }
        
        try {
          const response = await axios.post(
            "http://localhost:3333/delete-question",
            {
              id: payload.id, 
              qIds: qIdsToDelete, 
            }
          );
          console.log(response.data);
          location.reload();
        } catch (error) {
          console.error("Error deleting questions:", error);
        }
       

        
      }
    }

    
    let newQuestions = [...questions];
    
    if (payload.Answer === "No") {
      console.log(addedQuestions);
      if (addedQuestions[currentQuestion.qId]) {
        const qIdsToDelete = addedQuestions[currentQuestion.qId];
        // console.log(qIdsToDelete);
        newQuestions = newQuestions.filter(
          (q) => !qIdsToDelete.includes(q.qId)
        );
        // console.log(addedQuestions);
        try {
          const response = await axios.post(
            "http://localhost:3333/delete-question",
            {
              id: payload.id, 
              qIds: qIdsToDelete, 
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error deleting questions:", error);
        }
      }
    }

    if (data.Answer !== "No" && dependentQuestions.length > 0) {
      dependentQuestions.forEach((dependentQuestion) => {
        newQuestions.splice(currentIndex + 1, 0, dependentQuestion);
      });
      setAddedQuestions((prev) => ({
        ...prev,
        [currentQuestion.qId]: dependentQuestions.map((q) => q.qId),
      }));
      console.log(addedQuestions);
    } else {
      setAddedQuestions((prev) => {
        const newAddedQuestions = { ...prev };
        delete newAddedQuestions[currentQuestion.qId];
        return newAddedQuestions;
      });
    }

    setQuestions(newQuestions);
    console.log(newQuestions);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.question]: data.Answer,
    }));

    // const unansweredIndex = findFirstUnansweredIndex(newQuestions, {
    //   ...answers,
    //   [currentQuestion.question]: data.Answer,
    // });

    // if (unansweredIndex !== -1) {
    //   setCurrentIndex(unansweredIndex);
    // } else {
    //   console.log("All general questions answered");
    //   navigate("/dashboard");
    // }
    handleNext();
  };

  
  
  useEffect(() => {
    // Set the default value for the current question
    const currentQuestion = questions[currentIndex];
    if (currentQuestion && answers[currentQuestion.question]) {
      setValue("Answer", answers[currentQuestion.question]);
    } else {
      reset();
    }
  }, [currentIndex, questions, answers, setValue, reset]);

  const handleNext = () => {
    // setCurrentIndex((prevIndex) =>
    //   Math.min(prevIndex + 1, questions.length - 1)
    // );
    setCurrentIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    // setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">General Questions</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          {questions.length >= 0 ? (
            questions.map(
              (question, index) =>
                index === currentIndex && (
                  <div key={question.qId} className="mb-6">
                    <h2 className="text-xl font-bold mb-2">
                      Question: {question.question}
                    </h2>
                    <input
                      type="hidden"
                      {...register("question")}
                      value={question.question}
                    />
                    <input
                      type="hidden"
                      {...register("qId")}
                      value={question.qId}
                    />
                    <input
                      type="hidden"
                      {...register("flow")}
                      value={question.answerMode}
                    />
                    {question.answerMode === "TEXT-INPUT" && (
                      <input
                        type="text"
                        defaultValue={answers[question.question] || ""}
                        {...register("Answer", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    )}
                    {question.answerMode === "YES-NO" && (
                      <select
                        defaultValue={answers[question.question] || ""}
                        {...register("Answer", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    )}

                    {question.answerMode === "Other" && (
                      <select
                        defaultValue={answers[question.question] || ""}
                        {...register("Answer", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        {question.option.split(",").map((option, index) => (
                          <option key={index} value={option.trim()}>
                            {option.trim()}
                          </option>
                        ))}
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
