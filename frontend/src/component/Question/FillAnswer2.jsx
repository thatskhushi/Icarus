// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";

// export default function FillAnswer2() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [addedQuestions, setAddedQuestions] = useState({});
//   const [answers, setAnswers] = useState({});

//   const displayQu1 = (data) => {
//     return data
//       .filter(
//         (item) =>
//           item.flow === "general" &&
//           (item.dependedQuestion === "" || item.dependedQuestion === null)
//       )
//       .sort((a, b) => a.sr_no - b.sr_no);
//   };

//   const getQuestions = async () => {
//     try {
//       const response = await axios.get("http://localhost:3333/get-questions");
//       setAllQuestions(response.data);
//       const filteredQuestions = displayQu1(response.data);
//       setQuestions(filteredQuestions);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const fetchAnswers = async () => {
//     try {
//       const id = localStorage.getItem("user_id");
//       const response = await axios.get("http://localhost:3333/get-Answer", {
//         params: { id },
//       });
//       const answersMap = response.data[0].qa.reduce((acc, item) => {
//         acc[item.question] = item.answer;
//         return acc;
//       }, {});
//       setAnswers(answersMap);
//       console.log(answersMap);
//     } catch (error) {
//       console.error("Error fetching answers:", error);
//     }
//   };

//   useEffect(() => {
//     getQuestions();
//     fetchAnswers();
//   }, []);

//   const onSubmit = async (data) => {
//     data.id = localStorage.getItem("user_id");
//     await axios.post("http://localhost:3333/fill-answer", data);

//     const currentQuestion = questions[currentIndex];
//     let dependentQuestions = [];

//     if (data.Answer === "Yes") {
//       dependentQuestions = allQuestions.filter(
//         (question) => question.dependedQuestion === currentQuestion.question
//       );
//     }

//     if (
//       currentQuestion.question ===
//       "What is your current gender identity or how do you identify yourself?"
//     ) {
//       if (data.Answer === "male" || data.Answer === "female") {
//         dependentQuestions = allQuestions.filter(
//           (question) => question.flow === data.Answer
//         );
//       }
//     }

//     // Remove any previously added dependent questions
//     let newQuestions = [...questions];
//     if (addedQuestions[currentQuestion.qId]) {
//       addedQuestions[currentQuestion.qId].forEach((qId) => {
//         newQuestions = newQuestions.filter((q) => q.qId !== qId);
//       });
//     }

//     if (data.Answer !== "No" && dependentQuestions.length > 0) {
//       dependentQuestions.forEach((dependentQuestion) => {
//         newQuestions.splice(currentIndex + 1, 0, dependentQuestion);
//       });
//       setAddedQuestions((prev) => ({
//         ...prev,
//         [currentQuestion.qId]: dependentQuestions.map((q) => q.qId),
//       }));
//     } else {
//       setAddedQuestions((prev) => {
//         const newAddedQuestions = { ...prev };
//         delete newAddedQuestions[currentQuestion.qId];
//         return newAddedQuestions;
//       });
//     }

//     setQuestions(newQuestions);

//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion.question]: data.Answer,
//     }));

//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//       reset();
//     } else {
//       console.log("All general questions answered");
//       // await fetchAnswers(); // Uncomment if you want to fetch answers or perform other actions
//       // navigate("/dashboard"); // Uncomment if you have a routing setup and want to navigate
//     }
//   };

