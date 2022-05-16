// Look at the working demo to see the routes you’ll need:
// +/ Homepage — just a simple welcome message Jobly: ‘/‘ Home page: 
// Said:  Welcome back Elena ( Better to see for applied jobs here - applied and un apply !) 
// + /companies - List all companies -> Search bar (searchFor()) & Comp list ; 
// + /companies/id - View details of this company - comp details (the same job details) with apply 
// + /jobs - List all jobs ->  Search bar (searchFor())  & job details with apply
// +/login -  Login/signup
// + /profile -  Edit profile page ->  show fill out form with change password - alert

// when sign up then LOGOUT 

// Jobly _ Login _ log out 
// Homepage: bal bla all job one place & Please login or sigh up to see jobs:
// /signup - Signup Form (Profiles) - Alert
// /Login  - alert 
import React, { useState, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import JoblyApi from "./Api";
// import NavBar from "./NavBar";
// import JobCard from "./JobCard";
import JobList from "./JobList";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail"

import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm"
import Profile from "./Profile";
import NotFound from "./NotFound";
import UserContext from "./UserContext";


const Routes = ({ loginUser, signup, updateUser }) => {
    const { isLoggedIn } = useContext(UserContext);

    const [jobs, setJobs] = useState([]);
    // const [companies, setCompanies] = useState([]);
  
    // useEffect(() => {
    //   async function getLists() {
    //     let jobs = await JoblyApi.getJobs();
    //     let companies= await JoblyApi.getCompanies();
    //     setJobs(jobs);
    //     setCompanies(companies);
    //   }
    //   getLists();
    // }, []);
    
const aply = async (type, item) => {
    type === 'jobs' ? await JoblyApi.addjob(item) : await JoblyApi.addCompany(item);
}
	

const remove = async (id) => {
            setJobs((jobs) => jobs.filter((job) => job.id !== id));
    };


return (
    <Switch>
        {isLoggedIn
            ? (<>
                <Route exact path="/profile">
                    <Profile updateUser={updateUser} />
                </Route>
                <Route exact path="/companies">
                    <CompanyList />
                </Route>
                <Route exact path="/companies/:handle">
                    <CompanyDetail />
                </Route>
                <Route exact path="/jobs">
                    <JobList />
                </Route>

                <Route exact path="/">
                   <Home jobs={jobs} aply={aply} remove={remove} />{/* wanna see applied jobs when login */}
                </Route>

                <Route>
                   <p>Hmmm. I can't seem to find what you want.</p>
                </Route>
                <Route><NotFound /></Route>

                <Redirect to="/" />
            </>)
            : (<>
                <Route exact path="/login">
                    <LoginForm loginUser={loginUser} />
                </Route>
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Redirect to="/" />
            </>)
        }

    </Switch>
)

// return (
//     <div className="App">
//         <NavBar />
//         <main>
//           <Switch>
//             <Route exact path="/">
//               <Home jobs={jobs} aply={aply} remove={remove} />   {/* applied */}
//             </Route>
//             <Route exact path="/companies">
//               <CompanyList companies={companies} title="Companies" />
//             </Route>
//             <Route path="/companies/:id">
//               <JobCard items={jobs} cantFind="/jobs" goBack="companies" />
//             </Route>
//             <Route exact path="/jobs">
//               <JobList items={jobs} cantFind="/jobs" title="Jobs" />
//             </Route>
//             <Route path="/profile">
//               <Profile profile={profile} cantFind="/profile" />
//             </Route>
//             <Route exact path="/login">
//                 <SignupForm aply={aply} />
// 		    </Route>
//             <Route>
//               <p>Hmmm. I can't seem to find what you want.</p>
//             </Route>
//             <Route><NotFound /></Route>
//             <Redirect to="/" />
//           </Switch>
//         </main>
//     </div>
//   );
}

export default Routes;