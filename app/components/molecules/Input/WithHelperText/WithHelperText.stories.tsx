import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import WithHelperText from "./WithHelperText"

const Template: ComponentStory<typeof WithHelperText> = (args) => (
    <WithHelperText {...args} />
)

export const Default = Template.bind({})

Default.args = {
    placeholder: "Enter your email",
    formLabel: "Email",
    
}

export default {
    title: "Molecules/Input/WithHelperText",
    component: WithHelperText,
    argTypes: {
        onChangeText: {
            action: "onChangeText",
        }
    }
} as ComponentMeta<typeof WithHelperText>