import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import './Home.css';
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button } from 'reactstrap';
// import { Button } from 'react-bootstrap'
import UserContext from "./UserContext";
import NoLoggedIn from "./NoLoggedIn";

function Home({ companies, jobs, title, id, remove }) {
    // function Home() {
    const { isLoggedIn } = useContext(UserContext);
    const [hasApplied, setHasApplied] = useState(false);
    useEffect(() => {
        if (jobs) {
            setHasApplied(jobs.some(job => job === id));
        }
    }, [])

	return (
		<section className="d-flex justify-content-center" style={{ margin: '50px'}}>
			<Card className="Home">
				<CardBody className="text-center">
					<CardTitle>
						<h1 className="font-weight-bold font-italic text-info">Welcome to Jobly Search Place!</h1>
                        <h2>All the jobs in one, convenient place!</h2>
					</CardTitle>
					<CardText>
                    <h3>
                    {isLoggedIn
                  ? (<>  
                     <h3>{`Welcome, ${isLoggedIn.username}`}</h3>
                     {/* <h3 className="text-warning">HIIIIIII USER</h3>  */}
                    <NavLink exact to="/companies"><button className='btn btn-outline-secondary btn-m' style={{ margin: '2rem'}}>Companies
                     {companies.length} 
                     </button></NavLink>
                    <NavLink exact to="/jobs"><button className='btn btn-outline-secondary btn-m' style={{ margin: '2rem'}}>Jobs
                     {jobs.length} 
                     </button></NavLink>
                    {/* <>apllyed</>???? */}
                     <ListGroup>
                    {jobs.map((job) => {
                    return (
                    <div style={{ textAlign: 'left' }}>  
                    <Link to={`/${title}/${job.id}`} key={job.id} data-testId={`link-${job.id}`}>
                   <ListGroupItem>
                    {job.name}
                   </ListGroupItem> 
                   </Link> 
                   <CardBody className="job-card-body">
                    {hasApplied
                        ?
                         <p>Applied</p>
                         : <p style={{ textAlign: 'right' }}>  
                         <button className='btn btn-outline-warning btn-sm' style={{ }} onClick={() =>remove({ id: job.id })}> X </button> 
                         </p>
                        // : <button onClick={apply} className="job-card-body-btn">Apply</button>
                    }
                </CardBody>
                   <p style={{ textAlign: 'right' }}>  
                   <button className='btn btn-outline-warning btn-sm' style={{ }} onClick={() =>remove({ id: job.id })}> X </button> 
                   </p>
                   </div>
                    )
                    })}
                    </ListGroup>
                    </>) 
                     : (<> 
                    <h3>Please login or sign up to access companies and jobs!</h3>
                    <NoLoggedIn />
                    {/* <NavLink exact to="/login"><button className="home-button">Login</button></NavLink>
                    <NavLink exact to="/signup"><button className="home-button">Signup</button></NavLink> */}
                     </>) 
                     } 
					</h3>
					</CardText>
				</CardBody>
			</Card>
		</section>
	)
}

export default Home;
