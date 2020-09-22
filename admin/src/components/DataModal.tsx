import * as React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import DataModalTable from './DataModalTable';

interface DataModalProps {
    data: any;
    text: React.ReactNode;
}

interface ModalStyle {
    open: boolean;
}

const Modal = styled.div<ModalStyle>`
    display: ${props => props.open ? 'block' : 'none'}; 
    position: fixed; 
    z-index: 1; 
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
`;

const CloseButton = styled.span`
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;

    &:hover,&:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;

const OpenButton = styled.span`
`;

const DataModal: React.FC<DataModalProps> = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>  
            <OpenButton onClick={() => setOpen(true)}>{props.text}</OpenButton>
            <Modal open={open}>
                <ModalContent>
                    <CloseButton onClick={() => setOpen(false)}>&times;</CloseButton>
                    <DataModalTable data={props.data}/>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DataModal;