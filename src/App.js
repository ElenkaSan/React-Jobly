import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "isLoggedIn=", isLoggedIn,
      "token=", token,
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getUserProfile() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let isLoggedIn = await JoblyApi.getUserProfile(username);
          setIsLoggedIn(isLoggedIn);
          setApplicationIds(new Set(isLoggedIn.applications));
        } catch (err) {
          console.error(err);
          setIsLoggedIn(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getUserProfile();
  }, [token]);
 

  const signup = async (signupData) => {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err };
    }
  }

  const login = async (loginData) => {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error(err);
      return [false, err.message];
    }
  }

  const logout = () => {
      setIsLoggedIn(null);
      setToken(null);
    }

  const hasAppliedToJob = (id) => {
    return applicationIds.has(id);
  }

  const applyToJob = async (id) => {
    if (hasAppliedToJob(id)) return;
    try{
      // JoblyApi.applyToJob(isLoggedIn.username, id);
      JoblyApi.apply(id, isLoggedIn.username);
      setApplicationIds(new Set([...applicationIds, id]));
      // updateCurrentUser()
    } catch (err) {
      console.error(err.message);
    }
  }
   
  const unApplyToJob = async (id) => {
    try {
      // let data = await JoblyApi.unApplyToJob(isLoggedIn.username, id);
      await JoblyApi.unapplied(id, isLoggedIn.username);
      // const removeIt = new Set(applicationIds);
      // removeIt.delete(id);
      // setApplicationIds(removeIt);
      updateCurrentUser();
    } catch (err) {
      console.error(err.message);
    }
  }

  async function updateCurrentUser() {
    try {
      let token = await JoblyApi.getUserProfile(isLoggedIn.username);
      setApplicationIds(new Set(isLoggedIn.applications));
      updateUser(token);
      return { success: true };
    } catch (err) {
      console.error(err);
      setIsLoggedIn(null);
      return [false, err.message];
    }
  } 

  const updateUser = (newUser) => {
    setIsLoggedIn(newUser)
  };

  if (!infoLoaded) return <LoadingSpinner />;

  return (
      <BrowserRouter>
        <UserContext.Provider
            value={{ isLoggedIn, 
                    updateUser, 
                    setIsLoggedIn,
                    hasAppliedToJob,
                    applyToJob, 
                    unApplyToJob,
                    updateCurrentUser,
                    applicationIds }}>
          <div className="App">
            <Navigation logout={logout} />
            <Routes login={login} signup={signup} />
            {/* <Routes login={login} signup={signup} updateUser={updateUser}/> */}
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
