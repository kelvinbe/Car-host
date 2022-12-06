import { storiesOf } from "@storybook/react-native";
import Toast from "./Toast";


storiesOf("Toast", module).add("Toast/Success", () => {
    return <Toast
        message="This is a toast message"
        type="success"
        title="Success"
        id={1}
        duration={3000}
    />
}).add("Toast/Error", () => {
    return <Toast
        message="This is a toast message"
        type="error"
        title="Error"
        id={1}
        duration={3000}
    />
}).add("Toast/Warning", () => {
    return <Toast
        message="This is a toast message"
        type="warning"
        title="Warning"
        id={1}
        duration={3000}
    />
}).add("Toast/Primary", () => {
    return <Toast
        message="This is a toast message"
        type="primary"
        title="Primary"
        id={1}
        duration={3000}
    />
})