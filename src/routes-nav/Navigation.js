import React, { useContext } from "react";
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";


function Navigation({ logout }) {
  const { isLoggedIn } = useContext(UserContext);
  const history = useHistory();
  const handleClick = () => {
      logout();
      history.push("/");
  }

  return (
    <div>
        <Navbar expand="md">
            <NavLink exact to="/" className="navbar-brand">
                Jobly
            </NavLink>
                <Nav className="ml-auto" navbar>
                    {isLoggedIn
                        ? (<>
                            <NavItem>
                                <NavLink to="/companies">Companies</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/jobs">Jobs</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink to="/profile">Profile</NavLink><span></span>
                            </NavItem>
                            <div className="navbar-div">
                                <NavItem>
                                    <Button className="btn-sm btn-outline-warning" onClick={handleClick}>Logout {isLoggedIn.username}</Button>
                                </NavItem>
                            </div>
                        </>)
                        : (<>
                        <NavItem>
                            <NavLink to="/login">Login</NavLink>
                        </NavItem>
                            <NavItem>
                                <NavLink to="/signup">Signup</NavLink>
                            </NavItem>
                        </>)
                    }
                </Nav>
        </Navbar>
    </div>
);
}

export default Navigation;
