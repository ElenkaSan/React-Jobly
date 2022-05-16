import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', function() {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});



import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import NavBar from './NavBar';
import Router from './Router';
import UserContext from './UserContext';
import JoblyApi from './routes/api';
import useLocalStorage from './helpers/useLocalStorage';
import jwt from "jsonwebtoken";

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
  const registerUser = async (formData) => {

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
      let formErrors = e;
      if (e.message) {
        formErrors = e.message;
      }
      return { message: formErrors };
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
      let formErrors = e.map(er => er);
      if (e.message) {
        formErrors = e.message.map(er => er);
      }
      return { message: formErrors };
    }
  }

  //Logout will reset the session token to null for the user and will remove their data from the app instance.
  const logOut = () => {
    setUser(INITIAL_STATE);
    setSession(null);
  }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <NavBar logOut={logOut} />
          <main>
            <Router registerUser={registerUser} loginUser={loginUser} updateUser={updateUser} />
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
