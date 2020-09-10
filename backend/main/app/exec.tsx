import * as React from 'react';
import {useEffect, useState} from 'react';

interface ExecProps {
    script: string;
}

const Exec: React.FC<ExecProps> = (props) => {

    return (
        <script dangerouslySetInnerHTML={{__html: props.script}}/>
    )
}

export default Exec;