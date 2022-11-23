import { storiesOf } from "@storybook/react-native";
import RoundedOutline from "./RoundedOutline";


storiesOf("button/roundedOutline", module)
.add("Default", ()=>{
    return (
        <RoundedOutline fullWidth >
            Login
        </RoundedOutline>
    )
})