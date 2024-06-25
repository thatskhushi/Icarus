// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// export default function UploadPic() {
//   const [pictures, setPictures] = useState([]);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const upload = async (data) => {
//     data.id = localStorage.getItem("user_id");
//     const formData = new FormData();
    
//     for (let i = 0; i < data.files.length; i++) {
//       formData.append("files", data.files[i]);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3333/upload-pic",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response.data);

//       getPic();
//       reset();
//     } catch (error) {
//       console.error("There was an error uploading the file!", error);
//     }
//   };

//   const getPic = async () => {
//     try {
//       const response = await axios.get("http://localhost:3333/get-pic");
//       setPictures(response.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     getPic();
//   }, []);

//   return (
//     <div>
//       <form onSubmit={handleSubmit(upload)}>
//         <input
//           type="file"
//           multiple
//           {...register("files", { required: "Files are required" })}
//         />
//         {errors.files && <span>{errors.files.message}</span>}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded"
//           disabled={isSubmitting}
//         >
//           Upload
//         </button>
//       </form>
//       <div>
//         {pictures.map((pic) => (
//           <div key={pic.id}>
//             <img
//               src={`http://localhost:3333/uploads/${pic.path}`}
//               alt="Uploaded Pic"
//               style={{ width: "200px", height: "auto" }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

export default function UploadPic() {
  const [pictures, setPictures] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();
  const webcamRef = useRef(null); // Reference to access webcam component
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const capturePicture = () => {
    const base64Img = webcamRef.current.getScreenshot();
    setCapturedImage(base64Img);
  };

  const upload = async (data) => {
    const userId = localStorage.getItem("user_id");
    const formData = new FormData();
    
    for (let i = 0; i < data.files.length; i++) {
      formData.append("files", data.files[i]);
    }

    if (capturedImage) {
      // Convert base64 image to Blob
      const blobImg = await fetch(capturedImage).then((res) => res.blob());
      formData.append("files", blobImg, "webcam-image.png");
    }

    formData.append("id", userId);
    let id = localStorage.getItem("user_id");
    try {
      const response = await axios.post(
        "http://localhost:3333/upload-pic",
        formData,id,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      getPic();
      reset();
      setIsCameraOpen(false);
      setCapturedImage(null);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  const getPic = async () => {
    try {
      const id = localStorage.getItem("user_id");
      const response = await axios.get("http://localhost:3333/get-pic",{
        params: { id },
      });
      console.log(response.data);
  

      const newPictures = response.data.flatMap(pics => pics.path.map(p => p.pic));

      setPictures(prevPictures => {
        const uniqueNewPictures = newPictures.filter(p => !prevPictures.includes(p));
        return [...prevPictures, ...uniqueNewPictures];
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPic();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(upload)} className="mb-4">
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-medium text-gray-700">Select Files</label>
          <input
            type="file"
            multiple
            {...register("files")}
            className="p-2 border rounded"
          />
          
        </div>
        
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-lg font-medium text-gray-700">Capture Image from Webcam</label>
          {isCameraOpen ? (
            <div className="border p-2 mb-2">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="w-full h-auto"
              />
              <button
                type="button"
                onClick={capturePicture}
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Capture Image
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsCameraOpen(true)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Open Camera
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={isSubmitting}
        >
          Upload
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {pictures.map((pic) => (
          <div key={pic.id} className="border p-2">
            <img
              src={`http://localhost:3333/uploads/${pic}`}
              alt="Uploaded Pic"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div> 
    </div>
  );
}
