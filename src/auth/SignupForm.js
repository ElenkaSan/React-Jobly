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
import Alert from 'react-bootstrap/Alert'


function SignupForm({ signup }) {
  const history = useHistory();
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [hasErrors, setHasErrors] = useState([]); 
  const [show, setShow] = useState(true);
  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }))
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault(); 
  let response = await signup({ ...formData });
    if (response.messages === "success") {
        history.push("/companies");
        setFormData(INITIAL_STATE);
    }
    else {
        setHasErrors(response.error);
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
          {hasErrors.length 
          ?
               ( <>
               <Alert show={show} variant="danger"> 
                 <div className="alert alert-dismissible fade show">
              {hasErrors.map(error => (
                  <p className="mb-0 font-weight-light" key={error}>
                    {error}
                  </p>
              ))}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}>
              <span aria-hidden="true">&times;</span>
              </button>
                </div>
                 </Alert>
                  {!show && <Button className="btn btn-sm btn-outline-warning float-right" onClick={() => setShow(true)}>Show Alert</Button>}
                  </>
                 )
             : null}
            {/* {hasErrors.length > 0 && <div><Alert type = "danger" message={hasErrors} /></div>} */}
             {/* ? <Alert type = "danger" messages={hasErrors.length} />
            : null
            }  */}
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
          <Button to="/" className="btn btn-outline-info float-left" style={{ color: '#bfe64b' }} type="submit" onSubmit={handleSubmit}>Signup</Button>
          <Link className="btn btn-outline-warning float-right" style={{ color: '#1c5752' }} to='/'>
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