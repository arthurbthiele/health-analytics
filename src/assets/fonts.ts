import { colors } from "./colors";

const fontSize = {
  footer: 12,
  small: 14,
  medium: 16,
  large: 20,
};
const fontFamily = "verdana";
export const fonts = {
  primary: {
    small: { fontSize: fontSize.small, fontFamily },
    medium: {},
    large: {},
    display: { fontSize: fontSize.large, fontFamily, color: colors.red },
  },
  secondary: {
    footer: { fontSize: fontSize.footer, fontFamily, color: colors.grey },
    small: {},
    medium: {},
    large: {},
    display: {},
  },
};
