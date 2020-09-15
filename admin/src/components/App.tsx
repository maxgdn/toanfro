import * as React from "react";
import styled from 'styled-components';
import { hot } from "react-hot-loader";
import Main from "./Main";

const Container = styled.div`

`;

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <Container>
        <h1>To an Fro Dashboard</h1>
        <Main/>
      </Container>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
