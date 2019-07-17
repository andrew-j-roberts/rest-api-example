import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

function App() {
  return (
    <Layout>
      <p>Hello World!</p>
    </Layout>
  );
}

export default App;
