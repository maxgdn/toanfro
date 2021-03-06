import * as React from 'react';
import {useRef} from 'react';
import styled from 'styled-components';

const ModalTable = styled.table`
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
`;

const ModalTableHeading = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const ModalTableRow = styled.tr`
    &:nth-child(even) {
        background-color: #dddddd;
    }
`;

const ModalTableBody = styled.tbody`
    width: 100%;
`;

const ModalTableData = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    width: 100%;
`;

const DataWrapperDiv = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    width: 100%;
`;

interface DataModalTableProps {
    data: object[];
}

interface DataWrapperProps {
    data: string
}

const DataWrapper: React.FC<DataWrapperProps> = (props) => {
    const refDiv = useRef(null);

    const giveData = () => {
        let range = document.createRange();
        range.selectNode(refDiv.current);
        window.getSelection().removeAllRanges(); 
        window.getSelection().addRange(range); 
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        alert("Copied");
    }

    return (
        <DataWrapperDiv ref={refDiv} onClick={() => giveData()}>
            {props.data}
        </DataWrapperDiv>
    );
}

const DataModalTable: React.FC<DataModalTableProps> = (props) => {
    return (
        <ModalTable>
            <thead>
            <ModalTableRow>
                <ModalTableHeading>Key</ModalTableHeading>
                <ModalTableHeading>Value</ModalTableHeading>
            </ModalTableRow>
            </thead>
            <ModalTableBody>
            {Object.keys(props.data).map((k: any) => {
                console.log('Map');
                
                let value = props.data[k];
                let str = JSON.stringify(value);

                console.log(k);
                console.log(value);
                
                return (
                    <ModalTableRow>
                        <ModalTableData><DataWrapper data={k}/></ModalTableData>
                        <ModalTableData><DataWrapper data={str}/></ModalTableData>
                    </ModalTableRow>
                );
            })}
            </ModalTableBody>
            
            
        </ModalTable>
    );
} 

export default DataModalTable;