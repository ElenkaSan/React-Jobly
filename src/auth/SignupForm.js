import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
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
import Alert from "../common/Alert";


function SignupForm({ signup }) {
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
}
const history = useHistory();
const [formData, setFormData] = useState(INITIAL_STATE);
const [hasErrors, setHasErrors] = useState(false); // works with Alert
// const [hasErrors, setHasErrors] = useState([]); // works with massages.map

 
const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }))
};

const handleSubmit = async (evt) => {
    evt.preventDefault();
    // let response = await signup(formData);
    let response = await signup({ ...formData });
    // if (response.success) {
    if (response.messages === "success") {
        history.push("/companies");
        setFormData(INITIAL_STATE);
    }
    else {
        setHasErrors(true);
        // setHasErrors(response.errors);
    }
}

  return (
    <section className="d-flex justify-content-center" style={{ margin: '50px'}}>
    <Card >
      <CardBody>
        <CardTitle className="font-weight-bold text-center text-info">
          <h4>Sign Up</h4>
        </CardTitle>
        <Form onSubmit={handleSubmit}>
        <FormGroup>
          {/* {hasErrors.length
              ? (<div className={`alert alert-dismissible fade show alert-danger`} role="alert">
              {messages.map(error => (
                  <p className="mb-0 small" key={error}>
                    {error}
                  </p>
              ))}
            </div>) */}
             {hasErrors
             ? <Alert type = "danger" messages={hasErrors.length} />
              : null
          }
          <div className="form-group">
          <Label htmlFor="username">Username </Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Your nickname is..."
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
          <Label htmlFor="password">Password </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Your secret psw is..."
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
          <Label htmlFor="firstName">First Name </Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Your name is..."
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
          <Label htmlFor="lastName">Last Name </Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Your lastname is..."
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
          <Label htmlFor="email">Email </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="How to reach you..."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <Button  to="/" className="btn btn-outline-info" style={{ margin: '2rem', color: '#bfe64b' }} type="submit" onSubmit={handleSubmit}>Signup</Button>
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

export default SignupForm;