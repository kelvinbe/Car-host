import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import DropdownButton from "./DropdownButton";

export default {
    title: 'Dropdown variations',
    component: DropdownButton,
    argTypes: {
        onClick: {
            action: "Clicked"
        }
    }
} as ComponentMeta<typeof DropdownButton>

const Template : ComponentStory<typeof DropdownButton> = (args) => (<DropdownButton {...args}/>)

export const DefaultDropdown = Template.bind({})
DefaultDropdown.args = {
    children:'This is default',
    icon:'IoIosArrowDropdown',
    isActive:true
}


