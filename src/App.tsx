import React, { ReactElement } from "react";
import { PageContainer } from "./components";
import { DataContainer } from "./components/DataContainer";
import { InfoBox } from "./components/InfoBox";

function App(): ReactElement {
  return (
    <PageContainer>
      <DataContainer />
      <InfoBox />
    </PageContainer>
  );
}

export default App;
