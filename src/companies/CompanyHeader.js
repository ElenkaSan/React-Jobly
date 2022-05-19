import React from "react";

const CompanyHeader = ({name, numEmployees, description, jobs, logoUrl}) => {
    return (
      <section className="text-start">
        <div className="col-md-10 offset-md-2">
          <h1>{name}
          {logoUrl && <img style={{objectFit: "contain"}} className="col-2" src={logoUrl} alt={name} />}
          </h1>     
          </div>
        <div className="text-start"> 
          <h6 className="font-weight-bold text-secondary">
            {numEmployees} Employees, {jobs.length} Open Positions 
          </h6>
          <p>{description}</p> 
        </div>
      </section>
    )
  }
  
  export default CompanyHeader;