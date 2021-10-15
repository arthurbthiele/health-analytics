import React, { ReactElement, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Text } from "./Text";
import { parseXML } from "../utilities/xmlParser";
import { UploadData } from "../utilities/validateUpload";

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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Text>Click here to upload an XML file</Text>
    </div>
  );
}
