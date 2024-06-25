// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// export default function FillAnswer4() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [generalQuestion, setGeneralQuestion] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});

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
//       try {
//         const fetchedAnswers = await fetchAnswers();
//         const fetchedQuestions = await getQuestions(fetchedAnswers);
       
//         if (fetchedQuestions.length > 0) {
//           const unansweredIndex = findFirstUnansweredIndex(
//             fetchedQuestions,
//             fetchedAnswers
//           );
//           if (unansweredIndex !== -1) {
//             setCurrentIndex(unansweredIndex);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };
    
//     initialize();
//   }, []);
//   console.log(currentIndex);
//   // console.log(generalQuestion);

//   const getQuestions = async (data) => {
//     const response = await axios.get("http://localhost:3333/get-questions2");
//     setAllQuestions(response.data);
//     setGeneralQuestion(
//       (response.data).filter((que) => que.isdisplay === 1)
//     );
//     // if(data!== undefined){
//     //     generalQuestion.map((que)=>{
//     //       if(que.nextkeywordQue){

//     //         const nextQuestions = allQuestions.filter(
//     //           (que2) =>
//     //               que.nextkeywordQue.includes(que2.qId) &&
//     //               que.keywords.includes(data[que.nextkeywordQue]) &&
//     //               !generalQuestion.some((gq) => gq.qId === que.qId)
//     //       );
    
//     //       updatedQuestions = [
//     //           ...updatedQuestions.slice(0, currentIndex + 1),
//     //           ...nextQuestions,
//     //           ...updatedQuestions.slice(currentIndex + 1),
//     //       ];
    
//     //       // updatedQuestions = updatedQuestions.filter(
//     //       //     (que) =>
//     //       //         (que.keywords !== null && que.keywords.includes(payload.Answer)) ||
//     //       //         que.isdisplay === 1
//     //       // );
//     //   }
    
//     //   setGeneralQuestion(updatedQuestions);
//     // })
          
//     //       if(que.nextpotionQue){
//     //         console.log(que.nextpotionQue);
//     //       }
//     //       // console.log(data[que.question]);
        
//     // }
//   //   if (data !== undefined) {
//   //     generalQuestion.forEach((que) => {
//   //         if (que.nextkeywordQue) {
  
//   //             const nextQuestions = allQuestions.filter(
//   //                 (que2) =>
//   //                     que.nextkeywordQue.includes(que2.qId) &&
//   //                     que.keywords.includes(data[que.nextkeywordQue]) &&
//   //                     !generalQuestion.some((gq) => gq.qId === que2.qId)
//   //             );
  
//   //             // Logic to append nextQuestions after the current que
//   //             nextQuestions.forEach((nextQue) => {
//   //                 const currentIndex = generalQuestion.findIndex(gq => gq.qId === que.qId);
//   //                 if (currentIndex !== -1) {
//   //                     generalQuestion.splice(currentIndex + 1, 0, nextQue);
//   //                 }
//   //             });
  
//   //             // Uncomment and adjust the below filter logic if needed
//   //             // generalQuestion = generalQuestion.filter(
//   //             //     (que) =>
//   //             //         (que.keywords !== null && que.keywords.includes(payload.Answer)) ||
//   //             //         que.isdisplay === 1
//   //             // );
//   //         }
//   //     });
  
//   //     setGeneralQuestion([...generalQuestion]); // Spread operator to trigger re-render if using React
//   // }

//   if(data!==undefined){
//     // console.log(data);
//     generalQuestion.map((generalQue)=>{
      
//       // console.log(generalQue);
//       // console.log(data[generalQue.question]);
//       generalQue.nextkeywordQue = generalQue.nextkeywordQue.split(',').map(Number);
//       let addedQuestion=[];
//       // console.log(generalQue.nextkeywordQue);

