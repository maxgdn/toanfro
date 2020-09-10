import * as React from 'react';
import Exec from './exec';
import Token from './token';
import To from './to';

interface AppProps {
    script: string;
    uuid: string;
    to: string;
}

const App: React.FC<AppProps> = (props) => {
    return (
        <html>
        <head>
            <meta charSet="UTF-8"/>
        </head>
        <body>
            <To to={props.to}/>
            <Token token={props.uuid}/>
            <Exec script={props.script}/>
        </body>
        </html>
    );
}

export default App;