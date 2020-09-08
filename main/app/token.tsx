import * as React from 'react';

interface TokenProps {
    token: string;
}

const Token: React.FC<TokenProps> = (props) => {
    return (
        <div id="control_token" className={props.token}/>
    )
}

export default Token;