//       (generalQue.nextkeywordQue).forEach((que)=>{
//           allQuestions.map((allQue)=>{
//             if(allQue.qId===que){
//               // console.log(allQue.keywords);
//               if((allQue.keywords).includes(data[generalQue.question])){
//                  generalQuestion.push(allQue);
//                  if(allQue.nextpotionQue){
//                   allQue.nextpotionQue = allQue.nextpotionQue.split(',').map(Number);
//                   console.log(allQue);
//                   (allQue.nextpotionQue).map((q)=>{
//                     allQuestions.map((q2)=>{
//                       if(q2.qId===q){
//                         // console.log(q2);
//                         generalQuestion.push(q2);
//                       }
//                     })
//                   })
                  
//                  }
//               }
//             }
//          })
//       })
//       // console.log(addedQuestion);
//     })
//     console.log(generalQuestion);
//   }
  
//     return generalQuestion;
//   };

//   // const onSubmit = async (data) => {
//   //   const currentQuestion = generalQuestion[currentIndex];
//   //   const payload = {
//   //     id: localStorage.getItem("user_id"),
//   //     question: currentQuestion.question,
//   //     Answer: data.Answer,
//   //     qId: currentQuestion.qId,
//   //   };

//   //   await axios.post("http://localhost:3333/fill-answer", payload);

//   //   let updatedQuestions = [...generalQuestion];

//   //   if (currentQuestion.nextpotionQue !== null) {
//   //     console.log(payload.Answer);
//   //     const nextQuestions = allQuestions.filter(
//   //       (que) =>
//   //         currentQuestion.nextpotionQue.includes(que.qId)
//   //         // !generalQuestion.some((gq) => gq.qId === que.qId)
//   //     );
//   //     nextQuestions.forEach((question) => {
//   //       question.question = question.question.replace(
//   //         /<[^>]*>/,
//   //         `<${payload.Answer}>`
//   //       );
//   //       // console.log(question);
//   //     });
//   //     updatedQuestions = [
//   //       ...generalQuestion.slice(0, currentIndex + 1),
//   //       ...nextQuestions,
//   //       ...generalQuestion.slice(currentIndex + 1),
//   //     ];
//   //   }

//   //   if (currentQuestion.nextkeywordQue !== null) {
//   //     const nextQuestions = allQuestions.filter(
//   //       (que) =>
//   //         currentQuestion.nextkeywordQue.includes(que.qId) &&
//   //         que.keywords.includes(payload.Answer) &&
//   //         !generalQuestion.some((gq) => gq.qId === que.qId)
//   //     );
//   //     updatedQuestions = [
//   //       ...generalQuestion.slice(0, currentIndex + 1),
//   //       ...nextQuestions,
//   //       ...generalQuestion.slice(currentIndex + 1),
//   //     ];
//   //     updatedQuestions = updatedQuestions.filter(
//   //       (que) => que.keywords !== null && que.keywords.includes(payload.Answer) || que.isdisplay === 1
//   //     );
//   //   }

//   //   setGeneralQuestion(updatedQuestions);
//   //   setCurrentIndex((prevIndex) =>
//   //     prevIndex < updatedQuestions.length - 1 ? prevIndex + 1 : prevIndex
//   //   );
//   // };
//   // const onSubmit = async (data) => {
//   //   const currentQuestion = generalQuestion[currentIndex];
//   //   const payload = {
//   //     id: localStorage.getItem("user_id"),
//   //     question: currentQuestion.question,
//   //     Answer: data.Answer,
//   //     qId: currentQuestion.qId,
//   //   };

//   //   await axios.post("http://localhost:3333/fill-answer", payload);

//   //   let updatedQuestions = [...generalQuestion];

//   //   if (currentQuestion.nextpotionQue !== null) {
//   //     // Remove questions that match currentQuestion.nextpotionQue

//   //     updatedQuestions = updatedQuestions.filter(
//   //       (que) => !currentQuestion.nextpotionQue.includes(que.qId)
//   //     );
//   //     console.log(payload.Answer);
//   //     let nextQuestions;
//   //     if (payload.Answer.length > 1) {
//   //       nextQuestions = allQuestions.filter((que) =>
//   //         currentQuestion.nextpotionQue.includes(que.qId)
//   //       );
//   //       nextQuestions = allQuestions.filter((que) =>
//   //         currentQuestion.nextpotionQue.includes(que.qId)
//   //       );

