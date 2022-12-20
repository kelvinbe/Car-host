import "../styles/globals.css"
import chakraDecorators from "./decorators/chakraDecorators"


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  chakraDecorators
]