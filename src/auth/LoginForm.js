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


function LoginForm({ login }) {
  const INITIAL_STATE = {
    username: '',
    password: ''
}
const [formData, setFormData] = useState(INITIAL_STATE);
const history = useHistory();
const [hasLoginErrors, setHasLoginErrors] = useState(false);

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
              User Login
            </CardTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                {hasLoginErrors
                  ? <p style={{ margin: '2rem', color: 'red' }}>Oh, no!
                  <br></br>Incorrect username or password.</p>
                  : null
                  }
                <Label htmlFor="username">Username </Label>
                <Input
                   id="username"
                   type="text"
                   name="username"
                   value={formData.username}
                   onChange={handleChange}
                   required
                />
               <Label htmlFor="password">Password </Label>
               <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button className="btn btn-outline-info" style={{ color: '#bfe64b' }} onSubmit={handleSubmit}>Login</Button>
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

export default LoginForm;
