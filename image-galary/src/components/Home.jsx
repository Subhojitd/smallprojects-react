import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await axios.get(
          "https://api.slingacademy.com/v1/sample-data/photos?offset=0&limit=20"
        );
        setPhotos(res.data.photos);
      } catch (error) {
        console.log("Error fetching photos: " + error.message);
      }
    }
    fetchPhotos();
  }, []);

  return (
    <div className="bg-gradient-to-br from-black to-gray-700 w-full h-full flex items-center justify-center flex-col">
      <h1 className="text-center text-5xl font-bold text-white pt-6">
        Photo Gallery
      </h1>
      <div className=" w-full h-full flex items-center justify-center flex-wrap gap-2 pt-[80px]">
        {photos.map((data) => (
          <Link
            key={data.id}
            to={`/details/${data.id}`}
            className="w-[300px] h-[300px] flex flex-col items-center px-4 justify-center gap-3 text-white border border-gray-300 rounded-md"
          >
            <div>
              <img src={data.url} className="w-[150px] h-[150px] rounded-md " />
            </div>
            <div>
              <h1 className="text-2xl  font-semibold">
                {data.title.slice(0, 10)}
              </h1>
              <p>{data.description.slice(0, 50)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
