import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ImageDetails = () => {
  const { id } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await axios.get(
          `https://api.slingacademy.com/v1/sample-data/photos/${id}`
        );
        console.log(res);
        setPhotos(res.data.photo);
      } catch (error) {
        console.log("Error fetching photos: " + error.message);
      }
    }
    fetchPhotos();
  }, [id]);

  if (!photos) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gradient-to-br from-black to-gray-700 w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-center text-5xl font-bold text-white pt-6">
        Photo Description
      </h1>

      <div className="w-full h-full flex items-center justify-center  gap-[100px] pt-[80px] text-white">
        <div>
          <img src={photos.url} className="w-[300px]" alt="" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-3">
            {" "}
            Title: {photos.title}
          </h1>
          <h1> Desc: {photos.description.slice(0, 100)}</h1>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