//   //       nextQuestions.forEach((question, index) => {
//   //         question.question = question.question.replace(
//   //           /<[^>]*>/,
//   //           `<${payload.Answer[index]}>`
//   //         );
//   //       });
//   //     } else {
//   //       nextQuestions = allQuestions.filter((que) =>
//   //         currentQuestion.nextpotionQue.includes(que.qId)
//   //       );

//   //       nextQuestions.forEach((question, index) => {
//   //         question.question = question.question.replace(
//   //           /<[^>]*>/,
//   //           `<${payload.Answer}>`
//   //         );
//   //       });
//   //     }

//   //     updatedQuestions = [
//   //       ...updatedQuestions.slice(0, currentIndex + 1),
//   //       ...nextQuestions,
//   //       ...updatedQuestions.slice(currentIndex + 1),
//   //     ];
//   //   }

//   //   if (currentQuestion.nextkeywordQue !== null) {
//   //     const nextQuestions = allQuestions.filter(
//   //       (que) =>
//   //         currentQuestion.nextkeywordQue.includes(que.qId) &&
//   //         que.keywords.includes(payload.Answer) &&
//   //         !generalQuestion.some((gq) => gq.qId === que.qId)
//   //     );

//   //     updatedQuestions = [
//   //       ...updatedQuestions.slice(0, currentIndex + 1),
//   //       ...nextQuestions,
//   //       ...updatedQuestions.slice(currentIndex + 1),
//   //     ];

//   //     updatedQuestions = updatedQuestions.filter(
//   //       (que) =>
//   //         (que.keywords !== null && que.keywords.includes(payload.Answer)) ||
//   //         que.isdisplay === 1
//   //     );
//   //   }

//   //   setGeneralQuestion(updatedQuestions);
//   //   setCurrentIndex((prevIndex) =>
//   //     prevIndex < updatedQuestions.length - 1 ? prevIndex + 1 : prevIndex
//   //   );
//   // };

// //   const onSubmit = async (data) => {
   
// //     const currentQuestion = generalQuestion[currentIndex];
// //     const payload = {
// //         id: localStorage.getItem("user_id"),
// //         question: currentQuestion.question,
// //         Answer: data.Answer,
// //         qId: currentQuestion.qId,
// //     };

// //     await axios.post("http://localhost:3333/fill-answer", payload);

// //     let updatedQuestions = [...generalQuestion];

// //     if (currentQuestion.nextpotionQue !== null) {
// //         // Remove questions that match currentQuestion.nextpotionQue
// //         updatedQuestions = updatedQuestions.filter(
// //             (que) => !currentQuestion.nextpotionQue.includes(que.qId)
// //         );
// //         console.log(payload.Answer);

// //         let nextQuestions = [];
// //         if (Array.isArray(payload.Answer)) {
// //             nextQuestions = payload.Answer.flatMap((answer, index) => {
// //                 const questions = allQuestions
// //                     .filter((que) => currentQuestion.nextpotionQue.includes(que.qId))
// //                     .map((question) => {
// //                         const updatedQuestion = { ...question };
// //                         updatedQuestion.question = updatedQuestion.question.replace(
// //                             /<[^>]*>/,
// //                             `<${answer}>`
// //                         );
// //                         return updatedQuestion;
// //                     });
// //                 return questions;
// //             });
// //         } else {
// //             nextQuestions = allQuestions.filter((que) =>
// //                 currentQuestion.nextpotionQue.includes(que.qId)
// //             );

// //             nextQuestions.forEach((question) => {
// //                 question.question = question.question.replace(
// //                     /<[^>]*>/,
// //                     `<${payload.Answer}>`
// //                 );
// //             });
// //         }

// //         updatedQuestions = [
// //             ...updatedQuestions.slice(0, currentIndex + 1),
// //             ...nextQuestions,
// //             ...updatedQuestions.slice(currentIndex + 1),
// //         ];
// //     }

