import React, { ReactElement, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Text } from "./Text";
import { parseXML } from "../utilities/xmlParser";

export function MyDropzone(): ReactElement {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        const parsedXML = parseXML(binaryStr as string);
        console.log(parsedXML);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Text>Drag and drop some files here</Text>
    </div>
  );
}
