import * as React from 'react';

interface ToProps {
    to: string;
}

const To: React.FC<ToProps> = (props) => {
    return (
        <div id="to" className={props.to}/>
    )
}

export default To;