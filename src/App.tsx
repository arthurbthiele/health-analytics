import React, { ReactElement } from "react";
import { PageContainer } from "./components";
import { MyDropzone } from "./components/FileUpload";

function App(): ReactElement {
  return (
    <PageContainer>
      <MyDropzone />
    </PageContainer>
  );
}

export default App;
