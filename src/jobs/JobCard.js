import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

function JobCard({
  id,
  title,
  salary,
  equity,
  companyName,
  companyHandle,
  remove,
}) {
  console.debug("JobCard");
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  const apply = async () => {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
    console.log("job added", id);
  };

  useEffect(() => {
    if (hasAppliedToJob) {
      setApplied(hasAppliedToJob(id));
    }
  }, [id, hasAppliedToJob]);

  // const remove = async (id) => {
  //   setApplied((hasAppliedToJob) => hasAppliedToJob.filter((job) => job.id !== id));
  //     };

  return (
    <section>
      <Card className="JobCard card">
        {" "}
        {applied}
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            <h6 className="card-title">{title}</h6>
          </CardTitle>
          <CardSubtitle>
            <NavLink className="text-info" to={`/companies/${companyHandle}`}>
              Company: {companyName}
            </NavLink>
          </CardSubtitle>
          <br></br>
          <CardText className="font-italic">
            Salary: {salary ? `$ ${salary}` : "N/A"}
          </CardText>
          <CardText className="font-italic">
            Equity: {+equity ? equity : "None"}{" "}
          </CardText>
        </CardBody>
        <CardBody className="job-card-body">
          <button
            className="btn btn-warning font-weight-bold text-uppercase float-right"
            onClick={apply}
            disabled={applied}
          >
            {applied
              ? "Applied" && (
                  <button
                    className="btn text-info btn-outline-warning btn-sm"
                    style={{}}
                    onClick={() => remove({ id: hasAppliedToJob.id })}
                  >
                    {" "}
                    Remove from Applied{" "}
                  </button>
                )
              : "Apply"}
          </button>
        </CardBody>
      </Card>
    </section>
  );
}

export default JobCard;
