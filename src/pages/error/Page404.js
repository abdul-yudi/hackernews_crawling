import React from "react";
import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <div className="app flex-row align-items-center">
      <div className="container">
        <div className="row" style={{ display: "flex" }}>
          <div className="col" md="6" style={{ margin: "auto" }}>
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! You're lost.</h4>
              <p className="text-muted float-left">
                The page you are looking for was not found.
              </p>
            </div>
            <Link to="/" className="btn btn-primary">
              Kembali ke Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
