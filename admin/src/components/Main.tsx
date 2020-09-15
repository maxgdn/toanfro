import * as React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import Visitors from './Visitors';
import Redirects from './Redirects';

const SelectBar = styled.div`
    background-color: gray;
`;

const Content = styled.div`
    width: 100%;
`;

const Button = styled.button`
    margin: 1rem;
`;

const pages = {
    '1': <Visitors/>,
    '2': <Redirects/>
}



const Main: React.FC = () => {
    const [selected, setSelected] = useState('1');

    return (
        <> 
            <SelectBar>
                <Button onClick={() => setSelected('1')}>Visitors</Button>
                <Button onClick={() => setSelected('2')}>Redirects</Button>
            </SelectBar>
            <Content>
                {pages[selected]}
            </Content>
        </>
    )
}

export default Main;