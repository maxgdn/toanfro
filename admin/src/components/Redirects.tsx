import * as React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

import CreateRedirect from './CreateRedirect';
import { getAllRedirects } from '../redirects';

const RedirectTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const RedirectTableHeading = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const RedirectTableRow = styled.tr`
    &:nth-child(even) {
        background-color: #dddddd;
    }
`;

const RedirectTableData = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const Redirects: React.FC = () => {
    const [redirects, setRedirects] = useState([]);
 
    useEffect(() => {
        const populate = async () => {
            const result = await getAllRedirects();
            console.log(result);
            
            setRedirects(result.data);
        };

        populate();
    }, []);

    return (
        <>
        <CreateRedirect/>
        <RedirectTable>
            <thead>
            <RedirectTableRow>
                <RedirectTableHeading>ID</RedirectTableHeading>
                <RedirectTableHeading>Redirect</RedirectTableHeading>
                <RedirectTableHeading>Date</RedirectTableHeading>
            </RedirectTableRow>
            </thead>

            <tbody>
            {redirects.map((r) => {
                return (
                    <RedirectTableRow>
                        <RedirectTableData>{r.id}</RedirectTableData>
                        <RedirectTableData>{r.redirect}</RedirectTableData>
                        <RedirectTableData>{r.created_on}</RedirectTableData>
                    </RedirectTableRow>
                );
            })}
            </tbody>
            
        </RedirectTable>
        </>
    )
}

export default Redirects;