import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import CompanyHeader from "./CompanyHeader";

const CompanyDetail = () => {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState({
    name: "",
    numEmployees: 0,
    description: "",
    jobs: [],
  });

  useEffect(() => {
    async function getCompany() {
      let company = (await JoblyApi.getCompany(handle)) || null;
      setCompany(company);
    }
    getCompany();
  }, [handle]);

  if (!company) return <LoadingSpinner />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <CompanyHeader {...company} />
      <hr />
      <section className="text-start">
        <h5 className="font-italic">
          Job Listings
          <Link
            className="btn btn-secondary"
            style={{ margin: "1em" }}
            to="/companies"
          >
            Go Back
          </Link>
        </h5>
        <JobCardList jobs={company.jobs} />
      </section>
    </div>
  );
};

export default CompanyDetail;
