import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "../api";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../common/LoadingSpinner";
import Search from "../common/SearchForm";
import "./JobCardList.css";

function JobCardList({ jobs, apply }) {
  console.debug("JobCardList", "jobs=", jobs);
  const [allJobs, setAllJobs] = useState(null);
  // useEffect(function getAllJobsOnMount() {
  //   console.debug("JobCardList useEffect getAllJobsOnMount");
  //   getAllJobs();
  // }, []);

  const [jobsPerPage] = useState(5);
  const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getData = (jobs) => {
    console.log(jobs);
    return (
      <div>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
            companyHandle={job.companyHandle}
          />
        ))}
      </div>
    );
  };

  const getAllJobs = async (title) => {
    const jobs = await JoblyApi.getJobs(title);
    const slice = jobs.slice(offset - 1, offset - 1 + jobsPerPage);
    // For displaying Data
    const postData = getData(slice);
    // Using Hooks to set value
    setAllJobs(postData);
    setPageCount(Math.ceil(jobs.length / jobsPerPage));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getAllJobs();
  }, [offset]);

  if (!allJobs) return <LoadingSpinner />;

  return (
    <div className="JobCardList col-md-8 offset-md-2">
      <Search searchFor={getAllJobs} />
      {console.log(allJobs.props.children.length)}
      {allJobs.props.children.length == 0 ? ( //the same like CompanyList not working normal
        // ? allJobs :
        <p className="bg-danger text-light lead font-weight-bold text-center">
          Sorry, no results were found!
        </p>
      ) : (
        <div>
          {allJobs}
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default JobCardList;
