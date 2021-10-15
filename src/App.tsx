import React, { ReactElement } from "react";
import { PageContainer } from "./components";
import { DataContainer } from "./components/DataContainer";

function App(): ReactElement {
  return (
    <PageContainer>
      <DataContainer />
    </PageContainer>
  );
}

export default App;
