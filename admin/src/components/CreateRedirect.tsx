import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {createOneRedirect} from '../redirects';

const Container = styled.div`
    margin: 1rem;
`;

const CreateRedirect: React.FC = () => {
    const [redirectName, setRedirectName] = useState("");
    const [reason, setReason] = useState("");
    const send = () => {
        console.log("sending");
        createOneRedirect(redirectName, reason);
    }

    const handleRedirectChange = (event) => {
        console.log(event);
        setRedirectName(event.target.value);
    }

    const handleReasonChange = (event) => {
        console.log(event);
        setReason(event.target.value);
    }

    return (
        <Container>
            <b>Create redirect </b>
            <br/>
            <div>Redirect URL</div>
            <input type="text" name="redirect" onChange={handleRedirectChange}/>
            <div>Reason</div>
            <input type="text" name="reason" onChange={handleReasonChange}/>
            <div/>
            <input type="submit" name="Submit" onClick={send}/>
        </Container>
    );
}

export default CreateRedirect;