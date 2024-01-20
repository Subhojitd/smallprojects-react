import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
  }, []);

  console.log(product);
  return (
    <div className="w-[600px] h-[600px]">
      <h2>{product?.title}</h2>
      {product ? (
        <div>
          <img
            className="w-[500px]"
            src={product.thumbnail}
            alt={product.title}
          />
          <h3>${product.price}</h3>
          <p>{product.description}</p>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default ProductDetails;
