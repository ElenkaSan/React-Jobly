import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobCardList from "../jobs/JobCardList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../auth/ProfileForm";
import SignupForm from "../auth/SignupForm";
import UserContext from "../auth/UserContext";

const Routes = ({ login, signup }) => {
  const { isLoggedIn } = useContext(UserContext);

  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
      <div className="pt-5">
        <Switch>
        {isLoggedIn
                ? (<>
          <Route exact path="/">
            <Homepage />
          </Route>
          
          <Route exact path="/companies">
            <CompanyList />
          </Route>

          <Route exact path="/jobs">
            <JobCardList />
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
