import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [trendProducts, setTrendProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        const slicedProducts = res.products.slice(0, 6);
        setTrendProducts(slicedProducts);
      });
  }, []);
  return (
    <div className="">
      <h2 className="border-b-2 p-2 text-xl"> 🏠Home </h2>
      <div className="flex flex-col gap-3 items-center">
        <span className="text-2xl p-2 ">Trending Products 🔥</span>
        <div className="product-grid w-full grid grid-cols-2 gap-3">
          {trendProducts.map((product) => {
            return (
              <div
                className="product-card w-64 flex items-center justify-center  bg-slate-950 py-4 rounded-md hover:bg-slate-600 cursor-pointer"
                key={product.id}
              >
                <Link to={`/products/${product.id}`}>
                  <img
                    className="w-48 h-48 rounded-md "
                    src={product.thumbnail}
                    alt={product.title}
                  />
                  <h3 className="text-center">{product.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>

        <Link to={`/products`}>
          <button className="text-orange-400 hover:bg-white hover:text-black rounded-md p-2">
            Show all Products {">"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