//   useEffect(() => {
//     // Set the default value for the current question
//     const currentQuestion = questions[currentIndex];
//     if (currentQuestion && answers[currentQuestion.question]) {
//       setValue("Answer", answers[currentQuestion.question]);
//     } else {
//       reset();
//     }
//   }, [currentIndex, questions, answers, setValue, reset]);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       Math.min(prevIndex + 1, questions.length - 1)
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4">General Questions</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-lg bg-white p-8 rounded shadow-md"
//       >
//         <div className="mb-4">
//           {questions.length > 0 ? (
//             questions.map(
//               (question, index) =>
//                 index === currentIndex && (
//                   <div key={question.qId} className="mb-6">
//                     <h2 className="text-xl font-bold mb-2">
//                       Question: {question.question}
//                     </h2>
//                     <input
//                       type="hidden"
//                       {...register("question")}
//                       value={question.question}
//                     />
//                     {question.answerMode === "TEXT-INPUT" && (
//                       <input
//                         type="text"
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       />
//                     )}
//                     {question.answerMode === "YES-NO" && (
//                       <select
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       >
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                       </select>
//                     )}

//                     {question.answerMode === "Other" && (
//                       <select
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       >
//                         {question.option.split(",").map((option, index) => (
//                           <option key={index} value={option.trim()}>
//                             {option.trim()}
//                           </option>
//                         ))}
//                       </select>
//                     )}

//                     {errors.Answer && (
//                       <span className="text-red-500 text-xs italic">
//                         This field is required
//                       </span>
//                     )}
//                   </div>
//                 )
//             )
//           ) : (
//             <p>Loading questions...</p>
//           )}
//         </div>

//         <div className="flex justify-between">
//           {currentIndex > 0 && (
//             <button
//               type="button"
//               onClick={handlePrev}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
//               disabled={isSubmitting}
//             >
//               Prev
//             </button>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";

// export default function FillAnswer2() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [addedQuestions, setAddedQuestions] = useState({});
//   const [answers, setAnswers] = useState({});

//   const displayQu1 = (data) => {
//     return data
//       .filter(
//         (item) =>
//           item.flow === "general" &&
//           (item.dependedQuestion === "" || item.dependedQuestion === null)
//       )
//       .sort((a, b) => a.sr_no - b.sr_no);
//   };

