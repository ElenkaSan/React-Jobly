import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./JobCard.css";
import UserContext from "../auth/UserContext";
// import getProfile from "../homepage/Homepage";

function JobCard({ id, title, salary, equity, companyName, companyHandle}) {
  console.debug("JobCard");
  const { hasAppliedToJob, applyToJob, removeApplied} = useContext(UserContext);
  const [applied, setApplied] = useState();

  
  const apply = async () => {
    if (hasAppliedToJob(id))
    {
      // applyToJob(id);

      // const removeItem = applied.map((j) => j.job).filter(job => job.id !== id);
      // = applied.filter((job) => {
      //   return job.id !== id;
      // });
      // setApplied(removeItem);
      setApplied(false)
      removeApplied(id)
      console.log("job removed", id);
      return;
    }
    else {
      applyToJob(id);
      setApplied(true);
      console.log("job added", id);
    }
    return
  }

  useEffect(() => {
    if (hasAppliedToJob) {
      setApplied(hasAppliedToJob(id));
    }
  }, [id, hasAppliedToJob])


  return (
    <section>
      <Card className="JobCard card"> {applied} 
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            <h6 className="card-title">{title} (Job id: {id})</h6>
          </CardTitle>
          <CardSubtitle>
            <NavLink className="text-info" to={`/companies/${companyHandle}`}>
            <h5> {companyName} </h5>
            </NavLink>
          </CardSubtitle>
          <br></br>
          <CardText className="font-italic">
            Salary: {salary ? `$ ${salary}` : "N/A"}</CardText>
          <CardText className="font-italic">Equity: {+equity ? equity : 'None'} </CardText>
        </CardBody>
    
        <CardBody className="job-card-body">
          <p>
          {applied ?
          <button
            className="btn btn-outline-success font-weight-bold text-uppercase float-right"
            onClick={apply} 
            // style={{ }} onClick={(j) =>removeApplied({ id: j.id })}
            >
            Applied
          </button>
          :
          <button className="btn btn-warning font-weight-bold text-uppercase float-right"
          onClick={apply}>Apply</button>
          }
          </p>
        </CardBody>
      </Card>
  </section>
  );
}

export default JobCard;
