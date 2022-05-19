import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

import "./Homepage.css";
import UserContext from "../auth/UserContext";
import NoLoggedIn from "./NoLoggedIn";
import ProfileForm from "../profiles/ProfileForm";
import JoblyApi from "../api";
import JobCard from "../jobs/JobCard";
// import useToggle from "../hooks/useToggle";

// function Homepage({ companies, jobs, title, id, remove }) {
// function Homepage() {
function Homepage({ id, title, remove }) {
  const { isLoggedIn, hasAppliedToJob, jobs } = useContext(UserContext);
  console.debug("Homepage", "isLoggedIn=", isLoggedIn);
  const [profileJobs, setProfileJobs] = useState([]);
  // const [jobs, setJobs] = useState([]);
  // const [hasApplied, setHasApplied] = useState(false);
  const [applied, setApplied] = useState();
  // const { hasAppliedToJob } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  // const [isUpdate, setIsUpdate] = useToggle(false);
  // const { username, jobs } = useContext(UserContext);

  useEffect(() => {
    if (hasAppliedToJob) {
      setApplied(hasAppliedToJob(id));
    }
  }, [id, hasAppliedToJob]);

  useEffect(
    function () {
      async function getProfile() {
        try {
          let data = isLoggedIn.username;
          setProfile(data);
          const jobs = isLoggedIn.applications;
          if (jobs.length > 0) {
            const jobDetails = await (
              await JoblyApi.getJobsByIds(jobs)
            ).map((j) => j.job);
            setProfileJobs(() => jobDetails);
          }
        } catch (e) {
          console.log(e);
        }
      }
      getProfile();
    },
    [jobs]
  );

  //when users add jobs, this will ensure jobs are updated on the profile or else the data becomes stagnant.
  const resetJobs = async () => {
    if (jobs.length > 0) {
      let jobList = await JoblyApi.getJobs();
      let appliedJobs = jobList
        .map((job) => {
          for (let x of jobs) {
            if (x === job.id) {
              return job;
            }
          }
          return appliedJobs;
        })
        .filter((job) => job != null);
      setProfileJobs(appliedJobs.map((a) => a));
    }
  };

  return (
    <section
      className="d-flex justify-content-center"
      style={{ margin: "50px" }}
    >
      <Card className="Home">
        <CardBody className="text-center">
          <CardTitle>
            <h1 className="font-weight-bold font-italic text-info">
              Welcome to Jobly!
            </h1>
            <h2>All the jobs in one place!</h2>
          </CardTitle>
          <CardText>
            <h3>
              {isLoggedIn ? (
                <>
                  <h3 className="text-warning">{`Welcome back, ${isLoggedIn.username}!`}</h3>
                  <NavLink exact to="/profile">
                    <button className="btn btn-outline-warning">
                      {" "}
                      Update Profile{" "}
                    </button>
                  </NavLink>
                  <br></br>
                  {/* <NavLink exact to="/companies">
                  <button className='btn btn-outline-secondary btn-m' style={{ margin: '2rem'}}>Companies */}
                  {/* {companies.length}  */}
                  {/* </button>
                </NavLink>
                <NavLink exact to="/jobs">
                  <button className='btn btn-outline-secondary btn-m' style={{ margin: '2rem'}}>Jobs */}
                  {/* {jobs.length}  */}
                  {/* </button>
                </NavLink> */}
                  <br></br>

                  <h2>Your Submitted Applications:</h2>
                  <br></br>

                  {
                    false ? (
                      ""
                    ) : (
                      <>
                        <section>
                          {profileJobs.map((j) => (
                            <JobCard
                              key={j.id}
                              id={j.id}
                              companyName={j.company?.name}
                              title={j.title}
                              salary={j.salary}
                              equity={j.equity}
                              companyHandle={j.company?.handle}
                            />
                          ))}
                          <button
                            className="btn btn-outline-warning btn-sm"
                            style={{}}
                            onClick={() => remove({ id: title.id })}
                          >
                            {" "}
                            Remove from Applied{" "}
                          </button>
                        </section>
                      </>
                    )
                    //   <div className="JobCard card"> {applied}
                    //   <div className="card-body">
                    //   <h6 className="card-title">{title}</h6>
                    //   <p>{companyName}</p>
                    //   <p> Salary: ${salary}</p>
                    //   <p> Equity: {equity}</p>
                    //   <button
                    //   className="btn btn-sm btn-danger font-weight-bold text-uppercase float-right"
                    //   disabled={applied}> </button>
                    //     </div>
                    //  </div>
                    //  <p>Applied</p>
                    // :
                    // <button className='btn btn-outline-warning btn-sm' style={{ }} onClick={() => remove({ id: title.id })}> Remove from Applied </button>
                    //  <button className="btn btn-danger font-weight-bold text-uppercase float-right" onClick={resetJobs} >
                    //    Remove</button>
                  }

                  {/* {hasApplied
                ? <ProfileForm resetJobs={resetJobs} getJobs={getJobs} setHasApplied={setHasApplied} applyToJob={applyToJob} />
                : 
                (<> 
                    <section>
                        <h2>Your Submitted Applications:</h2>
                        {profileJobs.map(j =>
                        ( <JobCard key={j.id} id={j.id} handle={j.companyHandle} title={j.title} salary={j.salary} equity={j.equity} companyName={j.companyName} />
                        ))
                        }
                    </section>
                </>)
                  }  */}
                </>
              ) : (
                <>
                  <h3>Please login or sign up to access companies and jobs!</h3>
                  <NoLoggedIn />
                </>
              )}
            </h3>
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Homepage;
