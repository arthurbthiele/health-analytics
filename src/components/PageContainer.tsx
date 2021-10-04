import React, { ReactElement, ReactNode } from "react";
import { fonts } from "../assets";
import { Text } from "./Text";

export const PageContainer = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => (
  <div
    style={{
      width: window.innerWidth,
      height: window.innerHeight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
      }}
    >
      <Text style={{ ...fonts.primary.medium, margin: 8 }}>
        Here is some text!
      </Text>
      {children}
    </div>
  </div>
);
