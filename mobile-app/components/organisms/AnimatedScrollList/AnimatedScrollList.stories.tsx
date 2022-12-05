import { storiesOf } from "@storybook/react-native";
import AnimatedScrollList from "./AnimatedScrollList";


storiesOf("AnimatedScrollList", module)
.add("Default", ()=>{
    return (
        <AnimatedScrollList/>
    )
})