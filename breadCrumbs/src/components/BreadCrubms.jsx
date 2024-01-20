import React from "react";
import { useLocation, Link } from "react-router-dom";

const BreadCrubms = () => {
  const { pathname } = useLocation();
  const pathNames = pathname.split("/").filter((x) => x);
  let breadCrumbsPath = "";

  return (
    <div className="breadcrubms">
      {pathNames.length > 0 && (
        <Link
          to={`/`}
          className="text-xl cursor-pointer hover:text-orange-500 "
        >
          Home
        </Link>
      )}
      {pathNames.map((name, index) => {
        breadCrumbsPath += `${name}`;
        const isLast = index === pathNames.length - 1;

        return isLast ? (
          <span
            className="text-xl cursor-pointer hover:text-orange-500 "
            key={breadCrumbsPath}
          >
            {" "}
            {">"} {name}
          </span>
        ) : (
          <span
            className="text-xl cursor-pointer hover:text-orange-500 "
            key={breadCrumbsPath}
          >
            {" "}
            {">"} <Link to={breadCrumbsPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default BreadCrubms;
