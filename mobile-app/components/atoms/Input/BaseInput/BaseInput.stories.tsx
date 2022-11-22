import { storiesOf } from "@storybook/react-native";
import BaseInput from "./BaseInput";



storiesOf("input/base", module)
.add("Default", ()=> <BaseInput placeholder="email@email.com" label="Email" />)