// //     if (currentQuestion.nextkeywordQue !== null) {
// //         const nextQuestions = allQuestions.filter(
// //             (que) =>
// //                 currentQuestion.nextkeywordQue.includes(que.qId) &&
// //                 que.keywords.includes(payload.Answer) &&
// //                 !generalQuestion.some((gq) => gq.qId === que.qId)
// //         );

// //         updatedQuestions = [
// //             ...updatedQuestions.slice(0, currentIndex + 1),
// //             ...nextQuestions,
// //             ...updatedQuestions.slice(currentIndex + 1),
// //         ];

// //         updatedQuestions = updatedQuestions.filter(
// //             (que) =>
// //                 (que.keywords !== null && que.keywords.includes(payload.Answer)) ||
// //                 que.isdisplay === 1
// //         );
// //     }

// //     setGeneralQuestion(updatedQuestions);
// //     setCurrentIndex((prevIndex) =>
// //         prevIndex < updatedQuestions.length - 1 ? prevIndex + 1 : prevIndex
// //     );
// // };

// const onSubmit = async (data) => {
//   const currentQuestion = generalQuestion[currentIndex];
//   let answer = Array.isArray(data.Answer) ? data.Answer : [data.Answer];
  
//   // Add Answer2 to the array if it has a value
//   if (data.Answer2) {
//       answer = [...answer, data.Answer2];
//   }

//   // Ensure all elements are unique
//   answer = [...new Set(answer)];

//   const payload = {
//       id: localStorage.getItem("user_id"),
//       question: currentQuestion.question,
//       Answer: answer,
//       qId: currentQuestion.qId,
//   };

//   await axios.post("http://localhost:3333/fill-answer", payload);

//   let updatedQuestions = [...generalQuestion];

//   if (currentQuestion.nextpotionQue !== null) {
//       // Remove questions that match currentQuestion.nextpotionQue
//       updatedQuestions = updatedQuestions.filter(
//           (que) => !currentQuestion.nextpotionQue.includes(que.qId)
//       );
//       console.log(payload.Answer);

//       let nextQuestions = [];
//       if (Array.isArray(payload.Answer)) {
//           nextQuestions = payload.Answer.flatMap((answer, index) => {
//               const questions = allQuestions
//                   .filter((que) => currentQuestion.nextpotionQue.includes(que.qId))
//                   .map((question) => {
//                       const updatedQuestion = { ...question };
//                       updatedQuestion.question = updatedQuestion.question.replace(
//                           /<[^>]*>/,
//                           `<${answer}>`
//                       );
//                       return updatedQuestion;
//                   });
//               return questions;
//           });
//       } else {
//           nextQuestions = allQuestions.filter((que) =>
//               currentQuestion.nextpotionQue.includes(que.qId)
//           );

//           nextQuestions.forEach((question) => {
//               question.question = question.question.replace(
//                   /<[^>]*>/,
//                   `<${payload.Answer}>`
//               );
//           });
//       }

//       updatedQuestions = [
//           ...updatedQuestions.slice(0, currentIndex + 1),
//           ...nextQuestions,
//           ...updatedQuestions.slice(currentIndex + 1),
//       ];
//   }

//   if (currentQuestion.nextkeywordQue !== null) {
//       const nextQuestions = allQuestions.filter(
//           (que) =>
//               currentQuestion.nextkeywordQue.includes(que.qId) &&
//               que.keywords.includes(payload.Answer) &&
//               !generalQuestion.some((gq) => gq.qId === que.qId)
//       );

//       updatedQuestions = [
//           ...updatedQuestions.slice(0, currentIndex + 1),
//           ...nextQuestions,
//           ...updatedQuestions.slice(currentIndex + 1),
//       ];

//       updatedQuestions = updatedQuestions.filter(
//           (que) =>
//               (que.keywords !== null && que.keywords.includes(payload.Answer)) ||
//               que.isdisplay === 1
//       );
//   }

