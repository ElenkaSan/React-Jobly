import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./Api";
import CompanyCard from "./CompanyCard";
import FilterCompaniesForm from "./FilterCompanies";
import SearchForm from "./SearchForm";

const CompaniesList = () => {

    const [companies, setCompanies] = useState([]);

    //upon intial render, get all companies
    useEffect(function () {
        async function getCompanies() {
            try {
                let data = await JoblyApi.getCompanies();
                setCompanies(data);
            }
            catch (e) {
                console.log(e);
            }
        }
        getCompanies();
    }, []);

    //this will render companies with the filter
    const findCompanies = async (formData) => {
        try {
            let data = await JoblyApi.getFilteredCompanies(formData);
            setCompanies(data);
        }
        catch (e) {
            console.log(e);
        }
    }

        const search = async (name) => {
        try {
            let companies = await JoblyApi.getCompanies(name);
            setCompanies(companies);
          }
        catch (e) {
            console.log(e);
        }
    }

    //this will clear the filter and provide all companies
    const resetCompaniesList = async () => {
        try {
            let data = await JoblyApi.getCompanies();
            setCompanies(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="Companies">
            <h1>Companies</h1>
            <SearchForm searchFor={search} resetCompaniesList={resetCompaniesList}/>
            <FilterCompaniesForm findCompanies={findCompanies} resetCompaniesList={resetCompaniesList} />
            {companies.length
            ? (
                <div className="CompanyList-list">
            {companies.map(c =>
            (
                <Link to={`companies/${c.handle}`} key={c.handle}>
                    <CompanyCard key={c.handle} handle={c.handle} name={c.name} description={c.description} logoSrc={c.logoUrl} numEmployees={c.numEmployees} />
                </Link>
            ))
            }
        </div>
        ) : (
            <p className="lead">Sorry, no results were found!</p>
        )}
  </div>
    )
}

export default CompaniesList;