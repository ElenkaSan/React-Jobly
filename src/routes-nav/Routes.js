import React, { useState, useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import UserContext from "../auth/UserContext";

const Routes = ({ id, login, signup }) => {
  const { isLoggedIn } = useContext(UserContext);
  const [hasApplied, setHasApplied] = useState(false);
  const [jobs, setJobs] = useState([]);

  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );


useEffect(() => {
  if (jobs) {
      setHasApplied(jobs.some(job => job === id));
  }
}, [id, jobs])

  const remove = async (id) => {
    setJobs((jobss) => jobss.filter((job) => job.id !== id));
  };


  return (
      <div className="pt-5">
        <Switch>
        {isLoggedIn
                ? (<>
          <Route exact path="/">
            <Homepage hasApplied={hasApplied} remove={remove} />
          </Route>
          
          <Route exact path="/companies">
            <CompanyList />
          </Route>

          <Route exact path="/jobs">
            <JobList />
          </Route>

          <Route exact path="/companies/:handle">
            <CompanyDetail />
          </Route>

          <Route path="/profile">
            <ProfileForm />
          </Route>
        
          <Redirect to="/" />
          </>)
                : (<>
                  <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Redirect to="/" />
                </>)
            }
        </Switch>
      </div>
  );

  
}

export default Routes;