//   setGeneralQuestion(updatedQuestions);
//   setCurrentIndex((prevIndex) =>
//       prevIndex < updatedQuestions.length - 1 ? prevIndex + 1 : prevIndex
//   );
// };




//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4">General Questions</h1>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-lg bg-white p-8 rounded shadow-md"
//       >
//         {generalQuestion.map(
//           (que, index) =>
//             index === currentIndex && (
//               <div key={index}>
//                 <h2 className="text-xl font-bold mb-2">
//                   Question: {que.question}
//                 </h2>
//                 <input
//                   type="hidden"
//                   {...register("question")}
//                   value={que.question}
//                 />
//                 <input type="hidden" {...register("qId")} value={que.qId} />
//                 {que.answerMode === "Other" && que.ismultipleanswer === 0 && (
//                   <select
//                     {...register("Answer", { required: true })}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   >
//                     {que.options.split(",").map((option, index) => (
//                       <option key={index} value={option.trim()}>
//                         {option.trim()}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 {que.answerMode === "Other" && que.ismultipleanswer === 1 && (
//                   <>
//                   <select
//                     {...register("Answer", { required: true })}
//                     multiple
//                     className="w-full p-2 border border-gray-300 rounded"
//                   >
//                     {que.options.split(",").map((option, index) => (
//                       <option key={index} value={option.trim()}>
//                         {option.trim()}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="text"
//                     {...register("Answer2")}
//                     className="w-full p-2 border border-gray-300 rounded"
//                     placeholder="Other"
//                   />
//                   </>

//                 )}

//                 {que.answerMode === "TEXT-INPUT" && (
//                   <input
//                     type="text"
//                     {...register("Answer", { required: true })}
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 )}
//               </div>
//             )
//         )}
//         <div className="flex justify-between mt-4">
//           <button
//             type="button"
//             onClick={handlePrev}
//             className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
//           >
//             Prev
//           </button>

//           <button
//             type="submit"
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

