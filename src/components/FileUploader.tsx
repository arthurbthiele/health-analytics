import React, { ReactElement, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Text } from "./Text";
import { parseXML } from "../utilities/xmlParser";
import { UploadData } from "../utilities/validateUpload";
import { Box } from "@mui/material";

// todo: use this??
//  <label htmlFor="contained-button-file">
//   <Input accept="image/*" id="contained-button-file" multiple type="file" />
//   <Button variant="contained" component="span">
//     Upload
//   </Button>
// </label>

function getOnDrop(onUpload: (input: UploadData) => void) {
  return useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () =>
        setTimeout(() => {
          const textString = reader.result;
          const parsedXML = parseXML(textString as string);
          if (parsedXML !== undefined) {
            onUpload(parsedXML);
          } else {
            alert("Uploaded file does not have expected properties");
          }
        }, 1);
      reader.readAsText(file);
    });
  }, []);
}

export function FileUploader({
  onUpload,
}: {
  onUpload: (input: UploadData) => void;
}): ReactElement {
  const onDrop = getOnDrop(onUpload);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        borderRadius: "16px",
        bgcolor: "background.paper",
        borderColor: "text.primary",
        m: 1,
        border: 1,
        width: 240,
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Text style={{ padding: "5px" }}>Click here to upload an XML file</Text>
      </div>
    </Box>
  );
}
