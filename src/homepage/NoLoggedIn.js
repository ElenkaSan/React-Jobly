import React from "react";
import { useHistory } from "react-router-dom";
import { ButtonGroup, Button } from 'reactstrap';

function NoLoggedIn() {
    let history = useHistory();
    return (
        <ButtonGroup>
            <Button className='btn btn-info btn-m' style={{ margin: '2rem', color: '#bfe64b' }}onClick={evt => {history.push('/signup')}}>Signup </Button>
            <Button className='btn btn-warning btn-m' style={{ margin: '2rem', color: '#367f9e' }} onClick={evt => {history.push('/login')}}> Login</Button>
        </ButtonGroup>
    )
}

export default NoLoggedIn;