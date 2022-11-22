import { storiesOf } from "@storybook/react-native";
import WithHelperText from "./WithHelperText";


storiesOf("input/helperText", module)
.add("Default", ()=>{
    return (
        <WithHelperText label="Email" labelStyle={{textAlign: "left"}} helperText="Forgot Password?" fullWidth placeholder="email@email.com" keyboardType="email-address" rightIcon={
            {
                type: "font-awesome",
                name: "envelope"
            }
        }   />
    )
})
