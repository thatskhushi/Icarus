import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Question4() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [questions, setQuestions] = useState([]);

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

  const registration = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3333/set-question",
        data
      );

      if (response.data.messages === "success") {
        console.log(response.data);
        alert("Question is added");
        location.reload();
      } else {
        console.log(response.data);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  // Watch the value of the action radio button
  const actionValue = watch("action");
  const actionValue2 = watch("action2");
  const other = watch("Answer_Mode");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(registration)}
        className="w-full max-w-lg bg-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 font-bold mb-2"
          >
            Enter Question:
          </label>
          <textarea
            id="question"
            cols="30"
            rows="5"
            {...register("question", { required: "Question is required" })}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          {errors.question && (
            <p className="text-red-500 text-xs italic">
              {errors.question.message}
            </p>
          )}
        </div>


        <div className="mb-4">
          <label
            htmlFor="Answer Mode"
            className="block text-gray-700 font-bold mb-2"
          >
            Answer Mode:
          </label>
          <select
            id="Answer_Mode"
            {...register("Answer_Mode", {
              required: "Answer mode selection is required",
            })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="TEXT-INPUT">TEXT-INPUT</option>
            <option value="Other">Option</option>
          </select>
          {errors.Answer_Mode && (
            <p className="text-red-500 text-xs italic">
              {errors.Answer_Mode.message}
            </p>
          )}
        </div>

        {other === "Other" && (
          <>
            <label
              htmlFor="Options"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter Options[saperated by coma]:
            </label>
            <input
              type="text"
              name=""
              id=""
              className="w-full p-2 border border-gray-300 rounded"
              {...register("options", {
                required: "Options are required",
              })}
            />
            <label htmlFor="">Allow multiple Answers</label>
            <input type="radio" value="yes" {...register("multipleAnswer")}/>Yes
            <input type="radio" value="no" {...register("multipleAnswer")}/>No
          </>
        )}
        {errors.options && (
          <p className="text-red-500 text-xs italic">
            {errors.options.message}
          </p>
        )}
        {errors.multipleAnswer && (
          <p className="text-red-500 text-xs italic">
            {errors.multipleAnswer.message}
          </p>
        )}
      
        <div className="mb-4">
          <label
            htmlFor="action"
            className="block text-gray-700 font-bold mb-2"
          >
            Do you want to Add next Keyword Question..?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="Yes"
                name="action"
                {...register("action", { required: "Action is required" })}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                name="action"
                {...register("action", { required: "Action is required" })}
                className="mr-2"
              />
              No
            </label>
          </div>
          {errors.action && (
            <p className="text-red-500 text-xs italic">
              {errors.action.message}
            </p>
          )}
        </div>

        {actionValue === "Yes" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="dependencies"
                className="block text-gray-700 font-bold mb-2"
              >
                Choose Keyword question:
              </label>
              <select
                id="dependencies"
                {...register("dependencies", {
                  required: "Dependent question is required",
                })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {questions
                  .filter((question) => question.answerMode === "YES-NO")
                  .map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.question}
                    </option>
                  ))}
              </select>
              {errors.dependencies && (
                <p className="text-red-500 text-xs italic">
                  {errors.dependencies.message}
                </p>
              )}
            </div>
            
          </>
        )}
        <div className="mb-4">
          <label
            htmlFor="action"
            className="block text-gray-700 font-bold mb-2"
          >
            Do you want to add next option questions..?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="Yes"
                name="action"
                {...register("action2", { required: "Action is required" })}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                name="action"
                {...register("action2", { required: "Action is required" })}
                className="mr-2"
              />
              No
            </label>
          </div>
          {errors.action && (
            <p className="text-red-500 text-xs italic">
              {errors.action2.message}
            </p>
          )}
        </div>

        {actionValue2 === "Yes" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="dependencies"
                className="block text-gray-700 font-bold mb-2"
              >
                Choose dependent question for option:
              </label>
              <select
                id="dependencies"
                {...register("option_dependencies", {
                  required: "option_dependencies question is required",
                })}
                className="w-full p-2 border border-gray-300 rounded"
              >
                
                {questions
                  .filter((question) => question.answerMode === "Other")
                  .map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.question}
                    </option>
                  ))}
              </select>
              {errors.option_dependencies && (
                <p className="text-red-500 text-xs italic">
                  {errors.option_dependencies.message}
                </p>
              )}
            </div>
            
          </>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
