import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

function JobCard({
  id,
  title,
  salary,
  equity,
  companyName,
  companyHandle,
  state,
}) {
  console.debug("JobCard");
  const { hasAppliedToJob, applyToJob, unApplyToJob } = useContext(UserContext);
  // const [applied, setApplied] = useState(true);
  const [applied, setApplied] = useState(state);

  const apply = async () => {
    if (hasAppliedToJob(id)) return;
    {
      applyToJob(id);
      setApplied(true);
      console.log("job added", id);
    }
  };

  useEffect(() => {
    if (hasAppliedToJob) {
      setApplied(hasAppliedToJob(id));
    }
  }, [id, hasAppliedToJob]);

  const unapplied = async () => {
    unApplyToJob(id);
    setApplied(false);
    // updateUser(isLoggedIn)
    console.log("job removed", id);
  };

  const unappliedButton = (
    <button
      onClick={unapplied}
      className="JobCard-button btn btn-outline-success font-weight-bold text-uppercase float-right"
    >
      Unapplied{" "}
    </button>
  );

  const applyButton = (
    <button
      onClick={apply}
      className="JobCard-button btn btn-warning font-weight-bold text-uppercase float-right"
    >
      Apply{" "}
    </button>
  );

  return (
    <section>
      <Card className="JobCard card">
        {" "}
        {applied}
        <CardBody className="job-card-body">
          <CardTitle className="font-weight-bold text-center">
            <h6 className="card-title">
              {title} (Job id: {id})
            </h6>
          </CardTitle>
          <CardSubtitle>
            <NavLink className="text-info" to={`/companies/${companyHandle}`}>
              <h5> {companyName} </h5>
            </NavLink>
          </CardSubtitle>
          <CardText className="font-italic">
            Salary: {salary ? `$ ${salary}` : "N/A"}
            <br></br>
            Equity: {+equity ? equity : "None"}
          </CardText>
          {applied ? unappliedButton : applyButton}

          {/* <CardBody className="job-card-body"> */}
          {/* <p>
          {applied ?
          <button
            className="btn btn-outline-success font-weight-bold text-uppercase float-right"
            onClick={apply}  
            >
            Applied
          </button>
          :
          <button className="btn btn-warning font-weight-bold text-uppercase float-right"
          onClick={apply}>Apply</button>
          }
          </p> */}
        </CardBody>
      </Card>
    </section>
  );
}

export default JobCard;
