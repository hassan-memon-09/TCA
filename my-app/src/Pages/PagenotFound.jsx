import React from "react";
import Layout from "../Component/Layout/layout";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-tittle">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PagenotFound;
