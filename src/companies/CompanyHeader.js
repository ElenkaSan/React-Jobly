import React from "react";
// import "./CompanyCard.css";

const DEFAULT_LOGO = 'https://png.pngtree.com/svg/20170307/the_company_default_logo_574534.png';

const CompanyHeader = ({name, numEmployees, description, jobs, logoUrl}) => {
    return (
      <section>
         <div className="card bg-light border-bottom-0">
        <div className="row">
          <h1 className="ml-4 mr-3 text-left">{name}</h1>
          <img style={{objectFit: "contain"}} className="col-2 float-right" src={logoUrl || DEFAULT_LOGO} alt={name} />
          </div>
        <div className="ml-3 mr-3 text-left"> 
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