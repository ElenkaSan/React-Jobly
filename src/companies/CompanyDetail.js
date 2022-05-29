import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JoblyApi from "../api";
import LoadingSpinner from "../common/LoadingSpinner";
import CompanyHeader from "./CompanyHeader";
import JobCard from "../jobs/JobCard";

const CompanyDetail = () => {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState({name: "", numEmployees: 0, description: "", jobs: []});

  useEffect( () => {
    async function getCompany() {
       let company = await JoblyApi.getCompany(handle) || null;
       setCompany(company);
    }
    getCompany();
  }, [handle]);
  
  if (!company) return <LoadingSpinner />;

  return (
    <div>
      <div className="CompanyDetail col-md-8 offset-md-2 text-center">
        <CompanyHeader {...company} />
        <section className="text-start">
          <h2 className="font-italic text-secondary text-start bg-light border border-top-0"> 
          Job Listings   
           <Link className="btn btn-outline-secondary" style={{ margin:'1em' }} to='/companies'>
           Go Back
          </Link></h2>
          <br></br>
          </section>
          </div>
        <div className="col-md-8 offset-md-2">
          {company.jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
              companyHandle={job.companyHandle}
             />
           ))}
        </div>
      </div>
  );
}


export default CompanyDetail;
