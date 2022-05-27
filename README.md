# Unit 43 React Front End to Jobly BackEnd
This project tied in the back end API to build out a job board site with mock data.
It utilizes authentication to the backend, showing companies and their jobs, and allowing the user to apply to these jobs.

Tech used: Components, Props, Custom Hooks, React Hooks (useContext, useState, useEffect, Browser Routing, Navigation Routes)

1. Clone this repo 

  `git clone`
  
2. cd into the "backend" directory, install required packages, create and seed database, and start the server. (Make sure that you have postgreSQL installed)

  `cd backend`  
  `npm install`  
  `createdb jobly`  
  `psql jobly < data.sql`  
  `nodemon server.js`  
  
  This will start the server on port 3001
  
3. cd into the "frontend" directory, install required packages, then start the app 

  `cd frontend  
  npm install  
  npm start`  
  
  This will run your app on http://localhost:3000

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Step Zero: Setup
  Utlize the backend express-jobly exercise.
  Re-create the jobly database from the backend solution using the jobly.sql file.
  Create a new React project.
  Utilized port 3001 for backend and 3000 for front end.
## Step One: Design Component Hierarchy
  Designed component hierarchies.
  Determine props to use and data required.
## Step Two: Make an API Helper
  Utilized a single JoblyAPI class, which will have helper methods for centralizing this data requests to the backend. information.
  Built the following API calls to the backend: login, signup, getUserProfile, saveProfile, deleteUser, getCompanies, getCompany, getJobs, applyToJob, and getJobsByIds.
## Step Three: Make Your Routes File
  Made routes
  Made Navigation bar
## Step Four: Companies & Company Detail
  Built out components for showing detail on a company, showing the list of all companies, and showing simple info about a company on the list.
  Made filters to filter out companies.
## Step Five: Jobs
  Build out components that lists all jobs, and the “job card”, which shows info on a single job.
## Step Six: Current User
  Added features where users can log in, sign up, and log out.
  Retrieved information about login user and tracking info.
  Developed forms for logging in and signing up
  Created links to the login and signup forms if a user is not currently logged in.
  If someone is logged in, app will show their username in the navigation, along with a way to log out.
  Developed the homepage to show different messages if the user is logged in or out.
  Saves the token from the login and register processes and stores that token on the JoblyApi class.
## Step Seven: Using localStorage and Protecting Routes
  Developed a hook for localStorage to store the token which will allow for saving the users session.
  Protecting Routes
  Developed protected routes for jobs page, or a company details page.
## Step Eight: Profile Page
  Added feature where the logged-in user can edit their profile. Made sure that when a user saves changes here, those are reflected elsewhere in the app.
## Step Nine: Job Applications
  Added the ability for a user to apply for jobs.
  Added a button to apply for a job in company detail jobs and jobs list.
  If user has already applied to a job, app reflects this.
## Step Ten: Deploy Application
  Deploy to Heroku
## Jobly Further Study
### Nav Links
  If you haven’t already done so, make it so that the links in the navigation bar appear differently when you’re already on that page.
### Pagination / Companies list and Job list
  Since there are so many companies and jobs, it’s unwieldy to see them all listed. Add “batched pagination”, so that users see 20 at a time, and can move among those batches (and make sure it works with the search!)
### Un-Apply to Jobs / Homepage and Job list
  Add a feature where, when you click on the “already applied” button for a job, you can unapply. This may require you to add an endpoint to your backend server — a nice chance to reacquaint yourself with Express!
### Show A List of Companies Applied To // On the Homepage you can see applied jobs list when login / signup
  It would be nice to see the companies a user has applied to, add a component and route to display this information.

