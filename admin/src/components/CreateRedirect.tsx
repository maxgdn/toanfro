import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {createOneRedirect} from '../redirects';

const Container = styled.div`
    margin: 1rem;
`;

const CreateRedirect: React.FC = () => {
    const [redirectName, setRedirectName] = useState("");
    const send = () => {
        console.log("sending");
        createOneRedirect(redirectName);
    }

    const handleChange = (event) => {
        console.log(event);
        setRedirectName(event.target.value);
    }

    return (
        <Container>
            <label>Create redirect </label>
            <input type="text" name="redirect" onChange={handleChange}/>
            <input type="submit" name="Submit" onClick={send}/>
        </Container>
    );
}

export default CreateRedirect;