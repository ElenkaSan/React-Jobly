import React, { useState } from "react";

const FilterCompaniesForm = ({ findCompanies, resetCompaniesList }) => {

    const INITIAL_STATE = {
        minEmployees: 1,
        maxEmployees: 1000,
        name: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    //This handles the inputs as they are entered in by the user and saves to state. 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    //This handles the submission by the user and will either be successful or not. 
    const handleSubmit = (e) => {
        e.preventDefault();
        findCompanies({ ...formData });
        setFormData(INITIAL_STATE);
    }

    return (
        <div className="filter-co-div">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Company </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Company to search for"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="minEmployees">Minimum Number of Employees</label>
                <input
                    id="minEmployees"
                    type="number"
                    name="minEmployees"
                    min="1"
                    max="1000"
                    value={formData.minEmployees}
                    onChange={handleChange}
                />
                <label htmlFor="maxEmployees">Maximum Number of Employees</label>
                <input
                    id="maxEmployees"
                    type="number"
                    name="maxEmployees"
                    min="1"
                    max="1000"
                    value={formData.maxEmployees}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Find Companies</button>
                <button onClick={() => resetCompaniesList()}>Clear Filter</button>
            </form>

        </div>
    )

}

export default FilterCompaniesForm;