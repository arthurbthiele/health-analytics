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
    {children}
  </div>
);
