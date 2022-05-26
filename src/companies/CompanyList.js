import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api";
import ReactPaginate from 'react-paginate';
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";

function CompanyList() {
  console.debug("CompanyList");
  const [companies, setCompanies] = useState(null);

  // useEffect(function getCompaniesOnMount() {
  //   console.debug("CompanyList useEffect getCompaniesOnMount");
  //   search();
  // }, []);
  
  const [companiesPerPage] = useState(5);
  const [offset, setOffset] = useState(1);
  const [pageCount, setPageCount] = useState(0)

  const getData = (companies) => {
    {console.log(companies)}
    return (
      <div>
        {companies.map((c) => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
             />
        ))}
      </div>
    )
  }

  const search = async (name) => {
    let companies = await JoblyApi.getCompanies(name);
    // setCompanies(companies);
    const slice = companies.slice(offset - 1 , offset - 1 + companiesPerPage)
     // For displaying Data
     const postData = getData(slice)
     // Using Hooks to set value
     setCompanies(postData);
     setPageCount(Math.ceil(companies.length / companiesPerPage))
  }

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1)
  };
  
  useEffect(() => {
    search()
  }, [offset])

  if (!companies) return <LoadingSpinner />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {!companies.length ? companies : //not work normally
        <p className="bg-danger text-light lead font-weight-bold text-center">Sorry, no results were found!</p>
      }
      {/* {companies} */}
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
          activeClassName={"active"} />
      </div>
    </div>
  );
}

export default CompanyList;
