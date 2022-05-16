import React, { useState } from "react";

const ProfileUpdate = ({ username, email, firstName, lastName, resetJobs, setIsUpdate, setProfile, updateUser }) => {

    const INITIAL_STATE = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [hasErrors, setHasErrors] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    //This handles the inputs as they are entered in by the user and saves to state. 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    //This handles the submission by the user and will either be successful or not. 
    const handleSubmit = async (e) => {

        e.preventDefault();
        let response = await updateUser({ ...formData }, username);
        if (response.message === "success") {
            setFormData(INITIAL_STATE);
            setProfile({ ...formData, username: username });
            setIsUpdate();
            resetJobs();
        }
        else {
            setHasErrors(true);
            let newErrors = response.message;
            setFormErrors(newErrors.map(n => n));
        }
        setFormData(INITIAL_STATE);
    };

    return (
        <div>
            <h1>Update Profile for {username} </h1>
            <form onSubmit={handleSubmit}>
                {hasErrors
                    ? (<div>We have a problem Houston!
                        <ul>
                            {formErrors.map(m => <li>{m}</li>)}
                        </ul>
                    </div>)
                    : null
                }
                <label htmlFor="password">Password </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="firstName">First Name </label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name </label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button type="submit" onSubmit={handleSubmit} >Update</button>
                <button onClick={() => setIsUpdate()}>Cancel</button>
            </form>
        </div>
    )
}

export default ProfileUpdate;