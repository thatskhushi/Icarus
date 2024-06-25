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
        const response = await axios.get(
          "http://localhost:3333/get-questions2"
        );
        setQuestions(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchQuestions();
  }, []);

  const registration = async (data) => {
    try {
      if (Array.isArray(data.nextOptionQ)) {
        data.nextOptionQ = data.nextOptionQ.join(",");
      }
      if (Array.isArray(data.nextKeywordQ)) {
        data.nextKeywordQ = data.nextKeywordQ.join(",");
      }
      data.multipleAnswer = data.multipleAnswer === "true";
      data.display = data.display === "true";
      const response = await axios.post(
        "http://localhost:3333/set-question2",
        data
      );
      // console.log(data);
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
  const actionValue3 = watch("action3");
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
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-700 font-bold mb-2">
                Allow multiple Answers
              </label>
              <label htmlFor="" className="mr-4">
                <input
                  type="radio"
                  value="true"
                  className="mr-2"
                  {...register("multipleAnswer")}
                />
                Yes
              </label>
              <label htmlFor="">
                <input
                  type="radio"
                  value="false"
                  className="mr-2"
                  {...register("multipleAnswer")}
                />
                No
              </label>
            </div>
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
                value="no"
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
                htmlFor="nextKeywordQ"
                className="block text-gray-700 font-bold mb-2"
              >
                Choose Keyword question:
              </label>
              <select
                id="nextKeywordQ"
                {...register("nextKeywordQ", {
                  required: "Next kwyword question is required",
                })}
                multiple
                className="w-full p-2 border border-gray-300 rounded"
              >
                {questions
             
                  .map((q) => (
                    <option key={q.id} value={q.qId}>
                      {q.question}
                    </option>
                  ))}
              </select>
              {errors.nextKeywordQ && (
                <p className="text-red-500 text-xs italic">
                  {errors.nextKeywordQ.message}
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
                htmlFor="nextOptionQ"
                className="block text-gray-700 font-bold mb-2"
              >
                Choose next Option Questions :
              </label>
              <select
                id="nextOptionQ"
                {...register("nextOptionQ", {
                  required: "next Option question is required",
                })}
                className="w-full p-2 border border-gray-300 rounded"
                multiple
              >
                {questions.map((q) => (
                  <option key={q.id} value={q.qId}>
                    {q.question}
                  </option>
                ))}
              </select>
              {errors.option_dependencies && (
                <p className="text-red-500 text-xs italic">
                  {errors.nextOptionQ.message}
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
            Do you want to Add required Keyword for this Question..?
          </label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="Yes"
                name="action3"
                {...register("action3", { required: "Action is required" })}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                name="action3"
                {...register("action3", { required: "Action is required" })}
                className="mr-2"
              />
              No
            </label>
          </div>
          {errors.action3 && (
            <p className="text-red-500 text-xs italic">
              {errors.action3.message}
            </p>
          )}
        </div>

        {actionValue3 === "Yes" && (
          <>
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
                {...register("Keywords", {
                  required: "Keywords are required",
                })}
              />
            </div>
          </>
        )}
        {errors.Keywords && (
          <p className="text-red-500 text-xs italic">
            {errors.Keywords.message}
          </p>
        )}

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
                {...register("display", { required: "Action is required" })}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="false"
                name="display"
                {...register("display", { required: "Action is required" })}
                className="mr-2"
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