//   const getQuestions = async () => {
//     try {
//       const response = await axios.get("http://localhost:3333/get-questions");
//       setAllQuestions(response.data);
//       const filteredQuestions = displayQu1(response.data);
//       setQuestions(filteredQuestions);
//       return filteredQuestions;
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const fetchAnswers = async () => {
//     try {
//       const id = localStorage.getItem("user_id");
//       const response = await axios.get("http://localhost:3333/get-Answer", {
//         params: { id },
//       });
//       const answersMap = response.data[0].qa.reduce((acc, item) => {
//         acc[item.question] = item.answer;
//         return acc;
//       }, {});
//       setAnswers(answersMap);
//       return answersMap;
//     } catch (error) {
//       console.error("Error fetching answers:", error);
//     }
//   };

//   const findFirstUnansweredIndex = (questions, answers) => {
//     return questions.findIndex((question) => !answers[question.question]);
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       const fetchedQuestions = await getQuestions();
//       const fetchedAnswers = await fetchAnswers();

//       // Set the current index to the first unanswered question
//       const unansweredIndex = findFirstUnansweredIndex(fetchedQuestions, fetchedAnswers);
//       if (unansweredIndex !== -1) {
//         setCurrentIndex(unansweredIndex);                
//       }
//     };

//     initialize();
//   }, []);

//   const onSubmit = async (data) => {
//     data.id = localStorage.getItem("user_id");
//     await axios.post("http://localhost:3333/fill-answer", data);

//     const currentQuestion = questions[currentIndex];
//     let dependentQuestions = [];

//     if (data.Answer === "Yes") {
//       dependentQuestions = allQuestions.filter(
//         (question) => question.dependedQuestion === currentQuestion.question
//       );
//     }

//     if (
//       currentQuestion.question ===
//       "What is your current gender identity or how do you identify yourself?"
//     ) {
//       if (data.Answer === "male" || data.Answer === "female") {
//         dependentQuestions = allQuestions.filter(
//           (question) => question.flow === data.Answer
//         );
//       }
//     }

//     // Remove any previously added dependent questions
//     let newQuestions = [...questions];
//     if (addedQuestions[currentQuestion.qId]) {
//       addedQuestions[currentQuestion.qId].forEach((qId) => {
//         newQuestions = newQuestions.filter((q) => q.qId !== qId);
//       });
//     }

//     if (data.Answer !== "No" && dependentQuestions.length > 0) {
//       dependentQuestions.forEach((dependentQuestion) => {
//         newQuestions.splice(currentIndex + 1, 0, dependentQuestion);
//       });
//       setAddedQuestions((prev) => ({
//         ...prev,
//         [currentQuestion.qId]: dependentQuestions.map((q) => q.qId),
//       }));
//     } else {
//       setAddedQuestions((prev) => {
//         const newAddedQuestions = { ...prev };
//         delete newAddedQuestions[currentQuestion.qId];
//         return newAddedQuestions;
//       });
//     }

//     setQuestions(newQuestions);

//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion.question]: data.Answer,
//     }));

//     const unansweredIndex = findFirstUnansweredIndex(newQuestions, {
//       ...answers,
//       [currentQuestion.question]: data.Answer,
//     });

//     if (unansweredIndex !== -1) {
//       setCurrentIndex(unansweredIndex);
//     } else {
//       console.log("All general questions answered");
//       // await fetchAnswers(); // Uncomment if you want to fetch answers or perform other actions
//       // navigate("/dashboard"); // Uncomment if you have a routing setup and want to navigate
//     }
//   };

//   useEffect(() => {
//     // Set the default value for the current question
//     const currentQuestion = questions[currentIndex];
//     if (currentQuestion && answers[currentQuestion.question]) {
//       setValue("Answer", answers[currentQuestion.question]);
//     } else {
//       reset();
//     }
//   }, [currentIndex, questions, answers, setValue, reset]);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       Math.min(prevIndex + 1, questions.length - 1)
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4">General Questions</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-lg bg-white p-8 rounded shadow-md"
//       >
//         <div className="mb-4">
//           {questions.length > 0 ? (
//             questions.map(
//               (question, index) =>
//                  index === currentIndex && (
//                   <div key={question.qId} className="mb-6">
//                     <h2 className="text-xl font-bold mb-2">
//                       Question: {question.question}
//                     </h2>
//                     <input
//                       type="hidden"
//                       {...register("question")}
//                       value={question.question}
//                     />
//                     {question.answerMode === "TEXT-INPUT" && (
//                       <input
//                         type="text"
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       />
//                     )}
//                     {question.answerMode === "YES-NO" && (
//                       <select
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       >
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                       </select>
//                     )}

//                     {question.answerMode === "Other" && (
//                       <select
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       >
//                         {question.option.split(",").map((option, index) => (
//                           <option key={index} value={option.trim()}>
//                             {option.trim()}
//                           </option>
//                         ))}
//                       </select>
//                     )}

//                     {errors.Answer && (
//                       <span className="text-red-500 text-xs italic">
//                         This field is required
//                       </span>
//                     )}
//                   </div>
//                 )
//             )
//           ) : (
//             <p>Loading questions...</p>
//           )}
//         </div>

//         <div className="flex justify-between">
//           {currentIndex >  0 && (
//             <button
//               type="button"
//               onClick={handlePrev}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
//               disabled={isSubmitting}
//             >
//               Prev
//             </button>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );                 
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FillAnswer2() {
  const navigate= useNavigate();
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
    return data
      .filter(
        (item) =>
          item.flow === "general" &&
          (item.dependedQuestion === "" || item.dependedQuestion === null)
      )
      .sort((a, b) => b.sr_no - a.sr_no);
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3333/get-questions");
      setAllQuestions(response.data);
      const filteredQuestions = setGeneralQuestions(response.data);
      setQuestions(filteredQuestions);
      return filteredQuestions;
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
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const findFirstUnansweredIndex = (questions, answers) => {
    return questions.findIndex((question) => !answers[question.question]);
  };

  useEffect(() => {
    const initialize = async () => {
      const fetchedQuestions = await getQuestions();
      const fetchedAnswers = await fetchAnswers();

      if (fetchedQuestions.length > 0) {
        const unansweredIndex = findFirstUnansweredIndex(fetchedQuestions, fetchedAnswers);
        if (unansweredIndex !== -1) {
          setCurrentIndex(unansweredIndex);
        }
      }
    };

    initialize();
  }, []);

  const onSubmit = async (data) => {
    data.id = localStorage.getItem("user_id");
    await axios.post("http://localhost:3333/fill-answer", data);

    const currentQuestion = questions[currentIndex];
    let dependentQuestions = [];

    if (data.Answer === "Yes") {
      
      dependentQuestions = allQuestions.filter(
        (question) => question.dependedQuestion === currentQuestion.question
      );
    }

    if (
      currentQuestion.question ===
      "What is your current gender identity or how do you identify yourself?"
    ) {
      if (data.Answer === "male" || data.Answer === "female") {
        dependentQuestions = allQuestions.filter(
          (question) => question.flow === data.Answer
        );
      }
    }

    // Remove any previously added dependent questions
    let newQuestions = [...questions];
    if (addedQuestions[currentQuestion.qId]) {
      addedQuestions[currentQuestion.qId].forEach((qId) => {
        newQuestions = newQuestions.filter((q) => q.qId !== qId);
      });
    }

    if (data.Answer !== "No" && dependentQuestions.length > 0) {
      dependentQuestions.forEach((dependentQuestion) => {
        newQuestions.splice(currentIndex + 1, 0, dependentQuestion);
      });
      setAddedQuestions((prev) => ({
        ...prev,
        [currentQuestion.qId]: dependentQuestions.map((q) => q.qId),
      }));
    } else {
      setAddedQuestions((prev) => {
        const newAddedQuestions = { ...prev };
        delete newAddedQuestions[currentQuestion.qId];
        return newAddedQuestions;
      });
    }

    setQuestions(newQuestions);

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.question]: data.Answer,
    }));

    const unansweredIndex = findFirstUnansweredIndex(newQuestions, {
      ...answers,
      [currentQuestion.question]: data.Answer,
    });

    if (unansweredIndex !== -1) {
      setCurrentIndex(unansweredIndex);
    } else {
      console.log("All general questions answered");
      // await fetchAnswers(); 
      navigate("/dashboard"); 
    }
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
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">General Questions</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          {questions.length > 0 ? (
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
          {currentIndex >  0 && (
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





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// export default function FillAnswer2() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [addedQuestions, setAddedQuestions] = useState({});
//   const [answers, setAnswers] = useState({});

//   const setGeneralQuestions = (data) => {
//     return data
//       .filter(
//         (item) =>
//           item.flow === "general" &&
//           (item.dependedQuestion === "" || item.dependedQuestion === null)
//       )
//       .sort((a, b) => b.sr_no - a.sr_no);
//   };

//   const getQuestions = async () => {
//     try {
//       const response = await axios.get("http://localhost:3333/get-questions");
//       const allQuestions = response.data;
//       setAllQuestions(allQuestions);
//       const filteredQuestions = setGeneralQuestions(allQuestions);
//       return filteredQuestions;
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const fetchAnswers = async () => {
//     try {
//       const id = localStorage.getItem("user_id");
//       const response = await axios.get("http://localhost:3333/get-Answer", {
//         params: { id },
//       });
//       const answersMap = response.data[0].qa.reduce((acc, item) => {
//         acc[item.question] = item.answer;
//         return acc;
//       }, {});
//       return answersMap;
//     } catch (error) {
//       console.error("Error fetching answers:", error);
//     }
//   };

//   const findFirstUnansweredIndex = (questions, answers) => {
//     return questions.findIndex((question) => !answers[question.question]);
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       const fetchedQuestions = await getQuestions();
//       const fetchedAnswers = await fetchAnswers();

//       if (fetchedQuestions.length > 0) {
//         let newQuestions = [...fetchedQuestions];

//         fetchedQuestions.forEach((question, index) => {
//           if (fetchedAnswers[question.question] === "Yes") {
//             const dependentQuestions = allQuestions.filter(
//               (q) => q.dependedQuestion === question.question
//             );
//             if (dependentQuestions.length > 0) {
//               dependentQuestions.forEach((dependentQuestion) => {
//                 newQuestions.splice(index + 1, 0, dependentQuestion);
//               });
//               setAddedQuestions((prev) => ({
//                 ...prev,
//                 [question.qId]: dependentQuestions.map((q) => q.qId),
//               }));
//             }
//           }
//         });

//         setQuestions(newQuestions);
//         setAnswers(fetchedAnswers);

//         const unansweredIndex = findFirstUnansweredIndex(newQuestions, fetchedAnswers);
//         if (unansweredIndex !== -1) {
//           setCurrentIndex(unansweredIndex);
//         }
//       }
//     };

//     initialize();
//   }, []); // Only run once on mount

//   const onSubmit = async (data) => {
//     try {
//       data.id = localStorage.getItem("user_id");
//       await axios.post("http://localhost:3333/fill-answer", data);

//       const currentQuestion = questions[currentIndex];
//       let dependentQuestions = [];

//       if (data.Answer === "Yes") {
//         dependentQuestions = allQuestions.filter(
//           (question) => question.dependedQuestion === currentQuestion.question
//         );
//       }

//       if (
//         currentQuestion.question ===
//         "What is your current gender identity or how do you identify yourself?"
//       ) {
//         if (data.Answer === "male" || data.Answer === "female") {
//           dependentQuestions = allQuestions.filter(
//             (question) => question.flow === data.Answer
//           );
//         }
//       }

//       let newQuestions = [...questions];
//       if (addedQuestions[currentQuestion.qId]) {
//         addedQuestions[currentQuestion.qId].forEach((qId) => {
//           newQuestions = newQuestions.filter((q) => q.qId !== qId);
//         });
//       }

//       if (data.Answer !== "No" && dependentQuestions.length > 0) {
//         dependentQuestions.forEach((dependentQuestion) => {
//           newQuestions.splice(currentIndex + 1, 0, dependentQuestion);
//         });
//         setAddedQuestions((prev) => ({
//           ...prev,
//           [currentQuestion.qId]: dependentQuestions.map((q) => q.qId),
//         }));
//       } else {
//         setAddedQuestions((prev) => {
//           const newAddedQuestions = { ...prev };
//           delete newAddedQuestions[currentQuestion.qId];
//           return newAddedQuestions;
//         });
//       }

//       setQuestions(newQuestions);

//       setAnswers((prev) => ({
//         ...prev,
//         [currentQuestion.question]: data.Answer,
//       }));

//       const unansweredIndex = findFirstUnansweredIndex(newQuestions, {
//         ...answers,
//         [currentQuestion.question]: data.Answer,
//       });

//       if (unansweredIndex !== -1) {
//         setCurrentIndex(unansweredIndex);
//       } else {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error("Error submitting answer:", error);
//     }
//   };

//   useEffect(() => {
//     const currentQuestion = questions[currentIndex];
//     if (currentQuestion && answers[currentQuestion.question]) {
//       setValue("Answer", answers[currentQuestion.question]);
//     } else {
//       reset();
//     }
//   }, [currentIndex, questions, answers, setValue, reset]);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       Math.min(prevIndex + 1, questions.length - 1)
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4">General Questions</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-lg bg-white p-8 rounded shadow-md"
//       >
//         <div className="mb-4">
//           {questions.length > 0 ? (
//             questions.map(
//               (question, index) =>
//                 index === currentIndex && (
//                   <div key={question.qId} className="mb-6">
//                     <h2 className="text-xl font-bold mb-2">
//                       Question: {question.question}
//                     </h2>
//                     <input
//                       type="hidden"
//                       {...register("question")}
//                       value={question.question}
//                     />
//                     {question.answerMode === "TEXT-INPUT" && (
//                       <input
//                         type="text"
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       />
//                     )}
//                     {question.answerMode === "YES-NO" && (
//                       <select
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       >
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                       </select>
//                     )}

//                     {question.answerMode === "Other" && (
//                       <select
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       >
//                         {question.option.split(",").map((option, index) => (
//                           <option key={index} value={option.trim()}>
//                             {option.trim()}
//                           </option>
//                         ))}
//                       </select>
//                     )}

//                     {errors.Answer && (
//                       <span className="text-red-500 text-xs italic">
//                         This field is required
//                       </span>
//                     )}
//                   </div>
//                 )
//             )
//           ) : (
//             <p>Loading questions...</p>
//           )}
//         </div>

//         <div className="flex justify-between">
//           {currentIndex > 0 && (
//             <button
//               type="button"
//               onClick={handlePrev}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
//               disabled={isSubmitting}
//             >
//               Prev
//             </button>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// 





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";

// export default function FillAnswer2() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [addedQuestions, setAddedQuestions] = useState({});
//   const [answers, setAnswers] = useState({});

//   const displayQu1 = (data) => {
//     return data
//       .filter(
//         (item) =>
//           item.flow === "general" &&
//           (item.dependedQuestion === "" || item.dependedQuestion === null)
//       )
//       .sort((a, b) => a.sr_no - b.sr_no);
//   };

//   const getQuestions = async () => {
//     try {
//       const response = await axios.get("http://localhost:3333/get-questions");
//       setAllQuestions(response.data);
//       const filteredQuestions = displayQu1(response.data);
//       setQuestions(filteredQuestions);
//       return filteredQuestions;
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const fetchAnswers = async () => {
//     try {
//       const id = localStorage.getItem("user_id");
//       const response = await axios.get("http://localhost:3333/get-Answer", {
//         params: { id },
//       });
//       const answersMap = response.data[0].qa.reduce((acc, item) => {
//         acc[item.question] = item.answer;
//         return acc;
//       }, {});
//       setAnswers(answersMap);
//       return answersMap;
//     } catch (error) {
//       console.error("Error fetching answers:", error);
//     }
//   };

//   const findFirstUnansweredIndex = (questions, answers) => {
//     return questions.findIndex((question) => !answers[question.question]);
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       const fetchedQuestions = await getQuestions();
//       const fetchedAnswers = await fetchAnswers();

//       if (fetchedQuestions.length > 0) {
//         const unansweredIndex = findFirstUnansweredIndex(fetchedQuestions, fetchedAnswers);
//         const savedIndex = localStorage.getItem("currentIndex");
//         const startIndex = savedIndex ? parseInt(savedIndex, 10) : unansweredIndex;

//         if (startIndex !== -1) {
//           setCurrentIndex(startIndex);
//         }
//       }
//     };

//     initialize();
//   }, []);

//   const onSubmit = async (data) => {
//     data.id = localStorage.getItem("user_id");
//     await axios.post("http://localhost:3333/fill-answer", data);

//     const currentQuestion = questions[currentIndex];
//     let dependentQuestions = [];

//     if (data.Answer === "Yes") {
//       dependentQuestions = allQuestions.filter(
//         (question) => question.dependedQuestion === currentQuestion.question
//       );
//     }

//     if (
//       currentQuestion.question ===
//       "What is your current gender identity or how do you identify yourself?"
//     ) {
//       if (data.Answer === "male" || data.Answer === "female") {
//         dependentQuestions = allQuestions.filter(
//           (question) => question.flow === data.Answer
//         );
//       }
//     }

//     // Remove any previously added dependent questions
//     let newQuestions = [...questions];
//     if (addedQuestions[currentQuestion.qId]) {
//       addedQuestions[currentQuestion.qId].forEach((qId) => {
//         newQuestions = newQuestions.filter((q) => q.qId !== qId);
//       });
//     }

//     // Add new dependent questions if they are not already added
//     if (data.Answer !== "No" && dependentQuestions.length > 0) {
//       dependentQuestions.forEach((dependentQuestion) => {
//         if (!newQuestions.find((q) => q.qId === dependentQuestion.qId)) {
//           newQuestions.splice(currentIndex + 1, 0, dependentQuestion);
//         }
//       });
//       setAddedQuestions((prev) => ({
//         ...prev,
//         [currentQuestion.qId]: dependentQuestions.map((q) => q.qId),
//       }));
//     } else {
//       setAddedQuestions((prev) => {
//         const newAddedQuestions = { ...prev };
//         delete newAddedQuestions[currentQuestion.qId];
//         return newAddedQuestions;
//       });
//     }

//     setQuestions(newQuestions);

//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion.question]: data.Answer,
//     }));

//     const unansweredIndex = findFirstUnansweredIndex(newQuestions, {
//       ...answers,
//       [currentQuestion.question]: data.Answer,
//     });

//     if (unansweredIndex !== -1) {
//       setCurrentIndex(unansweredIndex);
//     } else {
//       console.log("All general questions answered");
//       // await fetchAnswers(); // Uncomment if you want to fetch answers or perform other actions
//       // navigate("/dashboard"); // Uncomment if you have a routing setup and want to navigate
//     }
//   };

//   useEffect(() => {
//     // Set the default value for the current question
//     const currentQuestion = questions[currentIndex];
//     if (currentQuestion && answers[currentQuestion.question]) {
//       setValue("Answer", answers[currentQuestion.question]);
//     } else {
//       reset();
//     }

//     // Save the current index to local storage
//     localStorage.setItem("currentIndex", currentIndex);
//   }, [currentIndex, questions, answers, setValue, reset]);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       Math.min(prevIndex + 1, questions.length - 1)
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4">General Questions</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-lg bg-white p-8 rounded shadow-md"
//       >
//         <div className="mb-4">
//           {questions.length > 0 ? (
//             questions.map(
//               (question, index) =>
//                 index === currentIndex && (
//                   <div key={question.qId} className="mb-6">
//                     <h2 className="text-xl font-bold mb-2">
//                       Question: {question.question}
//                     </h2>
//                     <input
//                       type="hidden"
//                       {...register("question")}
//                       value={question.question}
//                     />
//                     {question.answerMode === "TEXT-INPUT" && (
//                       <input
//                         type="text"
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       />
//                     )}
//                     {question.answerMode === "YES-NO" && (
//                       <select
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       >
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                       </select>
//                     )}

//                     {question.answerMode === "Other" && (
//                       <select
//                         defaultValue={answers[question.question] || ""}
//                         {...register("Answer", { required: true })}
//                         className="w-full p-2 border border-gray-300 rounded"
//                       >
//                         {question.option.split(",").map((option, index) => (
//                           <option key={index} value={option.trim()}>
//                             {option.trim()}
//                           </option>
//                         ))}
//                       </select>
//                     )}

//                     {errors.Answer && (
//                       <span className="text-red-500 text-xs italic">
//                         This field is required
//                       </span>
//                     )}
//                   </div>
//                 )
//             )
//           ) : (
//             <p>Loading questions...</p>
//           )}
//         </div>

//         <div className="flex justify-between">
//           {currentIndex > 0 && (
//             <button
//               type="button"
//               onClick={handlePrev}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
//               disabled={isSubmitting}
//             >
//               Prev
//             </button>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
