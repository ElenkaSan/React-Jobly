import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const CompanyCard = ({ handle, name, description, logoSrc }) => {

    return (
        <div>
            <Card className="company-card">
                <CardBody>
                    {logoSrc
                        ? <img className="card-img" alt="logo" src={logoSrc}></img>
                        : <p></p>
                    }
                    <CardTitle>
                        <span className="card-name">{name}</span>
                    </CardTitle>
                    <CardText>{description}</CardText>
                </CardBody>
            </Card>
        </div>
    )

}

export default CompanyCard;