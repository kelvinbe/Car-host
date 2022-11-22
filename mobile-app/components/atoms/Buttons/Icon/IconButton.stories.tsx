import { storiesOf } from "@storybook/react-native";
import IconButton from "./IconButton";


storiesOf('buttons/icon', module)
.add("Default", ()=> <IconButton iconType="font-awesome" name="google" >
    
</IconButton>)