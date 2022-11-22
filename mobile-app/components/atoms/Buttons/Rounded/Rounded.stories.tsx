import { storiesOf } from "@storybook/react-native";
import { View } from "../../../Themed";
import Rounded from "./Rounded";


storiesOf('buttons/rounded', module)
.add('Default', ()=> <Rounded>Default</Rounded>)