import * as React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { getAllVisitors } from '../visitors';
import DataModal from './DataModal';

const VisitorsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const VisitorsTableHeading = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const VisitorsTableRow = styled.tr`
    &:nth-child(even) {
        background-color: #dddddd;
    }
`;

const VisitorsTableData = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const printObj = (obj: string) => {
    if(obj == null) return "";
    let keys = Object.keys(obj);
    console.log(obj);
    keys = keys.map(k => {
        if(typeof(obj[k]) === 'object') return printObj(obj[k]);
        return `${k}:${obj[k]}`
    })
    return keys.join(" ");
}

const Visitors: React.FC = () => {
    const [visitors, setVisitors] = useState([]);
 
    useEffect(() => {
        const populate = async () => {
            const result = await getAllVisitors();
            console.log(result);
            
            setVisitors(result.data);
        };

        populate();
    }, []);
    

    return (
        <VisitorsTable>
            <thead>
            <VisitorsTableRow>
                <VisitorsTableHeading>ID</VisitorsTableHeading>
                <VisitorsTableHeading>Redirect ID</VisitorsTableHeading>
                <VisitorsTableHeading>Browsers</VisitorsTableHeading>
                <VisitorsTableHeading>Fingerprint</VisitorsTableHeading>
                <VisitorsTableHeading>Headers</VisitorsTableHeading>
                <VisitorsTableHeading>Geo</VisitorsTableHeading>
                <VisitorsTableHeading>IP Address</VisitorsTableHeading>
                <VisitorsTableHeading>Accessed on</VisitorsTableHeading>
            </VisitorsTableRow>
            </thead>

            <tbody>
            {visitors.map((v) => {
                return (
                    <VisitorsTableRow>
                        <VisitorsTableData>{v.id}</VisitorsTableData>
                        <VisitorsTableData>{v.redirect_id}</VisitorsTableData>
                        <VisitorsTableData>{printObj(v.browser)}</VisitorsTableData>
                        <VisitorsTableData><DataModal text={'open'} data={v.fingerprint.fingerprintFinal}/></VisitorsTableData>
                        <VisitorsTableData>{printObj(v.headers)}</VisitorsTableData>
                        <VisitorsTableData><DataModal text={'open'} data={v.geo}/></VisitorsTableData>
                        <VisitorsTableData>{v.ip_addr}</VisitorsTableData>
                        <VisitorsTableData>{v.created_on}</VisitorsTableData>
                    </VisitorsTableRow>
                );
            })}
            </tbody>
            
        </VisitorsTable>
    )
}

export default Visitors;