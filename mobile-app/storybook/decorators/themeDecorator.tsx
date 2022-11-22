import { ThemeProvider } from "@rneui/themed";
import { theme } from "../../utils/theme";


export const themeDecorator = (Story: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};