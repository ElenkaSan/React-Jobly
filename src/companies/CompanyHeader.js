import React from "react";
import "./CompanyCard.css";

const CompanyHeader = ({name, numEmployees, description, jobs, logoUrl}) => {
    return (
      <section className="CompanyCard">
         <div className="card bg-light">
        <div className="row">
          <h1 className="ml-5 stretched-link">{name}</h1>
          {logoUrl && <img style={{objectFit: "contain"}} className="col-2 float-right" src={logoUrl} alt={name} />}
          </div>
        <div className="mr-md-3 "> 
          <h6 className="font-weight-bold text-secondary">
            {numEmployees} Employees, {jobs.length} Open Positions 
          </h6>
          <p>{description}</p> 
        </div>
        </div>
      </section>
    )
  }
  
  export default CompanyHeader;