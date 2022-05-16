import React, { useState, useEffect } from "react";
import Routes from './Routes';
import { BrowserRouter} from 'react-router-dom';
import NavBar from './NavBar';
import UserContext from './UserContext';
import JoblyApi from './Api';
import useLocalStorage from './useLocalStorage';
import jwt from "jsonwebtoken";
import './App.css';

function App() {
  const INITIAL_STATE = {
    username: '',
    firstName: '',
    lastName: '',
    jobs: [],
    isLoggedIn: false
  }
  const [user, setUser] = useState(INITIAL_STATE);
  const [session, setSession] = useLocalStorage("token");

  const [applicationIds, setApplicationIds] = useState(new Set([]));
  

  // const [jobs, setJobs] = useState([]);

  //On load: if token exists in local storage, persist on site.
  //--get token, decrypt it, and then save data to USER state.
  // If error, send back errors to the console..
  useEffect(() => {
    async function getData(username) {
      let data = await JoblyApi.getUserProfile(username);
      setUser(user => ({
        isLoggedIn: true,
        username: username,
        firstName: data.firstName,
        lastName: data.lastName,
        jobs: data.applications
      }));
    }

    if (session) {
      let user = jwt.decode(session);
      JoblyApi.token = session;
      setApplicationIds(new Set(user.applications));
      try {
        getData(user.username);
      }
      catch (e) {
        console.log(e);
      }
    }
  }, [setUser, session]);

  //We register users with this function to Jobly Api, which posts to the backend.
  //If successful, save USER with data, save new token, and return success message. 
  //IF unsucessful, return errors. 
  const signup = async (formData) => {

    try {
      await JoblyApi.register(formData);
      setUser(user => ({
        ...user,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isLoggedIn: true
      }));

      setSession(JoblyApi.token);
      return { message: "success" };
    }
    catch (e) {
      console.error("failed", e);
      return { success: false, e };
    }
  }

  //Users can update their profile with this function, which posts to the back end on Jobly Api call.
  //If successful, save USER with data and return success message. 
  //IF unsucessful, return errors. 
  const updateUser = async (formData, username) => {
    try {
      await JoblyApi.updateUserProfile({ ...formData }, username);
      setUser(user => ({
        ...user,
        username: username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isLoggedIn: true
      }));
      return { message: "success" };
    }
    catch (e) {
      let formErrors = e.map(er => er);
      if (e.message) {
        formErrors = e.message.map(er => er);
      }
      return { message: formErrors };
    }
  }

  //LoginUser gives the user the ability to login. Data is checked on Jobly APi to the backend.
  //If successful, save USER with data, save new token, and return success message. 
  //IF unsucessful, return errors. 
  const loginUser = async (formData) => {
    try {
      await JoblyApi.login(formData);
      setUser(user => ({
        username: formData.username,
        isLoggedIn: true,
        ...user
      }));
      setSession(JoblyApi.token);
      return { message: "success" };
    }
    catch (e) {
      console.error("failed", e);
      return { success: false, e };
    }
  }

  //Logout will reset the session token to null for the user and will remove their data from the app instance.
  const logOut = () => {
    setUser(INITIAL_STATE);
    setSession(null);
  }

   /** Checks if a job has been applied for. */
   function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(user.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

//   const aply = async (type, item) => {
//     type === 'jobs' ? await JoblyApi.addjob(item) : await JoblyApi.addCompany(item);
// }

// const remove = async (id) => {
//             setJobs((jobs) => jobs.filter((job) => job.id !== id));
//     };

  return (
    <div className="App">
      <UserContext.Provider value={{user, hasAppliedToJob, applyToJob }}>
        <BrowserRouter>
          <NavBar logOut={logOut} />
          <main>
            <Routes signup={signup} loginUser={loginUser} updateUser={updateUser} />
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
