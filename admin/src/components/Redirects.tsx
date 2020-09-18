import * as React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

import CreateRedirect from './CreateRedirect';
import { getAllRedirects } from '../redirects';
import { getSettings } from '../settings';

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
    const [settings, setSettings] = useState("");
 
    useEffect(() => {
        const populate = async () => {
            const result = await getAllRedirects();
            const settings = await getSettings();

            console.log(settings);

            setRedirects(result.data);
            setSettings(settings.data);
        };

        populate();
    }, []);

    console.log(settings);

    return (
        <>
        <CreateRedirect/>
        <RedirectTable>
            <thead>
            <RedirectTableRow>
                <RedirectTableHeading>ID</RedirectTableHeading>
                <RedirectTableHeading>Redirect</RedirectTableHeading>
                <RedirectTableHeading>Reason</RedirectTableHeading>
                <RedirectTableHeading>Date</RedirectTableHeading>
                <RedirectTableHeading>Link</RedirectTableHeading>
            </RedirectTableRow>
            </thead>

            <tbody>
            {redirects.map((r) => {
                return (
                    <RedirectTableRow>
                        <RedirectTableData>{r.id}</RedirectTableData>
                        <RedirectTableData>{r.redirect}</RedirectTableData>
                        <RedirectTableData>{r.reason}</RedirectTableData>
                        <RedirectTableData>{r.created_on}</RedirectTableData>
                        <RedirectTableData><span>{`${settings['domain']}/to/${r.id}`}</span></RedirectTableData>
                    </RedirectTableRow>
                );
            })}
            </tbody>
            
        </RedirectTable>
        </>
    )
}

export default Redirects;