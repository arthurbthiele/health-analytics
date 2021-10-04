import { fonts } from "../assets/fonts";
import React, { CSSProperties, ReactElement, ReactNode } from "react";

export const Text = ({
  style,
  children,
}: {
  style?: CSSProperties;
  children: ReactNode;
}): ReactElement => (
  <div style={{ ...fonts.primary.small, ...style }}>{children}</div>
);