export default function FillAnswer4() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [allQuestions, setAllQuestions] = useState([]);
  const [generalQuestion, setGeneralQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

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

  const getQuestions = async (answers) => {
    const response = await axios.get("http://localhost:3333/get-questions2");
    const allQues = response.data;
    const initialGeneralQues = allQues.filter((que) => que.isdisplay === 1);

    setAllQuestions(allQues);
    let updatedGeneralQuestions = initialGeneralQues;

    if (answers !== undefined) {
      initialGeneralQues.forEach((generalQue) => {
        generalQue.nextkeywordQue = generalQue.nextkeywordQue
          ? generalQue.nextkeywordQue.split(',').map(Number)
          : [];
        generalQue.nextkeywordQue.forEach((queId) => {
          allQues.forEach((allQue) => {
            if (allQue.qId === queId && allQue.keywords.includes(answers[generalQue.question])) {
              updatedGeneralQuestions.push(allQue);
              if (allQue.nextpotionQue) {
                allQue.nextpotionQue.split(',').map(Number).forEach((nextQueId) => {
                  allQues.forEach((nextQue) => {
                    if (nextQue.qId === nextQueId) {
                      nextQue.question = nextQue.question.replace(
                        /<[^>]*>/,
                        `<${answers[nextQue.question]}>`
                      );
                      updatedGeneralQuestions.push(nextQue);
                    }
                  });
                });
              }
            }
          });
        });
      });
    }

    setGeneralQuestion(updatedGeneralQuestions);
    console.log(generalQuestion);
    return updatedGeneralQuestions;
  };

  const findFirstUnansweredIndex = (questions, answers) => {
    return questions.findIndex((question) => !answers[question.question]);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const fetchedAnswers = await fetchAnswers();
        const fetchedQuestions = await getQuestions(fetchedAnswers);
       
        if (fetchedQuestions.length > 0) {
          const unansweredIndex = findFirstUnansweredIndex(
            fetchedQuestions,
            fetchedAnswers
          );
          if (unansweredIndex !== -1) {
            setCurrentIndex(unansweredIndex);
          }
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    
    initialize();
  }, []);

  const onSubmit = async (data) => {
    const currentQuestion = generalQuestion[currentIndex];
    let answer = Array.isArray(data.Answer) ? data.Answer : [data.Answer];
    
    // Add Answer2 to the array if it has a value
    if (data.Answer2) {
      answer = [...answer, data.Answer2];
    }

    // Ensure all elements are unique
    answer = [...new Set(answer)];

    const payload = {
      id: localStorage.getItem("user_id"),
      question: currentQuestion.question,
      Answer: answer,
      qId: currentQuestion.qId,
    };

    await axios.post("http://localhost:3333/fill-answer", payload);

    let updatedQuestions = [...generalQuestion];

    if (currentQuestion.nextpotionQue !== null) {
      updatedQuestions = updatedQuestions.filter(
        (que) => !currentQuestion.nextpotionQue.includes(que.qId)
      );

      let nextQuestions = [];
      if (Array.isArray(payload.Answer)) {
        nextQuestions = payload.Answer.flatMap((answer, index) => {
          const questions = allQuestions
            .filter((que) => currentQuestion.nextpotionQue.includes(que.qId))
            .map((question) => {
              const updatedQuestion = { ...question };
              updatedQuestion.question = updatedQuestion.question.replace(
                /<[^>]*>/,
                `<${answer}>`
              );
              return updatedQuestion;
            });
          return questions;
        });
      } else {
        nextQuestions = allQuestions.filter((que) =>
          currentQuestion.nextpotionQue.includes(que.qId)
        );

        nextQuestions.forEach((question) => {
          question.question = question.question.replace(
            /<[^>]*>/,
            `<${payload.Answer}>`
          );
        });
      }

      updatedQuestions = [
        ...updatedQuestions.slice(0, currentIndex + 1),
        ...nextQuestions,
        ...updatedQuestions.slice(currentIndex + 1),
      ];
    }

    if (currentQuestion.nextkeywordQue !== null) {
      const nextQuestions = allQuestions.filter(
        (que) =>
          currentQuestion.nextkeywordQue.includes(que.qId) &&
          que.keywords.includes(payload.Answer) &&
          !generalQuestion.some((gq) => gq.qId === que.qId)
      );

      updatedQuestions = [
        ...updatedQuestions.slice(0, currentIndex + 1),
        ...nextQuestions,
        ...updatedQuestions.slice(currentIndex + 1),
      ];

      updatedQuestions = updatedQuestions.filter(
        (que) =>
          (que.keywords !== null && que.keywords.includes(payload.Answer)) ||
          que.isdisplay === 1
      );
    }

    setGeneralQuestion(updatedQuestions);
    setCurrentIndex((prevIndex) =>
      prevIndex < updatedQuestions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">General Questions</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded shadow-md"
      >
        {generalQuestion.map(
          (que, index) =>
            index === currentIndex && (
              <div key={index}>
                <h2 className="text-xl font-bold mb-2">
                  Question: {que.question}
                </h2>
                <input
                  type="hidden"
                  {...register("question")}
                  value={que.question}
                />
                <input type="hidden" {...register("qId")} value={que.qId} />
                {que.answerMode === "Other" && que.ismultipleanswer === 0 && (
                  <select
                    {...register("Answer", { required: true })}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    {que.options.split(",").map((option, index) => (
                      <option key={index} value={option.trim()}>
                        {option.trim()}
                      </option>
                    ))}
                  </select>
                )}
                {que.answerMode === "Other" && que.ismultipleanswer === 1 && (
                  <>
                  <select
                    {...register("Answer", { required: true })}
                    multiple
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    {que.options.split(",").map((option, index) => (
                      <option key={index} value={option.trim()}>
                        {option.trim()}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    {...register("Answer2")}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Other"
                  />
                  </>

                )}

                {que.answerMode === "TEXT-INPUT" && (
                  <input
                    type="text"
                    {...register("Answer", { required: true })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </div>
            )
        )}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {currentIndex === generalQuestion.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
