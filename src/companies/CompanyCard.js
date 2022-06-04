import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./CompanyCard.css";

const DEFAULT_LOGO = 'https://png.pngtree.com/svg/20170307/the_company_default_logo_574534.png';

const CompanyCard = ({handle, name, description, logoUrl }) => {
  console.debug("CompanyCard", logoUrl);
  return (
    <Card className="CompanyCard pt-2 pb-2">
        <CardBody>
          <CardTitle tag="h6" className="row">
            <Link className="col-sm-10 stretched-link text-info" 
              to={`/companies/${handle}`}>
              <h5>{name}</h5>
            </Link>
            <img alt={name} src={logoUrl || DEFAULT_LOGO} className="col-sm-2 float-right" />
          </CardTitle>
          <CardText className="row">
            <small className="col-sm-10">
            {description}
            </small>
          </CardText>
        </CardBody>
    </Card>
  )
}

export default CompanyCard;
