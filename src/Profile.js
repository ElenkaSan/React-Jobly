import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./Api";
import UserContext from "./UserContext";
import ProfileUpdate from "./ProfileUpdate";
import useToggle from "./useToggle";
import JobCard from "./JobCard";

const Profile = ({ updateUser }) => {

    const [profile, setProfile] = useState({});
    const [isUpdate, setIsUpdate] = useToggle(false);
    const [profileJobs, setProfileJobs] = useState([]);
    const { username, jobs } = useContext(UserContext);

    //upon load, the app will get the jobs on the user global profile and add the job information to display.
    useEffect(function () {
        async function getProfile() {
            try {
                let data = await JoblyApi.getUserProfile(username);
                setProfile(data);
                console.log(jobs);
                if (jobs.length > 0) {
                    let jobList = await JoblyApi.getJobs();
                    let appliedJobs = jobList.map((job) => {
                        for (let x of jobs) {
                            if (x === job.id) {
                                return job;
                            }
                        }
                    }).filter(job => job != null);
                    setProfileJobs(appliedJobs.map(a => a));
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        getProfile();
    }, [username]);

    //when users add jobs, this will ensure jobs are updated on the profile or else the data becomes stagnant.
    const resetJobs = async () => {
        if (jobs.length > 0) {
            let jobList = await JoblyApi.getJobs();
            let appliedJobs = jobList.map((job) => {
                for (let x of jobs) {
                    if (x === job.id) {
                        return job;
                    }
                }
            }).filter(job => job != null);
            setProfileJobs(appliedJobs.map(a => a));
        }
    }

    return (
        <div>
            {isUpdate
                ? <ProfileUpdate resetJobs={resetJobs} updateUser={updateUser} setProfile={setProfile} setIsUpdate={setIsUpdate} username={profile.username} email={profile.email} firstName={profile.firstName} lastName={profile.lastName} />
                : (<><h1>Your Profile</h1>
                    <h3>Username: {profile.username}</h3>
                    <h3>First Name: {profile.firstName}</h3>
                    <h3>Last Name: {profile.lastName}</h3>
                    <h3>Email: {profile.email}</h3>
                    <button onClick={setIsUpdate}>Update Profile</button>
                    <section>
                        <h2>Your Submitted Applications:</h2>
                        {profileJobs.map(j =>
                        (
                            <JobCard key={j.id} id={j.id} handle={j.companyHandle} title={j.title} salary={j.salary} equity={j.equity} name={j.companyName} />
                        ))
                        }
                    </section>
                </>)
            }
        </div>
    )
}

export default Profile;