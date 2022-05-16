import React, { useState, useEffect } from "react";
import JoblyApi from "./Api";
import JobCard from "./JobCard";
import JobList from "./JobList";
import FilterJobsForm from "./FilterJobs";
import SearchForm from "./SearchForm";

const JobsList = () => {

    const [jobs, setJobs] = useState([]);

    //upon initial load, show all jobs.
    useEffect(function () {
        async function getJobs() {
            try {
                let data = await JoblyApi.getJobs();
                setJobs(data.map(d => d));
            }
            catch (e) {
                console.log(e);
            }
        }
        getJobs();
    }, []);

    //If there is a filter applied, re-render the component.
    const findJobs = async (formData) => {
        try {
            let data = await JoblyApi.getFilteredJobs(formData);
            setJobs(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

        const search = async (title) => {
        try {
            let data = await JoblyApi.getJobs(title);
            // setJobs(data);
            setJobs(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

    //If the user choosed to clear the filter, the "clear button" click 
    // will call this function to reset the jobs list.
    const resetJobsList = async () => {
        try {
            let data = await JoblyApi.getJobs();
            setJobs(data.map(d => d));
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="jobs">
            <h1>Jobs</h1>
            <SearchForm searchFor={search} resetJobsList={resetJobsList} />
        {jobs.length
            ? <JobList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
        }
            <FilterJobsForm findJobs={findJobs} resetJobsList={resetJobsList} />
            {jobs.map(j =>
            (
                <JobCard key={j.id} id={j.id} handle={j.companyHandle} title={j.title} salary={j.salary} equity={j.equity} name={j.companyName} />
            ))
            }
        </div>
    )
}

export default JobsList;