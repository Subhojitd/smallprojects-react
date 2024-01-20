import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      });
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-2xl p-2 ">Products Listing 📜</h2>
      <div className="product-grid product-grid w-full grid grid-cols-2 gap-3">
        {products?.map((product) => {
          return (
            <div
              className="product-card product-card w-64 flex items-center justify-center  bg-slate-950 py-4 rounded-md hover:bg-slate-600 cursor-pointer"
              key={product.id}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-48 h-48 rounded-md "
                />
                <h3 className="text-center">{product.title}</h3>
                <h3 className="text-center">
                  <span className="text-red-500">$</span>
                  {product.price}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsListing;
