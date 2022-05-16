import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCommentDollar, faBuilding } from '@fortawesome/free-solid-svg-icons';
import UserContext from "./UserContext";
import JoblyApi from "./Api";

const JobCard = ({ id, title, salary, equity, name }) => {

    const { username, jobs } = useContext(UserContext);
    const [hasApplied, setHasApplied] = useState(false);

    const apply = async () => {
        try {
            let data = await JoblyApi.applyToJob(username, id);
            setHasApplied(true);
            console.log("Success", data, jobs);
            console.log("current Jobs", jobs);
            jobs.push(id);
            console.log("job added", jobs);
        }
        catch (e) {
            console.log("Errors from job application: ", e);
        }
    }

    useEffect(() => {
        if (jobs) {
            setHasApplied(jobs.some(job => job === id));
        }
    }, [])

    return (
        <section>
            <Card>

                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        <span className="card-job">{title} </span>
                    </CardTitle>
                    <CardText className="font-italic">
                        {/* <FontAwesomeIcon icon={faBuilding} />  */}
                    Company: {name}</CardText>
                    <CardText className="font-italic">
                        {/* <FontAwesomeIcon icon={faCommentDollar} />  */}
                        Salary: ${salary}</CardText>
                    <CardText className="font-italic">Equity: {equity}</CardText>
                </CardBody>
                <CardBody className="job-card-body">
                    {hasApplied
                        ? <p>Applied</p>
                        : <button onClick={apply} className="job-card-body-btn">Apply</button>
                    }
                </CardBody>
            </Card>
        </section>
    )

}

export default JobCard;
