import React, { useContext, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

import "./Homepage.css";
import UserContext from "../auth/UserContext";
import NoLoggedIn from "./NoLoggedIn";
import JoblyApi from "../api";
import JobCard from "../jobs/JobCard";
import useToggle from "../hooks/useToggle";

import ProfileForm from "../auth/ProfileForm";

// function Homepage({ companies, jobs, title, id, remove }) {
  const Homepage = ({ updateUser }) => {
  const { isLoggedIn,  applicationIds } = useContext(UserContext);
  console.debug("Homepage", "isLoggedIn=", isLoggedIn);
  const [profileJobs, setProfileJobs] = useState([]);
  const [profile, setProfile] = useState({});
  const [isUpdate, setIsUpdate] = useToggle(false);

    useEffect(
      function () {
        async function getProfile() {
            try {
                let data = await JoblyApi.getUserProfile(isLoggedIn.username)
                setProfile(data);
                const jobs = [...applicationIds];
                console.log(jobs);
                if (jobs.length > 0) { 
                  const jobDetails = (await JoblyApi.getJobsByIds(jobs)).map((j) => j.job);
                  // const jobDetails = (await JoblyApi.getJobsByIds(jobs)).map((j) => j.job).filter(job => job != null);
                  setProfileJobs(() => jobDetails);
                  // setProfileJobs(jobDetails.map(a => a));
                } else {
                  setProfileJobs([]);
                }      
              } catch (e) {
                console.log(e);
            } 
        }
        getProfile();
  }, [isLoggedIn, applicationIds]);

return (
  <section className="Home justify-content-center"
   style={{ margin: '20px'}}
   >
    <Card className="card col-md-8 offset-md-2 text-center bg-secondary">
      <CardBody className="text-center">
        <CardTitle>
          <h1 className="font-weight-bold font-italic text-light">
            Welcome to Jobly!
          </h1>
          <h2>All the jobs in one, convenient place.</h2>
        </CardTitle>
        <CardText>
          <h3> 
          <hr />
            {isLoggedIn
            ? (<>  
              <h3 className="text-warning">{`Welcome back, ${isLoggedIn.username}!`}</h3>
          
              {isUpdate
                ? <ProfileForm 
                updateUser={updateUser} 
                setProfile={setProfile} 
                setIsUpdate={setIsUpdate}
                />
                : (<>
                <NavLink exact to="/profile">
                  <button className="btn btn-outline-warning"> Update Profile </button>
                </NavLink>
                <br></br>
                <hr />
                <h2 className="text-light font-italic">Your Submitted Applications:</h2>
                { false
                     ? (
                      ""
                    ) : (
                      <section> 
                        <h5 className="text-dark">
                      {profileJobs.map((j) =>
                      ( <JobCard key={j.id} 
                        id={j.id} 
                        companyHandle={j.company.handle} 
                        title={j.title}
                         salary={j.salary} 
                         equity={j.equity}
                          companyName={j.company.name}
                          state={j.state}
                          />
                      ))
                      } </h5>
                  </section>)}
                  </>)}
                  </>) 
                   : (<> 
                  <h3>Please login or sign up to access companies and jobs!</h3>
                  <NoLoggedIn />
                   </>) 
                   } 
              </h3>
        </CardText>
      </CardBody>
    </Card>
  </section>
)
}

export default Homepage;
