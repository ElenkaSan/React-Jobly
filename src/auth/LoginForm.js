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


function LoginForm({ login }) {
  const INITIAL_STATE = {
    username: '',
    password: ''
}
  const [formData, setFormData] = useState(INITIAL_STATE);
  const history = useHistory();
  const [hasLoginErrors, setHasLoginErrors] = useState(false);
  const [show, setShow] = useState(true);

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "hasLoginErrors", hasLoginErrors,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await login({ ...formData });
    if (response.message === "success") {
      history.push("/companies");
    }
    else {
      setHasLoginErrors(true);
    }
    setFormData(INITIAL_STATE);
  }

  return (
    <section className="d-flex justify-content-center" style={{ margin: '50px'}}>
      <Card>
        <CardBody>
            <CardTitle className="font-weight-bold text-center text-info">
              <h4>User Login</h4>
            </CardTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                {hasLoginErrors
                  ?
                  ( <>
                    <Alert show={show} variant="danger"> 
                      <div className="alert alert-dismissible fade show">
                        <p>Oh, no! <br></br>Incorrect username or password.</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShow(false)}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </Alert>
                    {!show && <Button className="btn btn-sm btn-outline-warning float-right" onClick={() => setShow(true)}>Show Alert</Button>}
                  </> )
                  : null}
               <div className="form-group">
                <Label htmlFor="username">Username </Label>
                <Input
                   id="username"
                   type="text"
                   name="username"
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                 />
                </div>
                <Button className="btn btn-outline-info float-left" style={{ color: '#bfe64b' }} onSubmit={handleSubmit}>Login</Button>
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

export default LoginForm;
