import React, { ReactElement, ReactNode } from "react";

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
        padding: 24,
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
      }}
    >
      {children}
    </div>
  </div>
);
