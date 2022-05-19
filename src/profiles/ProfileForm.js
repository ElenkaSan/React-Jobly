import React, { useState, useContext } from "react";
import JoblyApi from "../api";
import UserContext from "../auth/UserContext";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Card,
	CardBody,
	CardTitle
} from 'reactstrap';
import { Link } from "react-router-dom";

const ProfileForm = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const INITIAL_STATE = {
    firstName: isLoggedIn.firstName,
    lastName: isLoggedIn.lastName,
    email: isLoggedIn.email,
    username: isLoggedIn.username,
    password: ''
}
const [formData, setFormData] = useState(INITIAL_STATE);
const [hasErrors, setHasErrors] = useState([]);

const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "isLoggedIn=", isLoggedIn,
      "formData=", formData,
      "hasErrors=", hasErrors,
      "saveConfirmed=", saveConfirmed,
  );
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let user = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, user);
    } catch (errors) {
      setHasErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setHasErrors([]);
    setSaveConfirmed(true);
    setIsLoggedIn(updatedUser);
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
  }));
  }

  return (
    <section className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <Card >
        <CardBody>
          <CardTitle className="font-weight-bold text-center text-info">
            <h3>Update Profile {formData.username}</h3>
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
            {hasErrors.length
                  ? 
                  (<p style={{ textAlign: 'center', color: 'red' }}>Password should be min 5 length.
                  </p>)
                  : null}
                 {saveConfirmed
                  ?
                  (<p style={{ textAlign: 'center', color: 'green' }}>Updated successfully.
                  </p>)
                  : null}
                  <div className="form-group">
                    <Label htmlFor="username">Username</Label>
                    <p className="form-control-plaintext text-warning font-weight-bold text-uppercase">
                      {formData.username}
                    </p>
                  </div>
                  <div className="form-group">
                  <Label htmlFor="firstName">First Name </Label>
                    <Input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                     />
                  </div>
                  <div className="form-group">
                  <Label htmlFor="lastName">Last Name </Label>
                  <Input
                     id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                   />
                  </div>
                  <div className="form-group">
                  <Label htmlFor="email">Email </Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                   />
                  </div>
                  <div className="form-group">
                  <Label htmlFor="password">Password </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Your old Password or Make new one... "
                    value={formData.password}
                    onChange={handleChange}
                  />
                  </div>
                  <Button  
                  className="btn btn-outline-info" style={{ margin: '2rem', color: '#bfe64b' }} 
                  onClick={handleSubmit}>
                    Save Changes
                  </Button>
                  <Link className="btn btn-outline-warning" style={{ margin: '2rem', color: '#1c5752' }} to='/'>
                    Go Back
                  </Link>
            </FormGroup>
          </Form>
     </CardBody>
    </Card>
   </section>
 );
}

export default ProfileForm;
