import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import GettingStarted from "./GettingStarted";

export default{
    title: 'Components/Organism/GettingStarted/GettingStarted',
    component: GettingStarted
} as Meta<typeof GettingStarted> 

const Template: StoryFn<typeof GettingStarted> = ()=><GettingStarted />

export const Default = Template.bind({})
Default.args={

}